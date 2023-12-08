import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './common/utils/env.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const EUROGAMER_API_PORT = env.int('EUROGAMER_API_PORT');

  await app.listen(EUROGAMER_API_PORT, () => {
    console.log(`App listening on port ${EUROGAMER_API_PORT}`);
  });
}

bootstrap();
