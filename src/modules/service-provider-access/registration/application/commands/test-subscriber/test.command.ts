import { Command } from '@lunar-flight-v/command-module';

interface Payload {
  id: string;
  email: string;
}

export const TEST_COMMAND = 'test';

export class TestCommand extends Command<Payload> {
  key = TEST_COMMAND;
}
