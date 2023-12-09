import { z } from 'zod';

const EUROGAMER_API_CONFIG = {
  EUROGAMER_APP_PORT: z.coerce.number().positive(),
};

const EUROGAMER_FEED_CONFIG = {
  EUROGAMER_URL: z.string().url(),
};

const configSchema = z.object({
  ...EUROGAMER_API_CONFIG,
  ...EUROGAMER_FEED_CONFIG,
});

export type ConfigSchemaType = z.infer<typeof configSchema>;

const validateEnvironmentVariables = (
  config: Record<string, ConfigSchemaType>,
) => configSchema.parse(config);

export default validateEnvironmentVariables;
