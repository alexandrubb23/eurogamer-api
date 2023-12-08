import { has, trim } from 'lodash';

import { ConfigSchemaType } from '../validators/config.validator';

type KeyOfConfigSchema =
  | keyof ConfigSchemaType
  | (string & NonNullable<unknown>);

const processEnvironmentHasKey = (key: KeyOfConfigSchema) =>
  has(process.env, key);

const getEnvironmentVariable = (
  key: KeyOfConfigSchema,
  defaultValue?: string,
) => (processEnvironmentHasKey(key) ? process.env[key] : defaultValue);

const utils = {
  int(key: KeyOfConfigSchema, defaultValue?: number) {
    if (!processEnvironmentHasKey(key)) {
      return defaultValue;
    }

    const value = process.env[key] as string;
    return parseInt(value, 10);
  },

  float(key: KeyOfConfigSchema, defaultValue?: number) {
    if (!processEnvironmentHasKey(key)) {
      return defaultValue;
    }

    const value = process.env[key] as string;
    return parseFloat(value);
  },

  bool(key: KeyOfConfigSchema, defaultValue?: boolean) {
    if (!processEnvironmentHasKey(key)) {
      return defaultValue;
    }

    const value = process.env[key];
    return value === 'true';
  },

  json<T>(key: KeyOfConfigSchema, defaultValue?: { [key: string]: T }) {
    if (!processEnvironmentHasKey(key)) {
      return defaultValue;
    }

    const value = process.env[key] as string;
    try {
      return JSON.parse(value);
    } catch (error) {
      const ex = error as SyntaxError;

      throw new TypeError(
        `Invalid json environment variable ${key}: ${ex.message}`,
      );
    }
  },

  array<T>(key: KeyOfConfigSchema, defaultValue?: T[]) {
    if (!processEnvironmentHasKey(key)) {
      return defaultValue;
    }

    let value = process.env[key] as string;

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1);
    }

    return value.split(',').map((v) => {
      return trim(trim(v, ' '), '"');
    });
  },

  date(key: KeyOfConfigSchema, defaultValue?: string) {
    if (!processEnvironmentHasKey(key)) {
      return defaultValue;
    }

    const value = process.env[key] as string;
    return new Date(value);
  },
};

const env = Object.assign(getEnvironmentVariable, utils);

export default env;
