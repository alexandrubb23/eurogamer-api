import { Article } from 'src/v1/domains/news/domain/entities/article.entity';
import { AggregateNewsImportService } from '../aggregate-news-import.service';
import { AggregateVideoImportService } from '../aggregate-videos-import.service';
import { DomainConfig } from '../models/domains.types';
import { Video } from 'src/v1/domains/videos/domain/entities/video.entity';

export const DOMAINS = {
  VIDEOS: 'videos',
  NEWS: 'news',
} as const;

export const DOMAINS_CONFIG: DomainConfig = {
  [DOMAINS.VIDEOS]: {
    endpoint: '/feed/videos',
    entity: Video,
    service: AggregateVideoImportService,
  },
  [DOMAINS.NEWS]: {
    endpoint: '/feed/news',
    entity: Article,
    service: AggregateNewsImportService,
  },
} as const;
