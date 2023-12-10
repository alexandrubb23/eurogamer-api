import { Module } from '@nestjs/common';

import { VideosController } from './application/controller/videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './domain/entities/video.entity';
import { VideosService } from './domain/services/videos.service';

@Module({
  controllers: [VideosController],
  imports: [TypeOrmModule.forFeature([Video])],
  providers: [VideosService],
})
export class VideosModule {}
