// eslint-disable-next-line max-classes-per-file
import { DomainEvent } from '@application/ddd/domain-events/domain-event';
import { DomainSubscriber } from '@application/ddd/domain-subscriber/domain.subscriber';
import { DomainServiceImpl } from '@application/ddd/domain-service/domain.service';

describe('[Building blocks] Domain Service', () => {
  let triggered = [];

  beforeEach(() => {
    triggered = [];
  });

  class FirstEvent extends DomainEvent {
    eventKey = 'first-event';
  }

  class SecondEvent extends DomainEvent {
    eventKey = 'second-event';
  }

  class FirstEventSubscriber extends DomainSubscriber<SecondEvent> {
    eventKey = 'first-event';

    async execute(): Promise<void> {
      triggered.push(this.constructor.name);
    }
  }

  class SecondEventSubscriber extends DomainSubscriber<SecondEvent> {
    eventKey = 'second-event';

    async execute(): Promise<void> {
      triggered.push(this.constructor.name);
    }
  }

  test('Should notify proper subscriber', async () => {
    const events = [new SecondEvent(), new SecondEvent()];

    const domainService = new DomainServiceImpl({
      domainSubscribers: [new FirstEventSubscriber(), new SecondEventSubscriber()],
    });

    await domainService.notifySubscribers(events);

    expect(triggered).toEqual(['SecondEventSubscriber', 'SecondEventSubscriber']);
  });

  test('Should notify both subscribers', async () => {
    const events = [new FirstEvent(), new SecondEvent()];

    const domainService = new DomainServiceImpl({
      domainSubscribers: [new FirstEventSubscriber(), new SecondEventSubscriber()],
    });

    await domainService.notifySubscribers(events);

    expect(triggered).toEqual(['FirstEventSubscriber', 'SecondEventSubscriber']);
  });
});
