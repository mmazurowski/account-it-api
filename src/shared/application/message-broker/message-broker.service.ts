import amqlib, { Replies } from 'amqplib';
import { MessageBrokerService } from './message-broker.type';
import { DomainEvent } from '../ddd/domain-events/domain-event';

export class MessageBrokerServiceImpl implements MessageBrokerService {
  private static EXCHANGE_TYPE = 'topic';

  constructor(
    private readonly writeChannel: amqlib.Channel,
    private readonly readChannel: amqlib.Channel,
    private readonly exchangeName: string,
  ) {}

  public async setup(): Promise<void> {
    await this.readChannel.assertExchange(this.exchangeName, 'topic');
  }

  public async subscribe(
    key: string,
    callback: (obj: object) => Promise<unknown>,
  ): Promise<Replies.Consume> {
    // TODO: move it to the "prepare subscriptions" method

    await this.readChannel.assertExchange(
      this.exchangeName,
      MessageBrokerServiceImpl.EXCHANGE_TYPE,
    );

    await this.readChannel.assertQueue(process.env.SERVICE_NAME);

    await this.readChannel.bindQueue(process.env.SERVICE_NAME, this.exchangeName, key);

    return this.readChannel.consume(process.env.SERVICE_NAME, async (msg) => {
      const messagePayload = JSON.parse(Buffer.from(msg.content).toString('utf-8'));

      await callback(messagePayload);
      this.readChannel.ack(msg);
    });
  }

  public async publishEvents(events: DomainEvent[]): Promise<void> {
    await this.writeChannel.assertExchange(
      this.exchangeName,
      MessageBrokerServiceImpl.EXCHANGE_TYPE,
    );

    await Promise.all(
      events.map((ev) =>
        this.writeChannel.publish(this.exchangeName, ev.key, Buffer.from(ev.toMessageBroker())),
      ),
    );
  }
}
