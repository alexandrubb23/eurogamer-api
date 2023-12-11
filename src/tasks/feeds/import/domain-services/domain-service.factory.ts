import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AggregateDomainImportService } from '../aggregate-abstract-domain.import.service';
import { AggregateDomainsImportService } from '../aggregate-domains-import.service';
import { DOMAINS_CONFIG } from '../constants/domains.constants';
import { Domain } from '../models/domains.types';

@Injectable()
export class DomainServiceFactory {
  constructor(private readonly dataSource: DataSource) {}

  createService(
    domainImportService: AggregateDomainsImportService,
    domain: Domain,
  ) {
    const { entity, service } = DOMAINS_CONFIG[domain];
    const repositoryDomain = this.dataSource.getRepository(entity);
    const serviceInstance = new service(domainImportService, repositoryDomain);

    if (!(serviceInstance instanceof AggregateDomainImportService)) {
      throw new Error(
        `Service ${
          (serviceInstance as NonNullable<unknown>).constructor.name
        } must extend AggregateDomainImportService`,
      );
    }

    return serviceInstance;
  }
}
