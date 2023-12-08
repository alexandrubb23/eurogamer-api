import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { ImportService } from 'src/services/import/import.service';

@Injectable()
export class ImportTasksService {
  constructor(private readonly importService: ImportService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleImport() {
    this.importService.import();
  }
}
