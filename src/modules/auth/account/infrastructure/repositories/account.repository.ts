import { AccountRepository } from '@modules/auth/account/core/account.repository';
import { AccountAggregateRoot } from '@modules/auth/account/core/account.aggregate-root';
import { AccountEntity } from '@modules/auth/accounting-company/infrastructure/entities/account.entity';

export class AccountRepositoryImpl implements AccountRepository {
  public async getByEmail(email: string): Promise<AccountAggregateRoot | null> {
    const dbEntity = await AccountEntity.findOne({
      select: ['id', 'email', 'password', 'type'],
      where: {
        email,
      },
    });

    return dbEntity ? AccountAggregateRoot.fromPersistence(dbEntity) : null;
  }
}
