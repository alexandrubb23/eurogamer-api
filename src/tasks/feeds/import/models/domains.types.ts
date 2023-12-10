import { APIClientService } from 'src/services/api-client.service';
import { DOMAINS_CONFIG } from '../constants/domains.constants';
import { News } from 'src/v1/domains/news/domain/entities/new.entity';
import { AggregateVideoImportService } from '../aggregate-videos-import.service';
import { AggregateNewsImportService } from '../aggregate-news-import.service';
import { Video } from 'src/v1/domains/videos/domain/entities/video.entity';

export type Domain = keyof typeof DOMAINS_CONFIG;

export type DomainAPIClient<T> = {
  [K in keyof typeof DOMAINS_CONFIG]: APIClientService<T>;
};

export type DomainConfig = {
  videos: {
    endpoint: string;
    entity: typeof Video;
    service: typeof AggregateVideoImportService;
  };
  news: {
    endpoint: string;
    entity: typeof News;
    service: typeof AggregateNewsImportService;
  };
};

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
