import { PrimaryColumn, Index, Column } from 'typeorm';

export class FeedEntry {
  @PrimaryColumn()
  @Index({ unique: true })
  readonly uuid: string;

  @Index()
  @Column()
  readonly slug: string;

  @Column()
  readonly title: string;

  @Column({
    type: 'longtext',
  })
  readonly description: string;

  @Column()
  readonly thumbnail: string;

  @Column()
  readonly publishDate: string;
}
