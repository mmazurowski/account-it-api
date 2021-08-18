import { AccountingCompanyRepository } from '@modules/service-provider-access/registration/core/accounting-company.repository';
import { AccountingCompanyAggregateRoot } from '@modules/service-provider-access/registration/core/accounting-company.aggregate-root';
import { getManager } from 'typeorm';
import { AccountEntity } from '@modules/service-provider-access/registration/infrastructure/entities/account.entity';
import { ServiceProviderEntity } from '@modules/service-provider-access/registration/infrastructure/entities/service-provider.entity';

export class AccountingCompanyRepositoryImpl implements AccountingCompanyRepository {
  public async insert(aggregate: AccountingCompanyAggregateRoot): Promise<void> {
    const {
      postalCode,
      phoneNumber,
      vatID,
      registeredAt,
      businessName,
      password,
      status,
      email,
      id,
      ...rest
    } = aggregate.toJSON();

    const account = AccountEntity.create({
      registered_at: registeredAt,
      id,
      email,
      password,
      status,
    });

    const accountingCompany = ServiceProviderEntity.create({
      ...rest,
      phone_number: phoneNumber,
      postal_code: postalCode,
      business_name: businessName,
      vat_id: vatID,
      account,
    });

    await getManager().transaction(async (manager) => {
      await manager.save([account, accountingCompany]);
    });
  }
}
