import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AggregateDomainsImportService } from 'src/tasks/feeds/import/aggregate-domains-import.service';
import { AggregateImportTasksService } from './aggregate-import-tasks.service';
import { DataFetcherService } from './import/domain-services/data-fetcher.service';
import { DomainServiceFactory } from './import/domain-services/domain-service.factory';
import { HttpAPIClientProvider } from 'src/common/providers/http-api-client.provider';
import { News } from 'src/v1/domains/news/domain/entities/new.entity';
import { Video } from 'src/v1/domains/videos/domain/entities/video.entity';
import env from 'src/common/utils/env.helper';
import FeedEntryParserService from './import/domain-services/feed-parser.service';

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
    AggregateDomainsImportService,
    AggregateImportTasksService,
    DataFetcherService,
    DomainServiceFactory,
    FeedEntryParserService,
    HttpAPIClientProvider,
    Logger,
  ],
})
export class ImportFeedModule {}
