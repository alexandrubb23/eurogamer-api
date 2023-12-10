import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './domain/entities/article.entity';
import { NewsService } from './domain/services/news.service';
import { NewsController } from './application/controller/news.controller';

@Module({
  controllers: [NewsController],
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [NewsService],
})
export class NewsModule {}
