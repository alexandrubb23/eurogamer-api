import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from 'src/common/constants/api-tags.constants';
import { News } from '../../domain/entities/new.entity';
import { NewsQueryParams } from '../queries/news.query';
import { NewsService } from '../../domain/services/news.service';
import { PaginateResponse as PaginateResponse } from 'src/common/interceptors/paginate-response.interceptor';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginate-response.decorator';
import env from 'src/common/utils/env.helper';
import { API_ROUTES } from 'src/common/constants/api-routes.constants';

@ApiTags(API_TAGS.news)
@Controller({
  path: API_ROUTES.news,
  version: env('EUROGAMER_DEFAULT_API_VERSION'),
})
export class NewsController {
  constructor(private readonly videosService: NewsService) {}

  @ApiPaginatedResponse(News)
  @ApiFoundResponse({ type: News })
  @PaginateResponse(News)
  @Get()
  getAllNews(@Query() newsQueryParams: NewsQueryParams): Promise<News[]> {
    return this.videosService.getAllNews(newsQueryParams);
  }

  @ApiFoundResponse({ type: News })
  @Get(':slug')
  getVideoBySlug(@Param('slug') slug: string): Promise<News> {
    return this.videosService.getNewsBySlug(slug);
  }
}
