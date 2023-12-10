import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { AggregateDomainImportService } from 'src/services/import/aggregate-domain-import.service';

@Injectable()
export class AggregateImportTasksService {
  constructor(private readonly importService: AggregateDomainImportService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleImport() {
    this.importService.import();
  }
}
