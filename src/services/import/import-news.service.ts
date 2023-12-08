import * as crypto from 'crypto';
import { Repository } from 'typeorm';

import { Article } from 'src/domains/news/domain/entities/article.entity';
import { Item } from './import.service';

export class ImportNewsService {
  constructor(private readonly articlesRepository: Repository<Article>) {}

  public async importItems(items: Item[]) {
    items.forEach((item) => {
      this.articlesRepository.save({
        uuid: crypto.randomUUID(),
        title: item.title,
        description: item.description,
        thumbnail: item.link,
        link: item.link,
        publishDate: item.pubDate,
      });
    });
  }
}
