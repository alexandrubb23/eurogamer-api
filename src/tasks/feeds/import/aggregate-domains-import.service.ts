import { Injectable, Logger } from '@nestjs/common';
import { keys } from 'lodash/fp';

import { ConfigService } from '@nestjs/config';
import env from 'src/common/utils/env.helper';
import { limitConcurrentRequests } from 'src/common/utils/limit-concurrent-requests.utils';
import { ConfigSchemaType } from 'src/common/validators/config.validator';
import { DOMAINS_CONFIG } from './constants/domains.constants';
import { Domain } from './models/domains.types';
import { DataFetcherService } from './domain-services/data-fetcher.service';
import { DomainServiceFactory } from './domain-services/domain-service.factory';

@Injectable()
export class AggregateDomainsImportService {
  private readonly limitRequests = env.int(
    'EUROGAMER_LIMIT_CONCURRENT_DOMAINS_REQUESTS',
  );

  constructor(
    private readonly dataFetcherService: DataFetcherService,
    private readonly domainServiceFactory: DomainServiceFactory,
    private readonly configService: ConfigService<ConfigSchemaType>,
    private readonly logger: Logger,
  ) {}

  public async import() {
    const importDomains = Object.entries(DOMAINS_CONFIG).map(
      ([domain]) =>
        () =>
          this.importByDomain(domain as Domain),
    );

    const importedDomains = await limitConcurrentRequests(
      importDomains,
      this.limitRequests,
    );

    importedDomains.forEach((importedDomain, index) => {
      if (importedDomain.status === 'fulfilled') {
        this.logger.debug(`Imported domain: ${keys(DOMAINS_CONFIG)[index]}`);
      } else {
        this.logger.error(
          `Error importing domain: ${keys(DOMAINS_CONFIG)[index]}`,
          importedDomain.reason,
        );
      }
    });
  }

  private async importByDomain(domain: Domain) {
    const serviceDomain = this.domainServiceFactory.createService(this, domain);
    const items = await this.dataFetcherService.fetchItemsByDomain(domain);

    serviceDomain.importData(items);
  }

  public get getApiClient() {
    return this.dataFetcherService.getApiClient;
  }

  public get getConfigService() {
    return this.configService;
  }
}
