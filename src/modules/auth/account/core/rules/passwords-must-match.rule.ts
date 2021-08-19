import { BusinessRule } from '@application/ddd/business-rule/business-rule';
import { PasswordCheckerService } from '@modules/auth/account/core/services/password-checker.service';

export class PasswordsMustMatchRule extends BusinessRule {
  message = 'Password is incorrect';

  constructor(
    private readonly plainPassword: string,
    private readonly password: string,
    private readonly passwordService: PasswordCheckerService,
  ) {
    super();
  }

  public async isSatisfied(): Promise<boolean> {
    return this.passwordService.verify(this.plainPassword, this.password);
  }
}
