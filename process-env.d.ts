export enum Environment {
  DEVELOPMENT = 'development',
  TEST = 'test',
  STAGING = 'staging',
  PRODUCTION = 'production',
  CI = 'ci',
}

export type NodeEnvType = Environment;

export interface ProcessEnvironments {
  NODE_ENV: NodeEnvType;
  SERVICE_NAME: string;

  APP_HOST: string;
  APP_PORT: number;

  LOG_LEVEL: 'error' | 'debug' | 'log' | 'warn' | 'verbose' | 'info';

  CORS_WHITELIST: string;

  DATABASE_HOST: string;
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_PORT: number;

  MONGO_USER: string;
  MONGO_PORT: number;
  MONGO_PASSWORD: string;
  MONGO_DATABASE: string;

  MESSAGE_HOST: string;
  MESSAGE_BROKER_PORT: string;
  MESSAGE_BROKER_ADMIN_PORT: string;
}

declare namespace NodeJS {
  type ProcessEnv = ProcessEnvironments;
}
