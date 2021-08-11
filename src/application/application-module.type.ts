import * as Awilix from 'awilix';
import { Constructor } from '@tools/constructor.type';
import { CommandHandler, QueryHandler } from '@lunar-flight-v/command-module';
import { ExpressController } from '@application/server/rest/express.controller';
import { DomainSubscriber } from '@application/ddd/domain-subscriber/domain.subscriber';

export interface ApplicationModule {
  controllers: Constructor<ExpressController>[];
  commandHandlers: Constructor<CommandHandler<any>>[];
  queryHandlers: Constructor<QueryHandler<any>>[];
  subscribers: Constructor<DomainSubscriber<any>>[];
  repositories: { [key in string]: Awilix.Resolver<any> };
  readModels: { [key in string]: Awilix.Resolver<any> };
  servicesImplementations: { [key in string]: Awilix.Resolver<any> };
}
