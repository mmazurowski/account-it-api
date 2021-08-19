import {
  TEST_COMMAND,
  TestCommand,
} from '@modules/auth/accounting-company/application/commands/test-subscriber/test.command';
import { CommandHandler } from '@lunar-flight-v/command-module';

export class TestCommandHandler extends CommandHandler<{}, TestCommand> {
  key = TEST_COMMAND;

  public async handle({ payload }: TestCommand): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('subscribed!', payload);
  }
}
