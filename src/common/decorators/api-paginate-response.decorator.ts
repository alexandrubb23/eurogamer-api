import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { PageDto } from '../pagination/dtos/page.dto';

export const ApiPaginatedResponse = <TModel extends Type>(model: TModel) => {
  const properties = {
    results: {
      type: 'array',
      items: { $ref: getSchemaPath(model) },
    },
  };

  const schema = {
    allOf: [{ $ref: getSchemaPath(PageDto) }, { properties }],
  };

  const options = {
    description: `${model.name}s list`,
    schema,
  };

  return applyDecorators(ApiExtraModels(PageDto), ApiOkResponse(options));
};
