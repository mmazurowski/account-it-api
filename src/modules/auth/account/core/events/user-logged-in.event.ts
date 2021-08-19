import { DomainEvent } from '@application/ddd/domain-events/domain-event';

export class UserLoggedInEvent extends DomainEvent {
  key = 'user.logged-in';

  constructor(public readonly email: string, public readonly id: string) {
    super();
  }

  toMessageBroker(): string {
    return JSON.stringify({
      id: this.id,
      email: this.email,
    });
  }
}
