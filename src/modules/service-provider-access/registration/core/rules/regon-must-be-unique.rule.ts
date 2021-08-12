import { BusinessRule } from '@application/ddd/business-rule/business-rule';
import { UniqueTaxIdsCheckerService } from '@modules/service-provider-access/registration/core/services/unique-tax-ids-checker.service';

export class RegonMustBeUniqueRule extends BusinessRule {
  message = 'Company with provided REGON already exists';

  constructor(private readonly id: number, private readonly checker: UniqueTaxIdsCheckerService) {
    super();
  }

  public async isSatisfied(): Promise<boolean> {
    return this.checker.isUniqueRegonID(this.id);
  }
}
