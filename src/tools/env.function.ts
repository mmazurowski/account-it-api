import { ProcessEnvironments } from '../../process-env';

export const env = (
  key: keyof ProcessEnvironments,
  defaultValue?: string | number,
): string | number => process.env[key] ?? defaultValue ?? '';
