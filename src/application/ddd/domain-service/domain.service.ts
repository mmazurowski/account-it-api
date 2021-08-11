import { DomainEvent } from '@application/ddd/domain-events/domain-event';
import { DomainSubscriber } from '@application/ddd/domain-subscriber/domain.subscriber';

export interface DomainService {
  notifySubscribers(events: DomainEvent[]): Promise<void>;
}

interface Dependencies {
  domainSubscribers: DomainSubscriber<any>[];
}

export class DomainServiceImpl implements DomainService {
  constructor(private readonly dependencies: Dependencies) {}

  public async notifySubscribers(events: DomainEvent[]): Promise<void> {
    const { domainSubscribers } = this.dependencies;

    events.forEach((event) => {
      const subsToBeNotified = domainSubscribers.filter(
        (subscriber) => subscriber.getEventKey() === event.eventKey,
      );

      Promise.all(subsToBeNotified.map((el) => el.execute(event)));
    });
  }
}
