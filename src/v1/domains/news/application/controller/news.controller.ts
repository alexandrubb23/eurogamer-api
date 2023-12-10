import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { API_ROUTES } from 'src/common/constants/api-routes.constants';
import { Article } from '../../domain/entities/article.entity';
import { NewsQueryParams } from '../queries/news.query';
import { NewsService } from '../../domain/services/news.service';
import { PaginateResponse as PaginateResponse } from 'src/common/interceptors/paginate-response.interceptor';

@ApiTags(API_ROUTES.news)
@Controller({
  path: API_ROUTES.news,
  version: '1',
})
export class NewsController {
  constructor(private readonly videosService: NewsService) {}

  @Get()
  @PaginateResponse(Article)
  getAllNews(@Query() newsQueryParams: NewsQueryParams): Promise<Article[]> {
    return this.videosService.getAllNews(newsQueryParams);
  }
}
