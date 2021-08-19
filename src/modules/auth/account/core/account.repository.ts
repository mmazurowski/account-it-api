import { AccountAggregateRoot } from '@modules/auth/account/core/account.aggregate-root';

export interface AccountRepository {
  getByEmail(email: string): Promise<AccountAggregateRoot | null>;
}
