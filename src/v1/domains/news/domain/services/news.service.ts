import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { News } from '../entities/new.entity';
import { NewsQueryParams } from '../../application/queries/news.query';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  getAllNews(newsQueryParams: NewsQueryParams) {
    const { skip, take, order } = newsQueryParams;

    const options: FindManyOptions<News> = {
      skip,
      take,
      order: {
        publishDate: order,
      },
    };

    return this.newsRepository.find(options);
  }

  async getNewsBySlug(slug: string): Promise<News> {
    const news = await this.newsRepository.findOne({
      where: {
        slug,
      },
    });

    if (!news) throw new NotFoundException(`News with slug ${slug} not found`);

    return news;
  }
}
