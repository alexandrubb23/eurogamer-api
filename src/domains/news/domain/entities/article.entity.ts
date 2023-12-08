import { Item } from 'src/domains/entities/item.entity';
import { Entity } from 'typeorm';

@Entity('articles')
export class Article extends Item {}
