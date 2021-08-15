import { ConfigMap } from '@application/config/framework/config';

export interface BaseConfigValues {}

export type EnvironmentConfigValues = Partial<BaseConfigValues>;

export type ApplicationConfig = ConfigMap<BaseConfigValues>;
