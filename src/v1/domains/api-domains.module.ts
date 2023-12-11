import { Module } from '@nestjs/common';

import { HealthCheckModule } from './health/health-check.module';
import { NewsModule } from './news/news.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [HealthCheckModule, NewsModule, VideosModule],
})
export class ApiDomainsModule {}
