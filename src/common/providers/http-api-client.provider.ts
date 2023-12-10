import { HttpService } from '@nestjs/axios';

import { APIClientService } from 'src/services/api-client.service';
import { DOMAINS_CONFIG } from 'src/tasks/feeds/import/constants/domains.constants';
import { DomainAPIClient } from 'src/tasks/feeds/import/models/domains.types';

export const HTTP_API_CLIENT = 'HTTP_API_CLIENT';

export const HttpAPIClientProvider = {
  provide: HTTP_API_CLIENT,
  useFactory: <T>(httpService: HttpService) => {
    return Object.entries(DOMAINS_CONFIG).reduce((acc, [domain]) => {
      const { endpoint } = DOMAINS_CONFIG[domain];
      acc[domain] = new APIClientService<T>(endpoint, httpService);
      return acc;
    }, {} as DomainAPIClient<T>);
  },
  inject: [HttpService],
};
