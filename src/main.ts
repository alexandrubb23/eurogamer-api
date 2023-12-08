import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './common/utils/env.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const EUROGAMER_APP_PORT = env.int('EUROGAMER_APP_PORT');

  await app.listen(EUROGAMER_APP_PORT, () => {
    console.log(`App listening on port ${EUROGAMER_APP_PORT}`);
  });
}

bootstrap();
