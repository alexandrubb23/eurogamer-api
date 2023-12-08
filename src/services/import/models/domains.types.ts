import { RSSAPIClient } from 'src/services/api-client.service';
import { DOMAINS_CONFIG } from '../constants/domains.constants';
import { Article } from 'src/domains/news/domain/entities/article.entity';
import { ImportVideosService } from '../import-videos.service';
import { ImportNewsService } from '../import-news.service';
import { Video } from 'src/domains/videos/domain/entities/video.entity';

export type Domain = keyof typeof DOMAINS_CONFIG;

export type DomainAPIClient<T> = {
  [K in keyof typeof DOMAINS_CONFIG]: RSSAPIClient<T>;
};

export type DomainConfig = {
  videos: {
    endpoint: string;
    entity: typeof Video;
    service: typeof ImportVideosService;
  };
  news: {
    endpoint: string;
    entity: typeof Article;
    service: typeof ImportNewsService;
  };
};
