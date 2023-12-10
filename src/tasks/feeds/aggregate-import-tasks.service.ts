import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import env from 'src/common/utils/env.helper';

import { AggregateDomainsImportService } from 'src/tasks/feeds/import/aggregate-domains-import.service';
import { KeyOfCronExpression } from './import/models/cron-expression.types';

@Injectable()
export class AggregateImportTasksService {
  private static CRON_TIME = env(
    'EUROGAMER_FEED_IMPORT_FREQUENCY',
  ) as KeyOfCronExpression;

  constructor(private readonly importService: AggregateDomainsImportService) {}

  @Cron(CronExpression[AggregateImportTasksService.CRON_TIME])
  handleImport() {
    this.importService.import();
  }
}
