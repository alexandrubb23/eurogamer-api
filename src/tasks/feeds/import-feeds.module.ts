import { Module } from '@nestjs/common';

import { ImportFeedsTasksService } from './import-feeds.service';

@Module({
  providers: [ImportFeedsTasksService],
})
export class ImportFeedsModule {}
