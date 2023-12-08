import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ImportFeedsTasksService {
  private readonly logger = new Logger(ImportFeedsTasksService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.debug('Called every 10 seconds');
  }
}
