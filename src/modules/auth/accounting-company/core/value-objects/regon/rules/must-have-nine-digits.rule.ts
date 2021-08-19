import { BusinessRule } from '@application/ddd/business-rule/business-rule';

export class MustHaveNineDigitsRule extends BusinessRule {
  message = 'REGON must be have nine digits';

  constructor(private readonly value: number) {
    super();
  }

  public async isSatisfied(): Promise<boolean> {
    return this.value.toString().split('').length === 9;
  }
}
