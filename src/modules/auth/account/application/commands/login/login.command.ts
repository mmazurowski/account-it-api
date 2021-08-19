import { Command } from '@lunar-flight-v/command-module';

interface Props {
  email: string;
  password: string;
}

export const LOGIN_COMMAND = 'login/command';

export class LoginCommand extends Command<Props> {
  key = LOGIN_COMMAND;
}
