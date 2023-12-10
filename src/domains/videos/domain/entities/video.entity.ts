import { FeedEntry } from 'src/common/domains/entities/feed-entry.entity';
import { Entity } from 'typeorm';

@Entity('videos')
export class Video extends FeedEntry {}
