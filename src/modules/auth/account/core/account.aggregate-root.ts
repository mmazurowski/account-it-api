import { AggregateRoot } from '@application/ddd/aggregate/aggregate-root';
import { UserLoggedInEvent } from '@modules/auth/account/core/events/user-logged-in.event';
import { PasswordsMustMatchRule } from '@modules/auth/account/core/rules/passwords-must-match.rule';
import { PasswordCheckerService } from '@modules/auth/account/core/services/password-checker.service';
import { UnauthorizedError } from '@application/errors/unauthorized.error';

interface AccountAggregateRootState {
  email: string;
  password: string;
  type: string;
}

interface CreateAccountAggregate extends AccountAggregateRootState {
  id: string;
}

interface AggregateInJSON {
  id: string;
  email: string;
  type: string;
}

export class AccountAggregateRoot extends AggregateRoot<AccountAggregateRootState> {
  private constructor(props: AccountAggregateRootState, id: string) {
    super(props, id);
  }

  public static fromPersistence({ id, ...rest }: CreateAccountAggregate) {
    return new AccountAggregateRoot(rest, id);
  }

  public async login(password: string, passwordService: PasswordCheckerService) {
    await AccountAggregateRoot.checkBusinessRule(
      new PasswordsMustMatchRule(password, this.state.password, passwordService),
      UnauthorizedError,
    );

    this.addDomainEvent(new UserLoggedInEvent(this.state.email, this.getID().toString()));
  }

  toJSON(): AggregateInJSON {
    return {
      id: this.getID().toString(),
      email: this.state.email,
      type: this.state.type,
    };
  }
}
