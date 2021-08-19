import * as Awilix from 'awilix';
import { ApplicationModule } from '@application/application-module.type';

import { AccountController } from '@modules/auth/account/adapters/rest/account.controller';
import { LoginCommandHandler } from '@modules/auth/account/application/commands/login/login.command-handler';
import { PasswordCheckerServiceImpl } from '@modules/auth/account/infrastructure/services/password-checker.service';
import { AccountRepositoryImpl } from '@modules/auth/account/infrastructure/repositories/account.repository';
import { JwtServiceImpl } from '@modules/auth/account/infrastructure/services/jwt.service';

export const accountModule: ApplicationModule = {
  controllers: [AccountController],
  commandHandlers: [LoginCommandHandler],
  queryHandlers: [],
  subscribers: [],
  repositories: {
    accountRepository: Awilix.asClass(AccountRepositoryImpl).singleton(),
  },
  readModels: {},
  servicesImplementations: {
    passwordCheckerService: Awilix.asClass(PasswordCheckerServiceImpl).singleton(),
    jwtService: Awilix.asClass(JwtServiceImpl).singleton(),
  },
};
