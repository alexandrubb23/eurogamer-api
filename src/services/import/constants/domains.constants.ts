import { Article } from 'src/domains/news/domain/entities/article.entity';
import { AggregateNewsImportService } from '../aggregate-news-import.service';
import { AggregateVideoImportService } from '../aggregate-videos-import.service';
import { DomainConfig } from '../models/domains.types';
import { Video } from 'src/domains/videos/domain/entities/video.entity';

export const DOMAINS_CONFIG: DomainConfig = {
  videos: {
    endpoint: '/feed/videos',
    entity: Video,
    service: AggregateVideoImportService,
  },
  news: {
    endpoint: '/feed/news',
    entity: Article,
    service: AggregateNewsImportService,
  },
} as const;
