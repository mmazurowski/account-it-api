import * as Awilix from 'awilix';
import { Constructor } from '@tools/constructor.type';
import { CommandHandler, QueryHandler } from '@lunar-flight-v/command-module';
import { ExpressController } from '@application/server/rest/express.controller';
import { MessageBrokerSubscriber } from '@application/message-broker/message-broker.subscriber';

export interface ApplicationModule {
  controllers: Constructor<ExpressController>[];
  commandHandlers: Constructor<CommandHandler<any>>[];
  queryHandlers: Constructor<QueryHandler<any>>[];
  subscribers: Constructor<MessageBrokerSubscriber<unknown, unknown>>[];
  repositories: { [key in string]: Awilix.Resolver<any> };
  readModels: { [key in string]: Awilix.Resolver<any> };
  servicesImplementations: { [key in string]: Awilix.Resolver<any> };
}
