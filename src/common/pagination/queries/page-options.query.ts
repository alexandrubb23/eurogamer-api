import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../enums/order.enum';
import env from 'src/common/utils/env.helper';

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.DESC })
  @IsEnum(Order)
  @IsOptional()
  readonly order: Order = Order.DESC;

  @ApiPropertyOptional({
    minimum: 1,
    default: env.int('EUROGAMER_DEFAULT_PAGE_NUMBER'),
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = env.int('EUROGAMER_DEFAULT_PAGE_NUMBER');

  @ApiPropertyOptional({
    minimum: env.int('EUROGAMER_DEFAULT_PAGE_SIZE'),
    maximum: 100,
    default: env.int('EUROGAMER_DEFAULT_PAGE_SIZE'),
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  readonly take: number = env.int('EUROGAMER_DEFAULT_PAGE_SIZE');

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
