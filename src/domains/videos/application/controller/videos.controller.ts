import { Controller, Get } from '@nestjs/common';

import { Video } from '../../domain/entities/video.entity';
import { VideosService } from '../../domain/services/videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  getAllVideos(): Promise<Video[]> {
    return this.videosService.getAllVideos();
  }
}
