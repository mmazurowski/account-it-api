import { CommandHandler } from '@lunar-flight-v/command-module';
import {
  TEST_COMMAND,
  TestCommand,
} from '@modules/service-provider-access/registration/application/commands/test-subscriber/test.command';

export class TestCommandHandler extends CommandHandler<{}, TestCommand> {
  key = TEST_COMMAND;

  public async handle({ payload }: TestCommand): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('subscribed!', payload);
  }
}
