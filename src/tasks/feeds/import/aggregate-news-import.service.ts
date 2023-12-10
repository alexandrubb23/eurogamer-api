import { Repository } from 'typeorm';

import { News } from 'src/v1/domains/news/domain/entities/new.entity';
import { AggregateDomainImportService } from './aggregate-abstract-domain.import.service';
import { AggregateDomainsImportService } from './aggregate-domains-import.service';
import { DOMAINS } from './constants/domains.constants';

export class AggregateNewsImportService extends AggregateDomainImportService {
  constructor(
    protected readonly importService: AggregateDomainsImportService,
    protected readonly newsRepository: Repository<News>,
  ) {
    super(DOMAINS.NEWS, importService, newsRepository);
  }
}
