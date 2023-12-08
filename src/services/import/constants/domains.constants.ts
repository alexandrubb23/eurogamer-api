import { Article } from 'src/domains/news/domain/entities/article.entity';
import { ImportNewsService } from '../import-news.service';
import { ImportVideosService } from '../import-videos.service';
import { DomainConfig } from '../models/domains.types';
import { Video } from 'src/domains/videos/domain/entities/video.entity';

export const DOMAINS_CONFIG: DomainConfig = {
  videos: {
    endpoint: '/videos',
    entity: Video,
    service: ImportVideosService,
  },
  news: {
    endpoint: '/news',
    entity: Article,
    service: ImportNewsService,
  },
} as const;
