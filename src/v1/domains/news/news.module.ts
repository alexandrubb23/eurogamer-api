import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './domain/entities/new.entity';
import { NewsService } from './domain/services/news.service';
import { NewsController } from './application/controller/news.controller';

@Module({
  controllers: [NewsController],
  imports: [TypeOrmModule.forFeature([News])],
  providers: [NewsService],
})
export class NewsModule {}
