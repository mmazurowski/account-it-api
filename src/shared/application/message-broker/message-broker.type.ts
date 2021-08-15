import { DomainEvent } from '@application/ddd/domain-events/domain-event';
import { Replies } from 'amqplib';

export interface MessageBrokerService {
  setup(): Promise<void>;
  subscribe(key: string, callback: (obj: object) => Promise<unknown>): Promise<Replies.Consume>;
  publishEvents(events: DomainEvent[]): Promise<void>;
}
