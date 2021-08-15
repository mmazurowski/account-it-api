import { CommandHandler } from '@lunar-flight-v/command-module';
import {
  REGISTER_COMPANY_AS_SERVICE_PROVIDER_COMMAND,
  RegisterCompanyAsServiceProviderCommand,
} from '@modules/service-provider-access/registration/application/commands/register-company-as-service-provider/register-company-as-service-provider.command';
import { AccountingCompanyAggregateRoot } from '@modules/service-provider-access/registration/core/accounting-company.aggregate-root';
import { DomainService } from '@application/ddd/domain-service/domain.service';
import { UniqueTaxIdsCheckerService } from '@modules/service-provider-access/registration/core/services/unique-tax-ids-checker.service';
import { PasswordService } from '@modules/service-provider-access/registration/core/services/password.service';
import { AccountingCompanyRepository } from '@modules/service-provider-access/registration/core/accounting-company.repository';
import { UniqueEmailCheckerService } from '@modules/service-provider-access/registration/core/services/unique-email-checker.service';

interface Dependencies {
  domainService: DomainService;
  uniqueTaxIdsCheckerService: UniqueTaxIdsCheckerService;
  passwordService: PasswordService;
  accountingCompanyRepository: AccountingCompanyRepository;
  uniqueEmailCheckerService: UniqueEmailCheckerService;
}

export class RegisterCompanyAsServiceProviderCommandHandler extends CommandHandler<
  RegisterCompanyAsServiceProviderCommand
> {
  constructor(private readonly dependencies: Dependencies) {
    super(REGISTER_COMPANY_AS_SERVICE_PROVIDER_COMMAND);
  }

  public async handle(command: RegisterCompanyAsServiceProviderCommand): Promise<void> {
    const payload = command.getPayload();
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

    await domainService.notifySubscribers(aggregateRoot);
  }
}
