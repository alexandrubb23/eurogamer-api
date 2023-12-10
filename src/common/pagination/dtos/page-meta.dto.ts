import { ApiProperty } from '@nestjs/swagger';
import { IPageMetaDtoParameters } from '../models/page-meta-dto-parameters.interface';

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemsCount: number;

  @ApiProperty()
  readonly pagesCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({
    itemsCount,
    pageOptionsDto: { page, take },
  }: IPageMetaDtoParameters) {
    this.page = page;
    this.take = take;
    this.itemsCount = itemsCount;
    this.pagesCount = Math.ceil(this.itemsCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pagesCount;
  }
}
