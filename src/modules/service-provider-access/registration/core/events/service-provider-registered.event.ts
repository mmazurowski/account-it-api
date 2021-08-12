import { DomainEvent } from '@application/ddd/domain-events/domain-event';

export class ServiceProviderRegisteredEvent extends DomainEvent {
  eventKey = 'service-provider/provider-registered';

  constructor(public readonly email: string, public readonly id: string) {
    super();
  }
}
