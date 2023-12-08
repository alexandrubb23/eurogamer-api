import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { HttpAPIClientProvider } from 'src/common/providers/http-api-client.provider';
import { ImportService } from 'src/services/import/import.service';
import { ImportTasksService } from './import-feeds.service';
import env from 'src/common/utils/env.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/domains/news/domain/entities/article.entity';
import { Video } from 'src/domains/videos/domain/entities/video.entity';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: env('EUROGAMER_FEED_URL'),
      }),
    }),
    TypeOrmModule.forFeature([Article, Video]),
  ],
  providers: [HttpAPIClientProvider, ImportService, ImportTasksService],
})
export class ImportFeedsModule {}
