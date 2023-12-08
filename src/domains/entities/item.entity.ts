import { PrimaryColumn, Index, Column } from 'typeorm';

export class Item {
  @PrimaryColumn()
  @Index({ unique: true })
  uuid: string;

  @Column()
  title: string;

  @Column({
    length: 3000,
  })
  description: string;

  @Column()
  thumbnail: string;

  @Column()
  link: string;

  @Column()
  publishDate: string;
}
