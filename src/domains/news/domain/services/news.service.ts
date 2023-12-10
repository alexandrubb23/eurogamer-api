import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(Article)
    private readonly newsRepository: Repository<Article>,
  ) {}

  getAllNews() {
    return this.newsRepository.find();
  }
}
