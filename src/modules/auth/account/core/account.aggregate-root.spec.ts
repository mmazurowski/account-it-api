import { AccountAggregateRoot } from '@modules/auth/account/core/account.aggregate-root';
import { UUID } from '@application/ddd/uuid/uuid.class';
import { createMockProxy } from '@tools/create-mock-proxy';
import { PasswordCheckerService } from '@modules/auth/account/core/services/password-checker.service';
import { UserLoggedInEvent } from '@modules/auth/account/core/events/user-logged-in.event';

describe('[MODULE - Auth/Login] Account', () => {
  const passwordChecker = createMockProxy<PasswordCheckerService>();
  const entity = AccountAggregateRoot.fromPersistence({
    id: new UUID().toString(),
    email: 'some@email.pl',
    password: 'password',
    type: 'account-type',
  });

  beforeEach(() => {
    passwordChecker.mockClear();
  });

  test('should throw an error when logging in with wrong credentials', async () => {
    passwordChecker.verify.mockResolvedValueOnce(false);
    await expect(() => entity.login('password', passwordChecker)).rejects.toThrowError(
      'Password is incorrect',
    );
  });

  test('should throw dispatch event when credentials are fine', async () => {
    passwordChecker.verify.mockResolvedValueOnce(true);
    await entity.login('password', passwordChecker);

    expect(entity.getDomainEvents()).toHaveLength(1);
    expect(entity.getDomainEvents()[0]).toBeInstanceOf(UserLoggedInEvent);
  });
});
