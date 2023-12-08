import { Inject } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { keys } from 'lodash/fp';
import { DataSource } from 'typeorm';

import { Domain, DomainAPIClient } from './models/domains.types';
import { DOMAINS_CONFIG } from './constants/domains.constants';
import { HTTP_API_CLIENT } from 'src/common/providers/http-api-client.provider';

export type Item = {
  title: string;
  link: string;
  'dc:creator': string;
  pubDate: string;
  guid: string;
  'media:content': string;
  description: string;
};

export class ImportService {
  constructor(
    @Inject(HTTP_API_CLIENT)
    private readonly apiClient: DomainAPIClient<Item>,
    private readonly dataSource: DataSource,
  ) {}

  // Iterating over DOMAINS_CONFIG to import items for each domain
  // demonstrates a scalable approach. As new domains are added to
  // DOMAINS_CONFIG, the import method will automatically support them.
  public async import() {
    const importDomains: Promise<void>[] = Object.entries(DOMAINS_CONFIG).map(
      ([domain]) =>
        this.importByDomain(domain as Domain).catch((error) => {
          console.error(`Error importing domain: ${domain}`, error);
          return null;
        }),
    );

    const results = await Promise.allSettled(importDomains);

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(
          `Error importing domain: ${keys(DOMAINS_CONFIG)[index]}`,
          result.reason,
        );
      }
    });
  }

  // This method handles the flow of importing items
  // for a specific domain. It correctly separates
  // the steps of fetching items and then importing them via a domain-specific service.
  private async importByDomain(domain: Domain) {
    // The service separates concerns nicely by delegating
    // the domain-specific importing logic to individual domain
    // services and using a repository pattern for database interaction.
    // This makes the code more maintainable.
    const serviceDomain = this.instantiateDomainService(domain);

    const items = await this.getItemsByDomain(domain);

    serviceDomain.importItems(items);
  }

  // A clear and concise method for fetching repositories.
  // It abstracts away the details of interacting with the dataSource.
  private getRepository(target: EntityClassOrSchema) {
    return this.dataSource.getRepository(target);
  }

  // This method effectively fetches items from an external s
  // ource (API) and is flexible to support multiple domains.
  private async getItemsByDomain(domain: Domain) {
    const apiClient = this.apiClient[domain];
    const { rss } = await apiClient.getAll();

    return rss.channel.item;
  }

  // Dynamically instantiating domain services based on configuration is a powerful pattern.
  // It allows for easy extension if new domains are added to your application.
  private instantiateDomainService(domain: Domain) {
    const { entity, service } = DOMAINS_CONFIG[domain];

    const repositoryDomain = this.getRepository(entity);
    const serviceDomain = new service(repositoryDomain);

    return serviceDomain;
  }
}
