import { CQRSBus } from '@lunar-flight-v/command-module';
import { TestCommand } from '@modules/auth/accounting-company/application/commands/test-subscriber/test.command';
import { MessageBrokerSubscriber } from '@application/message-broker/message-broker.subscriber';

interface Dependencies {
  cqrsBus: CQRSBus;
}

interface Message {
  id: string;
  email: string;
}

export class TestSubscriber extends MessageBrokerSubscriber<Dependencies, Message> {
  key = 'service-provider.provider-registered';

  public subscribe(message: Message): Promise<unknown> {
    const { cqrsBus } = this.dependencies;

    return cqrsBus.handle(new TestCommand(message));
  }
}
