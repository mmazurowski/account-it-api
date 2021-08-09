import * as Winston from 'winston';
import { env } from '@tools/env.function';

export type LeveledLogMethod = (message: string, error?: unknown) => Logger;

export type LogMethod = (level: string, message: string) => Logger;

export interface Logger {
  log: LogMethod;
  error: LeveledLogMethod;
  warn: LeveledLogMethod;
  info: LeveledLogMethod;
  verbose: LeveledLogMethod;
  debug: LeveledLogMethod;
}

const logFormat = Winston.format.printf(({ level, message }) => `[${level}]: ${message}`);

export const logger = Winston.createLogger({
  level: env('LOG_LEVEL') as string,
  format: Winston.format.combine(
    Winston.format.colorize(),
    Winston.format.splat(),
    Winston.format.align(),
    logFormat,
  ),
  transports: [new Winston.transports.Console()],
});
