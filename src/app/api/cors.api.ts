import { INestApplication } from '@nestjs/common';

function addCors(app: INestApplication) {
  const origin = ['http://localhost:3000'];

  const methods = ['GET'];

  app.enableCors({
    origin,
    methods,
    allowedHeaders: 'Content-Type, Authorization',
  });
}

export default addCors;
