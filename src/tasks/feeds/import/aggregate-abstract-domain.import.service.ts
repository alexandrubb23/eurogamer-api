import * as cheerio from 'cheerio';
import * as crypto from 'crypto';
import { FindOneOptions, Repository } from 'typeorm';

import {
  ConflictException,
  HttpStatus,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { FeedEntry } from 'src/common/domains/entities/feed-entry.entity';
import env from 'src/common/utils/env.helper';
import { limitConcurrentRequests } from 'src/common/utils/limit-concurrent-requests.utils';
import { AggregateDomainsImportService } from './aggregate-domains-import.service';
import { Domain, FeedItem } from './models/domains.types';

// TODO: Make generic
export abstract class AggregateDomainImportService {
  private limitRequests = env.int('EUROGAMER_LIMIT_CONCURRENT_ITEMS_REQUESTS');
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly domain: Domain,
    protected readonly importService: AggregateDomainsImportService,
    protected readonly domainRepository: Repository<FeedEntry>,
  ) {}

  private findItemBySlug(slug: string) {
    const options: FindOneOptions<FeedEntry> = {
      where: { slug },
    };

    return this.domainRepository.findOne(options);
  }

  public async importData(data: FeedItem[]) {
    const importData = data.map((item) => () => this.importItem(item));
    const importedData = await limitConcurrentRequests(
      importData,
      this.limitRequests,
    );

    importedData.forEach((importedItem, index) => {
      const itemLink = data[index].link;
      if (importedItem.status === 'fulfilled') {
        this.logger.debug(`Imported ${this.domainName}: ${itemLink}`);
      } else {
        this.logger.error(
          `Error importing ${this.domainName}: ${itemLink}`,
          importedItem.reason,
        );
      }
    });
  }

  private async importItem(item: FeedItem) {
    const slug = this.getItemSlug(item);
    const existingItem = await this.findItemBySlug(slug);

    let newItem: FeedEntry;

    try {
      const htmlPageSource = await this.apiClient.getOne(slug);

      const cheer = cheerio.load(htmlPageSource);
      newItem = this.parseSourcePageWithCheerio(cheer, item);

      if (existingItem)
        throw new ConflictException(
          `${this.domainName} with link: ${item.link} already exists`,
        );

      const createdItem = await this.saveItem(newItem);

      return createdItem;
    } catch (error) {
      const { NOT_FOUND, CONFLICT } = HttpStatus;
      if (error.status === NOT_FOUND) await this.deleteItem(existingItem);
      if (error.status === CONFLICT)
        await this.updateItem(existingItem, newItem);

      return Promise.reject(error);
    }
  }

  private saveItem(item: FeedEntry): Promise<FeedEntry> {
    const newItem = {
      ...item,
      uuid: crypto.randomUUID(),
    };

    return this.domainRepository.save(newItem);
  }

  private deleteItem(existingItem: FeedEntry) {
    const { uuid } = existingItem;
    try {
      this.logger.debug(`Deleted ${this.domainName}: ${uuid}`);
      return this.domainRepository.delete({ uuid });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async updateItem(existingItem: FeedEntry, newItem: FeedEntry) {
    if (
      existingItem.title === newItem.title &&
      existingItem.description === newItem.description
    ) {
      this.logger.debug(
        `${this.domainName} already up to date: ${existingItem.uuid}`,
      );

      return;
    }

    const { uuid } = existingItem;

    try {
      this.logger.debug(`Updated ${this.domainName}: ${uuid}`);

      const { title, description } = newItem;

      return this.domainRepository.update(uuid, {
        ...existingItem,
        title,
        description,
      });
    } catch (error) {
      // this.logger.error(`Error updating video: ${uuid}`, error);
      return Promise.reject(error);
    }
  }

  private parseSourcePageWithCheerio(
    cheerio: cheerio.CheerioAPI,
    item: FeedItem,
  ): FeedEntry {
    const title = cheerio('h1.title').text().replace(/\n/g, '').trim();
    if (!title) throw new NotAcceptableException('Title not found');

    const description = cheerio('.article_body_content')
      .find('p')
      .each(function () {
        cheerio(this).html();
      })
      .toString();

    if (!description) throw new NotAcceptableException('Description not found');

    const thumbnail = cheerio('img.headline_image').attr('src');

    const publishAt = cheerio('.published_at').text();
    const publishDate = publishAt ? publishAt : cheerio('.updated_at').text();

    return {
      description, // TODO: Use DOMPurify
      publishDate: publishDate.replace(/\n/g, '').trim(),
      thumbnail,
      title,
      slug: this.getItemSlug(item),
    } as FeedEntry;
  }

  private getItemSlug(item: FeedItem) {
    return item.link.replace(/https?:\/\/[^\/]+\//, '');
  }

  private get apiClient() {
    return this.importService.getApiClient[this.domain];
  }

  private get domainName() {
    return this.domain.slice(0, -1);
  }
}
