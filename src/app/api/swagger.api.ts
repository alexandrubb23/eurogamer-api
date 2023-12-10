import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import env from 'src/common/utils/env.helper';

export function createSwaggerDocument(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Eurogamer API')
    .setDescription('This is the API documentation for the Eurogamer project')
    .setVersion(env('EUROGAMER_DEFAULT_API_VERSION'))
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
