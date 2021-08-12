import { BusinessRule } from '@application/ddd/business-rule/business-rule';

export class MustHaveTenDigitsRule extends BusinessRule {
  message = 'VAT ID must be have ten digits';

  constructor(private readonly value: string) {
    super();
  }

  public async isSatisfied(): Promise<boolean> {
    // because first two chars are country code
    return this.value.split('').length === 12;
  }
}
