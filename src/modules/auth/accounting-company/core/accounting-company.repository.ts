import { AccountingCompanyAggregateRoot } from '@modules/auth/accounting-company/core/accounting-company.aggregate-root';

export interface AccountingCompanyRepository {
  insert(aggregate: AccountingCompanyAggregateRoot): Promise<void>;
}
