import { BusinessRule } from '@application/ddd/business-rule/business-rule';
import { UniqueTaxIdsCheckerService } from '@modules/service-provider-access/registration/core/services/unique-tax-ids-checker.service';

export class TaxIdMustBeUniqueRule extends BusinessRule {
  message = 'Company with provided Tax ID already exists';

  constructor(private readonly id: string, private readonly checker: UniqueTaxIdsCheckerService) {
    super();
  }

  public async isSatisfied(): Promise<boolean> {
    return this.checker.isTaxIDUnique(this.id);
  }
}
