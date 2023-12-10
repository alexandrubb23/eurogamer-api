import * as cheerio from 'cheerio';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';

import {
  ConflictException,
  HttpStatus,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { limitConcurrentRequests } from 'src/common/utils/limit-concurrent-requests.utils';
import { Video } from 'src/domains/videos/domain/entities/video.entity';
import {
  AggregateDomainImportService,
  FeedEntry,
  FeedItem,
} from './aggregate-domain-import.service';

export class AggregateVideoImportService {
  private static LIMIT_CONCURRENT_REQUESTS = 5;
  private readonly logger = new Logger(AggregateVideoImportService.name);

  constructor(
    private readonly importService: AggregateDomainImportService,
    private readonly videosRepository: Repository<Video>,
  ) {}

  public findVideoByLink(link: string) {
    return this.videosRepository.findOne({
      where: {
        link,
      },
    });
  }

  public async importData(videos: FeedItem[]) {
    const importVideos = videos.map((video) => () => this.importVideo(video));
    const importedVideos = await limitConcurrentRequests(
      importVideos,
      AggregateVideoImportService.LIMIT_CONCURRENT_REQUESTS,
    );

    importedVideos.forEach((importedVideo, index) => {
      const videoLink = videos[index].link;
      if (importedVideo.status === 'fulfilled') {
        this.logger.debug(`Imported video: ${videoLink}`);
      } else {
        this.logger.error(
          `Error importing video: ${videoLink}`,
          importedVideo.reason,
        );
      }
    });
  }

  private async importVideo(video: FeedItem) {
    const itemPath = this.getItemPath(video);
    const existingVideo = await this.findVideoByLink(video.link);

    try {
      const htmlPageSource = await this.getVideoApiClient.getOne(itemPath);

      if (existingVideo)
        throw new ConflictException(
          `Video with link: ${video.link} already exists`,
        );

      const cheer = cheerio.load(htmlPageSource);
      const newVideo = this.parseSourcePageWithCheerio(cheer, video);

      const savedVideo = await this.saveVideo(newVideo);

      return savedVideo;
    } catch (error) {
      const { NOT_FOUND, CONFLICT } = HttpStatus;
      if (error.status === NOT_FOUND) await this.deleteVideo(existingVideo);
      if (error.status === CONFLICT)
        await this.updateVideo(existingVideo, video);

      return Promise.reject(error);
    }
  }

  private saveVideo(video: FeedEntry): Promise<FeedEntry> {
    const { title, description, thumbnail, publishDate, link } = video;

    const newVideo = {
      description,
      link,
      publishDate,
      thumbnail,
      title,
      uuid: crypto.randomUUID(),
    };

    return this.videosRepository.save(newVideo);
  }

  private deleteVideo(existingVideo: Video) {
    const { uuid } = existingVideo;
    try {
      this.logger.debug(`Deleted video: ${uuid}`);
      return this.videosRepository.delete({ uuid });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async updateVideo(existingVideo: Video, newVideo: FeedItem) {
    if (
      existingVideo.title === newVideo.title &&
      existingVideo.description === newVideo.description
    ) {
      this.logger.debug(`Video already up to date: ${existingVideo.uuid}`);
      return;
    }

    const { uuid } = existingVideo;

    try {
      this.logger.debug(`Updated video: ${uuid}`);

      const { title, description } = newVideo;

      return this.videosRepository.update(uuid, {
        ...existingVideo,
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
    video: FeedItem,
  ): FeedEntry {
    const title = cheerio('h1.title').text();
    if (!title) throw new NotAcceptableException('Title not found');

    const description = cheerio('.article_body_content').find('p').text();
    if (!description) throw new NotAcceptableException('Description not found');

    const thumbnail = cheerio('img.headline_image').attr('src') ?? 'none';

    const publishAt =
      cheerio('.published_at').text() ?? cheerio('.updated_at').text();
    const publishDate = publishAt ? publishAt : cheerio('.updated_at').text();

    return {
      description,
      link: video.link,
      publishDate,
      thumbnail,
      title,
    };
  }

  private getItemPath(video: FeedItem) {
    const apiEndpoint = this.configService.get<string>('EUROGAMER_URL');
    return video.link.replace(apiEndpoint, '');
  }

  private get configService() {
    return this.importService.getConfigService;
  }

  private get getVideoApiClient() {
    return this.importService.getApiClient.videos;
  }
}
