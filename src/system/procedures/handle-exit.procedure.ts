import { AwilixContainer } from 'awilix';
import { Procedure, System } from '@lunar-flight-v/system';

import { Logger } from '@root/application/logger/logger';
import { exitRuntime } from '@system/runtimes/exit.runtime';

export class HandleExitProcedure extends Procedure<AwilixContainer, AwilixContainer> {
  async run(container: AwilixContainer): Promise<AwilixContainer> {
    const logger = container.resolve<Logger>('logger');
    const system = new System();

    process.on('uncaughtException', async (err) => {
      logger.error(`Unhandled exception: ${(err as Error).message}`);

      await system.execute(exitRuntime);

      process.exit(1);
    });

    process.on('unhandledRejection', async (err) => {
      logger.error(`Unhandled Rejection error: ${(err as Error).message}`);

      process.exit(1);
    });

    process.on('SIGTERM', async () => {
      logger.info('SIGTERM signal received.');

      // here we should perform graceful shutdown, close DB connections, etc
    });

    return container;
  }
}
