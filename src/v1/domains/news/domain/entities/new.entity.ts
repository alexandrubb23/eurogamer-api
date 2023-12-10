import { FeedEntry } from 'src/common/domains/entities/feed-entry.entity';
import { Entity } from 'typeorm';

@Entity('news')
export class News extends FeedEntry {}
