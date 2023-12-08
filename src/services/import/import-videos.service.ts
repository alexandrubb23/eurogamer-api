import { Repository } from 'typeorm';
import * as crypto from 'crypto';

import { Video } from 'src/domains/videos/domain/entities/video.entity';
import { Item } from './import.service';

export class ImportVideosService {
  constructor(private readonly videosRepository: Repository<Video>) {}

  public async importItems(items: Item[]) {
    items.forEach((item) => {
      this.videosRepository.save({
        uuid: crypto.randomUUID(),
        title: item.title,
        description: item.description,
        thumbnail: item.link,
        link: item.link,
        publishDate: item.pubDate,
      });
    });
  }
}
