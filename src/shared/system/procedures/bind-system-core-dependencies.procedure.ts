import express from 'express';
import * as Awilix from 'awilix';
import { AwilixContainer } from 'awilix';

import { Procedure } from '@lunar-flight-v/system';
import { CQRSBus } from '@lunar-flight-v/command-module';
import { errorMiddleware } from '@application/server/rest/middlewares/error.middleware';
import {
  asyncLocalStorage,
  requestIdMiddleware,
} from '@application/server/rest/middlewares/request-id.middleware';
import { logger } from '@application/logger/logger';
import { DomainServiceImpl } from '@application/ddd/domain-service/domain.service';

export class BindSystemCoreDependenciesProcedure extends Procedure<
  AwilixContainer,
  AwilixContainer
> {
  async run(container: AwilixContainer): Promise<AwilixContainer> {
    container.register({
      server: Awilix.asValue(express()),
      cqrsBus: Awilix.asValue(new CQRSBus()),
      domainService: Awilix.asClass(DomainServiceImpl).singleton(),
      logger: Awilix.asValue(logger),
      errorMiddleware: Awilix.asFunction(errorMiddleware),
      requestIdMiddleware: Awilix.asFunction(requestIdMiddleware),
      asyncLocalStorage: Awilix.asValue(asyncLocalStorage),
    });

    const awilixPatterns = [
      process.env.NODE_ENV !== 'production'
        ? 'src/**/**/**/**/**/*.action.ts'
        : 'dist/**/**/**/**/**/*.action.js',
    ];

    container.loadModules(awilixPatterns, {
      formatName: 'camelCase',
      resolverOptions: {
        lifetime: Awilix.Lifetime.SCOPED,
        register: Awilix.asFunction,
      },
    });

    return container;
  }
}
