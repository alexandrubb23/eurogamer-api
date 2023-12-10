import { Controller, Get, Query } from '@nestjs/common';

import { Article } from '../../domain/entities/article.entity';
import { NewsService } from '../../domain/services/news.service';
import { PaginateResponse as PaginateResponse } from 'src/common/interceptors/paginate-response.interceptor';
import { NewsQueryParams } from '../queries/news.query';

@Controller('news')
export class NewsController {
  constructor(private readonly videosService: NewsService) {}

  @Get()
  @PaginateResponse(Article)
  getAllNews(@Query() newsQueryParams: NewsQueryParams): Promise<Article[]> {
    return this.videosService.getAllNews(newsQueryParams);
  }
}
