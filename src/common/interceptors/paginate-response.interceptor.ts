import { UseInterceptors } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { factoryPaginationInterceptor } from './pagination.interceptor';

/**
 * Higher-order interceptor function for paginating results based on a specific entity.
 *
 * This function composes two interceptors:
 * - `SetEntityInterceptor`: Sets the entity type in the request.
 * - `PaginateResponse`: Handles pagination logic based on the entity type.
 *
 * Usage Example:
 * ```
 * @PaginateResponseInterceptor(New)
 * @Controller('news')
 * export class NewsController {
 *   // Your controller logic here
 * }
 * ```
 *
 * @param entity - The entity type to be used for pagination.
 * @returns A decorator function that can be used with NestJS controllers.
 */
export const PaginateResponse = (entity: EntityClassOrSchema) =>
  UseInterceptors(factoryPaginationInterceptor(entity));
