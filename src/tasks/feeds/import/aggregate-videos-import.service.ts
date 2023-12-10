import { Repository } from 'typeorm';

import { Video } from 'src/v1/domains/videos/domain/entities/video.entity';
import { AggregateDomainImportService } from './aggregate-abstract-domain.import.service';
import { AggregateDomainsImportService } from './aggregate-domains-import.service';
import { DOMAINS } from './constants/domains.constants';

export class AggregateVideoImportService extends AggregateDomainImportService {
  constructor(
    protected readonly importService: AggregateDomainsImportService,
    protected readonly videosRepository: Repository<Video>,
  ) {
    super(DOMAINS.VIDEOS, importService, videosRepository);
  }
}
