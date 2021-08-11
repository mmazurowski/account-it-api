import { BusinessRule } from '@application/ddd/business-rule/business-rule';

export class MustBeIntegerRule extends BusinessRule {
  message = 'REGON must be integer number';

  constructor(private readonly value: number) {
    super();
  }

  public async isSatisfied(): Promise<boolean> {
    return Number.isInteger(this.value);
  }
}
