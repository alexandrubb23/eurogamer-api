import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { ImportFeedsNewsService } from 'src/services/feeds/import-feeds-news.service';
import { ImportFeedsVideosService } from 'src/services/feeds/import-feeds-videos.service';

@Injectable()
export class ImportFeedsTasksService {
  private readonly logger = new Logger(ImportFeedsTasksService.name);

  constructor(
    private readonly importNewFeedsService: ImportFeedsNewsService,
    private readonly importVideosFeedsService: ImportFeedsVideosService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleImportNewsFeeds() {
    this.importNewFeedsService.importFeeds();
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleImportVideosFeeds() {
    this.importVideosFeedsService.importFeeds();
  }
}
