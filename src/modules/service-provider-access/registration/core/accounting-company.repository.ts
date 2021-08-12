import { AccountingCompanyAggregateRoot } from '@modules/service-provider-access/registration/core/accounting-company.aggregate-root';

export interface AccountingCompanyRepository {
  insert(aggregate: AccountingCompanyAggregateRoot): Promise<void>;
}
