import { DomainEvent } from '@application/ddd/domain-events/domain-event';

export abstract class DomainSubscriber<T extends DomainEvent> {
  protected abstract readonly eventKey: string;

  public abstract execute(event: T): Promise<void>;

  public getEventKey() {
    return this.eventKey;
  }
}
