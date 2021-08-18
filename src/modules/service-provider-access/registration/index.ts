import { ApplicationModule } from '@application/application-module.type';
import { PasswordServiceImpl } from '@modules/service-provider-access/registration/infrastructure/services/password.service';
import * as Awilix from 'awilix';
import { UniqueTaxIdsCheckerServiceImpl } from '@modules/service-provider-access/registration/infrastructure/services/unique-tax-ids-checker.service';
import { RegisterCompanyAsServiceProviderCommandHandler } from '@modules/service-provider-access/registration/application/commands/register-company-as-service-provider/register-company-as-service-provider.command-handler';
import { RegistrationController } from '@modules/service-provider-access/registration/adapters/rest/registration.controller';
import { AccountingCompanyRepositoryImpl } from '@modules/service-provider-access/registration/infrastructure/repositories/accounting-company.repository';
import { UniqueEmailCheckerServiceImpl } from '@modules/service-provider-access/registration/infrastructure/services/unique-email-checker.service';
import { TestSubscriber } from '@modules/service-provider-access/registration/adapters/event-bus/test.subscriber';
import { TestCommandHandler } from '@modules/service-provider-access/registration/application/commands/test-subscriber/test.command-handler';

export const serviceProviderRegistrationModule: ApplicationModule = {
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
