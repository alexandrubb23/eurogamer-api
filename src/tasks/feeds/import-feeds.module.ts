import { Module } from '@nestjs/common';

import { ImportFeedsTasksService } from './import-feeds.service';
import { ImportFeedsNewsService } from 'src/services/feeds/import-feeds-news.service';
import { ImportFeedsVideosService } from 'src/services/feeds/import-feeds-videos.service';

@Module({
  providers: [
    ImportFeedsNewsService,
    ImportFeedsTasksService,
    ImportFeedsVideosService,
  ],
})
export class ImportFeedsModule {}
