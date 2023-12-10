import { FindManyOptions, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Video } from '../entities/video.entity';
import { VideosQueryParams } from '../../application/queries/videos.query';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videosRepository: Repository<Video>,
  ) {}

  getAllVideos(videosQueryParams: VideosQueryParams) {
    const { skip, take, order } = videosQueryParams;

    const options: FindManyOptions<Video> = {
      skip,
      take,
      order: {
        publishDate: order,
      },
    };

    return this.videosRepository.find(options);
  }
}
