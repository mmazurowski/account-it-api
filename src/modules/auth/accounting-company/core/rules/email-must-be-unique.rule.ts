import { BusinessRule } from '@application/ddd/business-rule/business-rule';
import { UniqueEmailCheckerService } from '@modules/auth/accounting-company/core/services/unique-email-checker.service';

export class EmailMustBeUniqueRule extends BusinessRule {
  message = 'Provided email is already taken';

  constructor(private readonly email: string, private readonly checker: UniqueEmailCheckerService) {
    super();
  }

  public async isSatisfied(): Promise<boolean> {
    return this.checker.isEmailUnique(this.email);
  }
}
