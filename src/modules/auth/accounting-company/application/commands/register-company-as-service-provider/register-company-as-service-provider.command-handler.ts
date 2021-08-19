import {
  REGISTER_COMPANY_AS_SERVICE_PROVIDER_COMMAND,
  RegisterCompanyAsServiceProviderCommand,
} from '@modules/auth/accounting-company/application/commands/register-company-as-service-provider/register-company-as-service-provider.command';
import { AccountingCompanyAggregateRoot } from '@modules/auth/accounting-company/core/accounting-company.aggregate-root';
import { DomainService } from '@application/ddd/domain-service/domain.service';
import { UniqueTaxIdsCheckerService } from '@modules/auth/accounting-company/core/services/unique-tax-ids-checker.service';
import { PasswordService } from '@modules/auth/accounting-company/core/services/password.service';
import { AccountingCompanyRepository } from '@modules/auth/accounting-company/core/accounting-company.repository';
import { UniqueEmailCheckerService } from '@modules/auth/accounting-company/core/services/unique-email-checker.service';
import { CommandHandler } from '@lunar-flight-v/command-module';

interface Dependencies {
  domainService: DomainService;
  uniqueTaxIdsCheckerService: UniqueTaxIdsCheckerService;
  passwordService: PasswordService;
  accountingCompanyRepository: AccountingCompanyRepository;
  uniqueEmailCheckerService: UniqueEmailCheckerService;
}

export class RegisterCompanyAsServiceProviderCommandHandler extends CommandHandler<
  Dependencies,
  RegisterCompanyAsServiceProviderCommand
> {
  key = REGISTER_COMPANY_AS_SERVICE_PROVIDER_COMMAND;

  public async handle({ payload }: RegisterCompanyAsServiceProviderCommand): Promise<void> {
    const {
      domainService,
      uniqueTaxIdsCheckerService,
      passwordService,
      accountingCompanyRepository,
      uniqueEmailCheckerService,
    } = this.dependencies;

    const aggregateRoot = await AccountingCompanyAggregateRoot.registerAsServiceProvider(
      payload,
      uniqueTaxIdsCheckerService,
      passwordService,
      uniqueEmailCheckerService,
    );

    await accountingCompanyRepository.insert(aggregateRoot);

    await domainService.dispatchEvents(aggregateRoot);
  }
}
