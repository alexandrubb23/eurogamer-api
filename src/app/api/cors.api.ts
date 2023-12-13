import { INestApplication } from '@nestjs/common';

function addCors(app: INestApplication) {
  app.enableCors();
}

export default addCors;
