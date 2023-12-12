import { Controller, Get, Param, Query } from '@nestjs/common';

import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { API_ROUTES } from 'src/common/constants/api-routes.constants';
import { API_TAGS } from 'src/common/constants/api-tags.constants';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginate-response.decorator';
import { PaginateResponse } from 'src/common/interceptors/paginate-response.interceptor';
import { Video } from '../../domain/entities/video.entity';
import { VideosService } from '../../domain/services/videos.service';
import { VideosQueryParams } from '../queries/videos.query';

@ApiTags(API_TAGS.videos)
@Controller({
  path: API_ROUTES.videos,
  version: '1',
})
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @ApiPaginatedResponse(Video)
  @ApiFoundResponse({ type: Video })
  @PaginateResponse(Video)
  @Get()
  getAllVideos(
    @Query() videosQueryParams: VideosQueryParams,
  ): Promise<Video[]> {
    return this.videosService.getAllVideos(videosQueryParams);
  }

  @ApiFoundResponse({ type: Video })
  @Get(':slug')
  getVideoBySlug(@Param('slug') slug: string): Promise<Video> {
    return this.videosService.getVideoBySlug(slug);
  }
}
