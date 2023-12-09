import { Repository } from 'typeorm';

import { Article } from 'src/domains/news/domain/entities/article.entity';
import { ImportService, ItemResponse } from './import.service';

export class ImportNewsService {
  constructor(
    private readonly importService: ImportService,
    private readonly newsRepository: Repository<Article>,
  ) {}

  public async importData(items: ItemResponse[]) {
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
