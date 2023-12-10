import { Inject, Logger } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { keys } from 'lodash/fp';
import { DataSource } from 'typeorm';

import { HTTP_API_CLIENT } from 'src/common/providers/http-api-client.provider';
import { DOMAINS_CONFIG } from './constants/domains.constants';
import { Domain, DomainAPIClient } from './models/domains.types';
import { ConfigService } from '@nestjs/config';
import { ConfigSchemaType } from 'src/common/validators/config.validator';
import { limitConcurrentRequests } from 'src/common/utils/limit-concurrent-requests.utils';
import { AggregateDomainImportService } from './aggregate-abstract-domain.import.service';
import env from 'src/common/utils/env.helper';

export type FeedItem = {
  description: string;
  guid: string;
  link: string;
  pubDate: string;
  title: string;
};

export type FeedEntry = {
  description: string;
  link: string;
  publishDate: string;
  thumbnail: string;
  title: string;
};

export class AggregateDomainsImportService {
  private readonly limitRequests = env.int(
    'EUROGAMER_LIMIT_CONCURRENT_DOMAINS_REQUESTS',
  );
  private readonly logger = new Logger(AggregateDomainsImportService.name);

  constructor(
    @Inject(HTTP_API_CLIENT)
    private readonly apiClient: DomainAPIClient<FeedItem>,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService<ConfigSchemaType>,
  ) {}

  public async import() {
    const importDomains = Object.entries(DOMAINS_CONFIG).map(
      ([domain]) =>
        () =>
          this.importByDomain(domain as Domain),
    );

    const importedDomains = await limitConcurrentRequests(
      importDomains,
      this.limitRequests,
    );

    importedDomains.forEach((importedDomain, index) => {
      if (importedDomain.status === 'fulfilled') {
        this.logger.debug(`Imported domain: ${keys(DOMAINS_CONFIG)[index]}`);
      } else {
        this.logger.error(
          `Error importing domain: ${keys(DOMAINS_CONFIG)[index]}`,
          importedDomain.reason,
        );
      }
    });
  }

  private async importByDomain(domain: Domain) {
    const serviceDomain = this.factoryDomainService(domain);

    const items = await this.getItemsByDomain(domain);

    serviceDomain.importData(items);
  }

  private getRepository(target: EntityClassOrSchema) {
    return this.dataSource.getRepository(target);
  }

  private async getItemsByDomain(domain: Domain) {
    try {
      const apiClient = this.apiClient[domain];
      const { rss } = await apiClient.getAll();

      return rss.channel.item;
    } catch (error) {
      this.logger.error(`Error getting items from ${domain}`, error);
      Promise.reject(error);
    }
  }

  private factoryDomainService(domain: Domain) {
    const { entity, service } = DOMAINS_CONFIG[domain];

    const repositoryDomain = this.getRepository(entity);
    const serviceDomain = new service(this, repositoryDomain);
    if (!(serviceDomain instanceof AggregateDomainImportService)) {
      throw new Error(
        `Service ${
          (serviceDomain as NonNullable<unknown>).constructor.name
        } must extend AggregateDomainImportService`,
      );
    }

    return serviceDomain;
  }

  public get getApiClient() {
    return this.apiClient;
  }

  public get getConfigService() {
    return this.configService;
  }
}
