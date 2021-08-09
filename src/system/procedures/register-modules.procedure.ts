import * as Awilix from 'awilix';
import { AwilixContainer } from 'awilix';
import { Procedure } from '@lunar-flight-v/system';
import { registerAsArray } from '@root/tools/register-as-array';
import {
  Command,
  CommandHandler,
  CQRSBus,
  Query,
  QueryHandler,
} from '@lunar-flight-v/command-module';
import modules from '@modules/index';

export class RegisterModulesProcedure extends Procedure<AwilixContainer, AwilixContainer> {
  async run(container: AwilixContainer): Promise<AwilixContainer> {
    /**
     * =============================================================================================================
     * Register Express controllers
     *
     * =============================================================================================================
     */
    const applicationControllers = modules.flatMap(({ controllers }) => controllers);
    container.register(
      'controllers',
      registerAsArray(
        applicationControllers.map((controller) => Awilix.asClass(controller).singleton()),
      ),
    );

    /**
     * =============================================================================================================
     * Register repositories
     *
     * =============================================================================================================
     */

    modules.forEach((appModule) => container.register(appModule.repositories));

    /**
     * =============================================================================================================
     * Register CQRS
     *
     * =============================================================================================================
     */

    const cqrsbus = container.resolve<CQRSBus>('cqrsBus');

    const applicationCommandHandlers = modules.flatMap(({ commandHandlers }) => commandHandlers);
    const applicationQueryHandlers = modules.flatMap(({ queryHandlers }) => queryHandlers);
    container.register(
      'commandHandlers',
      registerAsArray(applicationCommandHandlers.map((handler) => Awilix.asClass(handler))),
    );
    container.register(
      'queryHandlers',
      registerAsArray(applicationQueryHandlers.map((handler) => Awilix.asClass(handler))),
    );
    container
      .resolve<CommandHandler<Command<unknown>>[]>('commandHandlers')
      .forEach((handler) => cqrsbus.registerHandler(handler));
    container
      .resolve<QueryHandler<Query<unknown>>[]>('queryHandlers')
      .forEach((handler) => cqrsbus.registerHandler(handler));

    return container;
  }
}
