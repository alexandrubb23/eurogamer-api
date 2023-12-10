import { INestApplication, VersioningType } from '@nestjs/common';

import env from 'src/common/utils/env.helper';

export function apiVersioning(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: env('EUROGAMER_DEFAULT_API_VERSION'),
  });
}
