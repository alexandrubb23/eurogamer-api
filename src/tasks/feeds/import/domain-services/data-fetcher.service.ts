import { Injectable, Inject, Logger } from '@nestjs/common';

import { DomainAPIClient, FeedItem, Domain } from '../models/domains.types';
import { HTTP_API_CLIENT } from 'src/common/providers/http-api-client.provider';

@Injectable()
export class DataFetcherService {
  constructor(
    @Inject(HTTP_API_CLIENT)
    private readonly apiClient: DomainAPIClient<FeedItem>,
    private readonly logger: Logger,
  ) {}

  async fetchItemsByDomain(domain: Domain) {
    try {
      const { rss } = await this.apiClient[domain].getAll();
      return rss.channel.item;
    } catch (error) {
      this.logger.error(`Error fetching items from ${domain}`, error);
      throw error;
    }
  }

  public get getApiClient() {
    return this.apiClient;
  }
}
