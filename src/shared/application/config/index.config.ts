import { BaseConfigValues } from './config.type';
import { ConfigProps } from './framework/config';

export const indexConfig: ConfigProps<BaseConfigValues> = {
  base: {
    MESSAGE_BROKER_EXCHANGE: 'enterprise-exchange',
  },
  development: {},
  production: {},
  staging: {},
  test: {},
  ci: {},
};
