import { AwilixContainer } from 'awilix';
import { Application, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Procedure } from '@lunar-flight-v/system';
import { ExpressController } from '@application/server/rest/express.controller';
import { NotFoundError } from '@application/errors/not-found.error';
import { serve, setup } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import compression from 'compression';

export class PrepareServerProcedure extends Procedure<AwilixContainer, AwilixContainer> {
  async run(container: AwilixContainer): Promise<AwilixContainer> {
    const WHITE_LIST: string[] | RegExp[] = process.env.CORS_WHITELIST
      ? process.env.CORS_WHITELIST.split(' ')
      : [];

    const corsOptions = {
      origin: process.env.NODE_ENV === 'production' ? WHITE_LIST : [/localhost/],
      credentials: true,
    };

    const expressServer = container.resolve<Application>('server');

    expressServer.use(bodyParser.json());
    expressServer.use(cors(corsOptions));
    expressServer.use(compression());

    const requestIdMiddleware = container.resolve<RequestHandler>('requestIdMiddleware');
    expressServer.use(requestIdMiddleware);

    expressServer.disable('x-powered-by');

    expressServer.use(
      '/docs',
      serve,
      setup(
        swaggerJsdoc({
          definition: {
            openapi: '3.0.0',
            info: {
              version: '1.0.0',
              title: 'TSH task',
            },
          },
          apis: [
            process.env.NODE_ENV === 'production'
              ? 'dist/modules/**/api/rest/**/*.action.js'
              : 'src/modules/**/api/rest/**/*.action.ts',
          ],
        }),
      ),
    );

    const controllers = container.resolve<ExpressController[]>('controllers');
    controllers.forEach((controller) => expressServer.use(controller.getRouter()));

    expressServer.use('*', (req, res, next) => next(new NotFoundError('Route not found')));

    const errorMiddleware = container.resolve<RequestHandler>('errorMiddleware');
    expressServer.use(errorMiddleware);

    return container;
  }
}
