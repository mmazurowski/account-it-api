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

  APP_HOST: string;
  APP_PORT: number;

  LOG_LEVEL: 'error' | 'debug' | 'log' | 'warn' | 'verbose' | 'info';

  CORS_WHITELIST: string;
}

declare namespace NodeJS {
  type ProcessEnv = ProcessEnvironments;
}
