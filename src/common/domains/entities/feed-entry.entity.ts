import { PrimaryColumn, Index, Column } from 'typeorm';

export class FeedEntry {
  @PrimaryColumn()
  @Index({ unique: true })
  readonly uuid: string;

  @Column()
  readonly title: string;

  @Column({
    type: 'longtext',
  })
  readonly description: string;

  @Column()
  readonly thumbnail: string;

  @Column()
  @Index({ unique: true })
  readonly link: string;

  @Column()
  readonly publishDate: string;
}
