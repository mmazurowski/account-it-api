import { Procedure } from '@lunar-flight-v/system';
import * as Awilix from 'awilix';
import { AwilixContainer } from 'awilix';
import * as amqplib from 'amqplib';
import { Logger } from '@application/logger/logger';
import { MessageBrokerServiceImpl } from '@application/message-broker/message-broker.service';
import { MessageBrokerSubscriber } from '@application/message-broker/message-broker.subscriber';

export class SetupEnterpriseBus extends Procedure<Awilix.AwilixContainer, Awilix.AwilixContainer> {
  async run(container: AwilixContainer): Promise<AwilixContainer> {
    const logger = container.resolve<Logger>('logger');

    try {
      const connection = await amqplib.connect(process.env.MESSAGE_HOST);

      const readChannel = await connection.createChannel();

      const writeChannel = await connection.createChannel();

      const messageBrokerService = new MessageBrokerServiceImpl(
        writeChannel,
        readChannel,
        'main-exchange',
      );

      await messageBrokerService.setup();

      container.register('messageBrokerService', Awilix.asValue(messageBrokerService));

      const subscribers = container.resolve<MessageBrokerSubscriber<unknown, unknown>[]>(
        'messageBrokerSubscribers',
      );

      await Promise.all(
        subscribers.map((subscriber) =>
          messageBrokerService.subscribe(subscriber.key, subscriber.subscribe.bind(subscriber)),
        ),
      );
    } catch (e) {
      logger.error(e);
    }

    return container;
  }
}
