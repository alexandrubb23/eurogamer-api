import { HttpService } from '@nestjs/axios';

import { RSSAPIClient } from 'src/services/api-client.service';
import { DOMAINS_CONFIG } from 'src/services/import/constants/domains.constants';
import { DomainAPIClient } from 'src/services/import/models/domains.types';

export const HTTP_API_CLIENT = 'HTTP_API_CLIENT';

export const HttpAPIClientProvider = {
  provide: HTTP_API_CLIENT,
  useFactory: <T>(httpService: HttpService) => {
    return Object.entries(DOMAINS_CONFIG).reduce((acc, [domain]) => {
      const { endpoint } = DOMAINS_CONFIG[domain];

      return {
        ...acc,
        [domain]: new RSSAPIClient<T>(endpoint, httpService),
      };
    }, {} as DomainAPIClient<T>);
  },
  inject: [HttpService],
};
