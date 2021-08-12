import { Entity } from '@application/ddd/entity/entity';
import { DomainEvent } from '@application/ddd/domain-events/domain-event';

export abstract class AggregateRoot<T> extends Entity<T> {
  protected domainEvents: DomainEvent[] = [];

  public addDomainEvent(event: DomainEvent) {
    this.domainEvents.push(event);
  }

  public getDomainEvents() {
    return this.domainEvents;
  }

  public getAndDispatchDomainEvents() {
    const events = [...this.domainEvents];

    this.domainEvents = [];

    return events;
  }
}
