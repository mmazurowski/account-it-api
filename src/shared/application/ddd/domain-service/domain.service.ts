import { DomainEvent } from '@application/ddd/domain-events/domain-event';
import { AggregateRoot } from '@application/ddd/aggregate/aggregate-root';
import { MessageBrokerService } from '@application/message-broker/message-broker.type';

export interface DomainService {
  notifySubscribers(eventsOrAggregate: DomainEvent[] | AggregateRoot<unknown>): Promise<void>;
}

interface Dependencies {
  messageBrokerService: MessageBrokerService;
}

export class DomainServiceImpl implements DomainService {
  constructor(private readonly dependencies: Dependencies) {}

  public async notifySubscribers(
    eventsOrAggregate: DomainEvent[] | AggregateRoot<unknown>,
  ): Promise<void> {
    const { messageBrokerService } = this.dependencies;

    let events: DomainEvent[];

    if (eventsOrAggregate instanceof AggregateRoot) {
      events = eventsOrAggregate.getAndDispatchDomainEvents();
    } else {
      events = [...eventsOrAggregate];
    }

    await messageBrokerService.publishEvents(events);
  }
}
