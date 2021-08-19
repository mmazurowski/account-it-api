import { BusinessRule } from '@application/ddd/business-rule/business-rule';

export class MustHaveCountryCodeRule extends BusinessRule {
  message = 'VAT ID must have country code';

  constructor(private readonly value: string) {
    super();
  }

  public async isSatisfied(): Promise<boolean> {
    return this.value
      .slice(0, 2)
      .split('')
      .every((el) => Number.isNaN(Number(el)));
  }
}
