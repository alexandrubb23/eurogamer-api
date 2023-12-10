import { Repository } from 'typeorm';

import { Article } from 'src/domains/news/domain/entities/article.entity';
import { AggregateDomainImportService } from './aggregate-abstract-domain.import.service';
import { AggregateDomainsImportService } from './aggregate-domains-import.service';
import { DOMAINS } from './constants/domains.constants';

export class AggregateNewsImportService extends AggregateDomainImportService {
  constructor(
    protected readonly importService: AggregateDomainsImportService,
    protected readonly newsRepository: Repository<Article>,
  ) {
    super(DOMAINS.NEWS, importService, newsRepository);
  }
}
