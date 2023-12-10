import { Controller, Get } from '@nestjs/common';

import { Article } from '../../domain/entities/article.entity';
import { NewsService } from '../../domain/services/news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly videosService: NewsService) {}

  @Get()
  getAllNews(): Promise<Article[]> {
    return this.videosService.getAllNews();
  }
}
