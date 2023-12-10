import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AggregateDomainsImportService } from 'src/tasks/feeds/import/aggregate-domains-import.service';
import { AggregateImportTasksService } from './aggregate-import-tasks.service';
import { News } from 'src/v1/domains/news/domain/entities/new.entity';
import { HttpAPIClientProvider } from 'src/common/providers/http-api-client.provider';
import { Video } from 'src/v1/domains/videos/domain/entities/video.entity';
import env from 'src/common/utils/env.helper';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: env('EUROGAMER_URL'),
      }),
    }),
    TypeOrmModule.forFeature([News, Video]),
  ],
  providers: [
    HttpAPIClientProvider,
    AggregateDomainsImportService,
    AggregateImportTasksService,
  ],
})
export class ImportFeedModule {}
