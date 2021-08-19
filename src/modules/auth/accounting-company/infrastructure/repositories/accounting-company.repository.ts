import { AccountingCompanyRepository } from '@modules/auth/accounting-company/core/accounting-company.repository';
import { AccountingCompanyAggregateRoot } from '@modules/auth/accounting-company/core/accounting-company.aggregate-root';
import { getManager } from 'typeorm';
import { ServiceProviderEntity } from '@modules/auth/accounting-company/infrastructure/entities/service-provider.entity';

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

    const accountingCompany = ServiceProviderEntity.create({
      ...rest,
      phone_number: phoneNumber,
      postal_code: postalCode,
      business_name: businessName,
      vat_id: vatID,
      account: {
        registered_at: registeredAt,
        id,
        email,
        password,
        status,
      },
    });

    await getManager().transaction(async (manager) => {
      await manager.save([accountingCompany]);
    });
  }
}
