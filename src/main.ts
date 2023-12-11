import { NestFactory } from '@nestjs/core';

import { apiVersioning } from './app/api/default-versioning.api';
import { AppModule } from './app.module';
import { validatePipe } from './app/validators/pipe.validator';
import env from './common/utils/env.helper';
import { createSwaggerDocument } from './app/api/swagger.api';
import addCors from './app/api/cors.api';

const appModules = [
  addCors,
  apiVersioning,
  createSwaggerDocument,
  validatePipe,
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appModules.forEach((module) => module(app));

  const EUROGAMER_APP_PORT = env.int('EUROGAMER_APP_PORT');
  await app.listen(EUROGAMER_APP_PORT, () => {
    console.log(`App listening on port ${EUROGAMER_APP_PORT}`);
  });
}

bootstrap();
