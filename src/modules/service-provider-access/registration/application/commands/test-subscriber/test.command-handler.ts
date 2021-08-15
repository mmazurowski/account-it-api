import { CommandHandler } from '@lunar-flight-v/command-module';
import {
  TEST_COMMAND,
  TestCommand,
} from '@modules/service-provider-access/registration/application/commands/test-subscriber/test.command';

export class TestCommandHandler extends CommandHandler<TestCommand> {
  constructor() {
    super(TEST_COMMAND);
  }

  public async handle(command: TestCommand): Promise<void> {
    const payload = command.getPayload();
    // eslint-disable-next-line no-console
    console.log('subscribed!', payload);
  }
}
