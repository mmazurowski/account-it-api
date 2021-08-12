import { BusinessRule } from '@application/ddd/business-rule/business-rule';
import { PasswordService } from '@modules/service-provider-access/registration/core/services/password.service';

export class PasswordMustBeStrongRule extends BusinessRule {
  message =
    'Password must have minimum 8 characters and contain at least one uppercase, lowercase char and one special symbol';

  constructor(
    private readonly password: string,
    private readonly passwordService: PasswordService,
  ) {
    super();
  }

  public async isSatisfied(): Promise<boolean> {
    return this.passwordService.getPasswordStrength(this.password) > 80;
  }
}
