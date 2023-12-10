import { Controller, Get, Query } from '@nestjs/common';

import { Video } from '../../domain/entities/video.entity';
import { VideosService } from '../../domain/services/videos.service';
import { PaginateResponse } from 'src/common/interceptors/paginate-response.interceptor';
import { VideosQueryParams } from '../queries/videos.query';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  @PaginateResponse(Video)
  getAllVideos(
    @Query() videosQueryParams: VideosQueryParams,
  ): Promise<Video[]> {
    return this.videosService.getAllVideos(videosQueryParams);
  }
}
