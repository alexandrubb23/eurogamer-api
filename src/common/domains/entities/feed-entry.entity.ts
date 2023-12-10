import { PrimaryColumn, Index, Column } from 'typeorm';

export class FeedEntry {
  @PrimaryColumn()
  @Index({ unique: true })
  uuid: string;

  @Column()
  title: string;

  @Column({
    type: 'longtext',
  })
  description: string;

  @Column()
  thumbnail: string;

  @Column()
  @Index({ unique: true })
  link: string;

  @Column()
  publishDate: string;
}
