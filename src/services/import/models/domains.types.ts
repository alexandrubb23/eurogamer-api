import { RSSAPIClient } from 'src/services/api-client.service';
import { DOMAINS_CONFIG } from '../constants/domains.constants';
import { Article } from 'src/domains/news/domain/entities/article.entity';
import { AggregateVideoImportService } from '../aggregate-videos-import.service';
import { AggregateNewsImportService } from '../aggregate-news-import.service';
import { Video } from 'src/domains/videos/domain/entities/video.entity';

export type Domain = keyof typeof DOMAINS_CONFIG;

export type DomainAPIClient<T> = {
  [K in keyof typeof DOMAINS_CONFIG]: RSSAPIClient<T>;
};

export type DomainConfig = {
  videos: {
    endpoint: string;
    entity: typeof Video;
    service: typeof AggregateVideoImportService;
  };
  news: {
    endpoint: string;
    entity: typeof Article;
    service: typeof AggregateNewsImportService;
  };
};
