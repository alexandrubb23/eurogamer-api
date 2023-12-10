import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AggregateDomainsImportService } from 'src/tasks/feeds/import/aggregate-domains-import.service';
import { AggregateImportTasksService } from './aggregate-import-tasks.service';
import { Article } from 'src/domains/news/domain/entities/article.entity';
import { HttpAPIClientProvider } from 'src/common/providers/http-api-client.provider';
import { Video } from 'src/domains/videos/domain/entities/video.entity';
import env from 'src/common/utils/env.helper';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: env('EUROGAMER_URL'),
      }),
    }),
    TypeOrmModule.forFeature([Article, Video]),
  ],
  providers: [
    HttpAPIClientProvider,
    AggregateDomainsImportService,
    AggregateImportTasksService,
  ],
})
export class ImportFeedModule {}
