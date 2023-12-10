import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ConfigService } from '@nestjs/config';

import { ConfigSchemaType } from '../validators/config.validator';
import { isArray } from 'lodash';
import { PageDto } from '../pagination/dtos/page.dto';
import { PageMetaDto } from '../pagination/dtos/page-meta.dto';
import { PageOptionsQueryParameters } from '../pagination/queries/page-options.query';

export interface WhereClauseRequest<T> extends Request {
  whereClause: FindManyOptions<T>;
}

interface EntityRequest extends Request {
  entity: EntityClassOrSchema;
}

export function factoryPaginationInterceptor(entity: EntityClassOrSchema) {
  @Injectable()
  class PaginationInterceptor implements NestInterceptor {
    #repository: Repository<EntityClassOrSchema>;

    constructor(
      public readonly dataSource: DataSource,
      public readonly configService: ConfigService<ConfigSchemaType>,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context
        .switchToHttp()
        .getRequest<WhereClauseRequest<EntityClassOrSchema> & EntityRequest>();

      return next.handle().pipe(
        mergeMap(async (data: EntityClassOrSchema[]) => {
          if (!isArray(data)) return data;

          this.#repository = this.dataSource.getRepository(entity);
          const countTotal = await this.#repository.count(request.whereClause);

          const pageMetaDto = this.#getPageMetaDtoFromRequest(
            request,
            countTotal,
          );

          return new PageDto(data, pageMetaDto);
        }),
      );
    }

    #getPageMetaDtoFromRequest(
      request: Request,
      countTotal: number,
    ): PageMetaDto {
      const pageMetaDtoParameters = {
        pageQueryParameters: {
          ...request.query,
          page: Number(
            request.query.page ??
              this.configService.get('EUROGAMER_DEFAULT_PAGE_NUMBER'),
          ),
          take: Number(
            request.query.take ??
              this.configService.get('EUROGAMER_DEFAULT_PAGE_SIZE'),
          ),
        } as PageOptionsQueryParameters,
        itemsCount: countTotal,
      };

      return new PageMetaDto(pageMetaDtoParameters);
    }
  }

  return PaginationInterceptor;
}
