import { DomainEvent } from '@application/ddd/domain-events/domain-event';

export class ServiceProviderRegisteredEvent extends DomainEvent {
  key = 'service-provider.provider-registered';

  constructor(public readonly email: string, public readonly id: string) {
    super();
  }

  toMessageBroker(): string {
    const { email, id } = this;

    return JSON.stringify({ email, id });
  }
}
