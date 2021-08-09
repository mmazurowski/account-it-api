import { Application } from 'express';
import { AwilixContainer } from 'awilix';
import { Procedure } from '@lunar-flight-v/system';

import { Logger } from '@root/application/logger/logger';
import { env } from '@tools/env.function';

export class StartServerProcedure extends Procedure<AwilixContainer, AwilixContainer> {
  async run(container: AwilixContainer): Promise<AwilixContainer> {
    const expressServer = container.resolve<Application>('server');
    const logger = container.resolve<Logger>('logger');

    const APP_PORT = env('APP_PORT', 4000);
    const APP_HOST = env('APP_HOST', 'http://localhost');

    const app = expressServer.listen(APP_PORT, () =>
      logger.info(`Server is listening on ${APP_HOST}:${APP_PORT}`),
    );

    process.on('SIGTERM', () => {
      logger.info('HTTP server closing');

      app.close(() => {
        logger.info('HTTP server closed');
      });
    });

    return container;
  }
}
