import { CommandHandler } from '@lunar-flight-v/command-module';
import {
  LOGIN_COMMAND,
  LoginCommand,
} from '@modules/auth/account/application/commands/login/login.command';
import { AccountRepository } from '@modules/auth/account/core/account.repository';
import { PasswordCheckerService } from '@modules/auth/account/core/services/password-checker.service';
import { UnauthorizedError } from '@application/errors/unauthorized.error';
import { DomainService } from '@application/ddd/domain-service/domain.service';
import { JwtService } from '@modules/auth/account/core/services/jwt.service';

interface Dependencies {
  accountRepository: AccountRepository;
  passwordCheckerService: PasswordCheckerService;
  domainService: DomainService;
  jwtService: JwtService;
}

interface LoginCommandHandlerReturnType {
  shortLiveToken: string;
  longLiveToken: string;
}

export class LoginCommandHandler extends CommandHandler<Dependencies, LoginCommand> {
  key = LOGIN_COMMAND;

  public async handle({
    payload: { email, password },
  }: LoginCommand): Promise<LoginCommandHandlerReturnType> {
    const {
      accountRepository,
      passwordCheckerService,
      domainService,
      jwtService,
    } = this.dependencies;

    const account = await accountRepository.getByEmail(email);

    if (!account) {
      throw new UnauthorizedError('User credentials do not match or user does not exists');
    }

    await account.login(password, passwordCheckerService);

    await domainService.dispatchEvents(account);

    return {
      shortLiveToken: await jwtService.createShortLiveToken(
        email,
        account.getID().toString(),
        account.toJSON().type,
      ),
      longLiveToken: await jwtService.createLongLiveToken(email),
    };
  }
}
