import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import { NewsQueryParams } from '../../application/queries/news.query';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(Article)
    private readonly newsRepository: Repository<Article>,
  ) {}

  getAllNews(newsQueryParams: NewsQueryParams) {
    const { skip, take, order } = newsQueryParams;

    const options: FindManyOptions<Article> = {
      skip,
      take,
      order: {
        publishDate: order,
      },
    };

    return this.newsRepository.find(options);
  }
}
