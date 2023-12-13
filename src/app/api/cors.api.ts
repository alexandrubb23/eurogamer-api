import { INestApplication } from '@nestjs/common';

function addCors(app: INestApplication) {
  const origin = ['*'];

  const methods = ['GET'];

  app.enableCors({
    origin,
    methods,
    allowedHeaders: 'Content-Type, Authorization',
  });
}

export default addCors;
