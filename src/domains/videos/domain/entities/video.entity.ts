import { Item } from 'src/domains/entities/item.entity';
import { Entity } from 'typeorm';

@Entity('videos')
export class Video extends Item {}
