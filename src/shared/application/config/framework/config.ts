import { Environment } from '../../../../../process-env';

type OverwriteProps<T> = {
  [key in Environment]: Partial<T>;
};

export interface ConfigProps<T> extends OverwriteProps<T> {
  base: T;
}

export interface ConfigMap<T> {
  get<K extends keyof T>(key: K): T[K];
}

export class Config<T> implements ConfigMap<T> {
  values: T;

  constructor(props: ConfigProps<T>) {
    if (!process.env.NODE_ENV) {
      throw new Error('Config could not be created. Missing NODE_ENV environmental variable');
    }

    this.values = { ...props.base, ...props[process.env.NODE_ENV] };
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.values[key];
  }
}
