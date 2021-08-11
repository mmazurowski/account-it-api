import { AccountingCompanyRepository } from '@modules/service-provider-access/registration/core/accounting-company.repository';
import { AccountingCompanyAggregateRoot } from '@modules/service-provider-access/registration/core/accounting-company.aggregate-root';
import { getManager, getRepository } from 'typeorm';
import { ServiceProviderEntity } from '@modules/service-provider-access/registration/infrastructure/database/service-provider.entity';

export class AccountingCompanyRepositoryImpl implements AccountingCompanyRepository {
  public async insert(aggregate: AccountingCompanyAggregateRoot): Promise<void> {
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      postalCode: postal_code,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      phoneNumber: phone_number,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      vatID: vat_id,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      registeredAt: registered_at,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      businessName: business_name,
      ...rest
    } = aggregate.toJSON();

    const entity = getRepository(ServiceProviderEntity).create({
      ...rest,
      phone_number,
      postal_code,
      business_name,
      vat_id,
      registered_at,
    });

    await getManager().save(entity);
  }
}
