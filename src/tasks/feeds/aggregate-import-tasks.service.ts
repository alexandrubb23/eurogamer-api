import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { AggregateDomainsImportService } from 'src/tasks/feeds/import/aggregate-domains-import.service';

@Injectable()
export class AggregateImportTasksService {
  constructor(private readonly importService: AggregateDomainsImportService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleImport() {
    this.importService.import();
  }
}
