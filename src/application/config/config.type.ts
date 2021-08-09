import { ConfigMap } from '@application/config/framework/config';

export interface BaseConfigValues {
  test: string;
}

export type EnvironmentConfigValues = Partial<BaseConfigValues>;

export type ApplicationConfig = ConfigMap<BaseConfigValues>;
