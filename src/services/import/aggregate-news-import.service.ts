import { Repository } from 'typeorm';

import { Article } from 'src/domains/news/domain/entities/article.entity';
import {
  AggregateDomainImportService,
  FeedItem,
} from './aggregate-domain-import.service';

export class AggregateNewsImportService {
  constructor(
    private readonly importService: AggregateDomainImportService,
    private readonly newsRepository: Repository<Article>,
  ) {}

  public async importData(items: FeedItem[]) {
    // items.forEach((item) => {
    //   this.articlesRepository.save({
    //     uuid: crypto.randomUUID(),
    //     title: item.title,
    //     description: item.description,
    //     thumbnail: item.link,
    //     link: item.link,
    //     publishDate: item.pubDate,
    //   });
    // });
  }
}
