import { ApplicationModule } from '@application/application-module.type';
import { PasswordServiceImpl } from '@modules/auth/accounting-company/infrastructure/services/password.service';
import * as Awilix from 'awilix';
import { UniqueTaxIdsCheckerServiceImpl } from '@modules/auth/accounting-company/infrastructure/services/unique-tax-ids-checker.service';
import { RegisterCompanyAsServiceProviderCommandHandler } from '@modules/auth/accounting-company/application/commands/register-company-as-service-provider/register-company-as-service-provider.command-handler';
import { RegistrationController } from '@modules/auth/accounting-company/adapters/rest/registration.controller';
import { AccountingCompanyRepositoryImpl } from '@modules/auth/accounting-company/infrastructure/repositories/accounting-company.repository';
import { UniqueEmailCheckerServiceImpl } from '@modules/auth/accounting-company/infrastructure/services/unique-email-checker.service';
import { TestSubscriber } from '@modules/auth/accounting-company/adapters/event-bus/test.subscriber';
import { TestCommandHandler } from '@modules/auth/accounting-company/application/commands/test-subscriber/test.command-handler';

export const accountingCompanyModule: ApplicationModule = {
  controllers: [RegistrationController],
  commandHandlers: [RegisterCompanyAsServiceProviderCommandHandler, TestCommandHandler],
  queryHandlers: [],
  subscribers: [TestSubscriber],
  repositories: {
    accountingCompanyRepository: Awilix.asClass(AccountingCompanyRepositoryImpl).singleton(),
  },
  readModels: {},
  servicesImplementations: {
    passwordService: Awilix.asClass(PasswordServiceImpl).singleton(),
    uniqueEmailCheckerService: Awilix.asClass(UniqueEmailCheckerServiceImpl).singleton(),
    uniqueTaxIdsCheckerService: Awilix.asClass(UniqueTaxIdsCheckerServiceImpl).singleton(),
  },
};
