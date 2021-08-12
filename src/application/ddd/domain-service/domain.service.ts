import { DomainEvent } from '@application/ddd/domain-events/domain-event';
import { DomainSubscriber } from '@application/ddd/domain-subscriber/domain.subscriber';
import { AggregateRoot } from '@application/ddd/aggregate/aggregate-root';

export interface DomainService {
  notifySubscribers(eventsOrAggregate: DomainEvent[] | AggregateRoot<unknown>): Promise<void>;
}

interface Dependencies {
  domainSubscribers: DomainSubscriber<any>[];
}

export class DomainServiceImpl implements DomainService {
  constructor(private readonly dependencies: Dependencies) {}

  public async notifySubscribers(
    eventsOrAggregate: DomainEvent[] | AggregateRoot<unknown>,
  ): Promise<void> {
    const { domainSubscribers } = this.dependencies;

    let events = [];

    if (eventsOrAggregate instanceof AggregateRoot) {
      events = eventsOrAggregate.getAndDispatchDomainEvents();
    } else {
      events = [...eventsOrAggregate];
    }

    events.forEach((event) => {
      const subsToBeNotified = domainSubscribers.filter(
        (subscriber) => subscriber.getEventKey() === event.eventKey,
      );

      Promise.all(subsToBeNotified.map((el) => el.execute(event)));
    });
  }
}
