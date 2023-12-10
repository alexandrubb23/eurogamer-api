import { z } from 'zod';
import { CronExpression } from '@nestjs/schedule';

import { KeyOfCronExoression } from 'src/tasks/feeds/import/models/cron-expression.types';

const EUROGAMER_API_CONFIG = {
  EUROGAMER_APP_PORT: z.coerce.number().positive(),
  EUROGAMER_DEFAULT_API_VERSION: z.string(),
};

const EUROGAMER_DATABASE_CONFIG = {
  EUROGAMER_DB_HOST: z.string(),
  EUROGAMER_DB_PORT: z.coerce.number().positive(),
  EUROGAMER_DB_USERNAME: z.string(),
  EUROGAMER_DB_PASSWORD: z.string(),
  EUROGAMER_DB_NAME: z.string(),
};

const EUROGAMER_FEED_CONFIG = {
  EUROGAMER_URL: z.string().url(),
  EUROGAMER_FEED_IMPORT_FREQUENCY: z.custom(
    (value: KeyOfCronExoression) => CronExpression[value],
    (value: unknown) => ({
      message: `Invalid CronExpression key (${value}), Please check the documentation at https://docs.nestjs.com/techniques/task-scheduling#declarative-cron-jobs`,
    }),
  ),
  EUROGAMER_LIMIT_CONCURRENT_DOMAINS_REQUESTS: z.coerce.number().positive(),
  EUROGAMER_LIMIT_CONCURRENT_ITEMS_REQUESTS: z.coerce.number().positive(),
};

const EUROGAMER_PAGINATION_CONFIG = {
  EUROGAMER_DEFAULT_PAGE_SIZE: z.coerce.number().positive(),
  EUROGAMER_DEFAULT_PAGE_NUMBER: z.coerce.number().positive(),
};

const configSchema = z.object({
  ...EUROGAMER_API_CONFIG,
  ...EUROGAMER_DATABASE_CONFIG,
  ...EUROGAMER_FEED_CONFIG,
  ...EUROGAMER_PAGINATION_CONFIG,
});

export type ConfigSchemaType = z.infer<typeof configSchema>;

const validateEnvironmentVariables = (
  config: Record<string, ConfigSchemaType>,
) => configSchema.parse(config);

export default validateEnvironmentVariables;
