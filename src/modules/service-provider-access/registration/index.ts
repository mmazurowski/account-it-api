import { ApplicationModule } from '@application/application-module.type';
import { PasswordServiceImpl } from '@modules/service-provider-access/registration/infrastructure/services/password.service';
import * as Awilix from 'awilix';
import { UniqueTaxIdsCheckerServiceImpl } from '@modules/service-provider-access/registration/infrastructure/services/unique-tax-ids-checker.service';
import { RegisterCompanyAsServiceProviderCommandHandler } from '@modules/service-provider-access/registration/application/commands/register-company-as-service-provider.command-handler';
import { RegistrationController } from '@modules/service-provider-access/registration/api/registration.controller';
import { AccountingCompanyRepositoryImpl } from '@modules/service-provider-access/registration/infrastructure/database/accounting-company.repository';
import { UniqueEmailCheckerServiceImpl } from '@modules/service-provider-access/registration/infrastructure/services/unique-email-checker.service';

export const serviceProviderRegistrationModule: ApplicationModule = {
  controllers: [RegistrationController],
  commandHandlers: [RegisterCompanyAsServiceProviderCommandHandler],
  queryHandlers: [],
  subscribers: [],
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
