import { BaseConfigValues } from './config.type';
import { ConfigProps } from './framework/config';

export const indexConfig: ConfigProps<BaseConfigValues> = {
  base: {
    test: 'test',
  },
  development: {},
  production: {},
  staging: {},
  test: {},
  ci: {},
};
