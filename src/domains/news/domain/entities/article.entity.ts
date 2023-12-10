import { FeedEntry } from 'src/common/domains/entities/feed-entry.entity';
import { Entity } from 'typeorm';

@Entity('articles')
export class Article extends FeedEntry {}
