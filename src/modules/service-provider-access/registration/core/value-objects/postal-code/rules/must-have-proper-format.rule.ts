import { BusinessRule } from '@application/ddd/business-rule/business-rule';

export class MustHaveProperFormatRule extends BusinessRule {
  message = 'Must be in the following format: in XX-XXX';

  constructor(private readonly code: string) {
    super();
  }

  public async isSatisfied(): Promise<boolean> {
    if (this.code.length !== 6) {
      return false;
    }

    if (!this.code.includes('-')) {
      return false;
    }

    const arr = this.code.split('-');

    if (arr.length !== 2) {
      return false;
    }

    const [prefix, suffix] = arr;

    const isPrefixValid = prefix.split('').every((el) => Number.isInteger(Number(el)));
    const isSufixalid = suffix.split('').every((el) => Number.isInteger(Number(el)));

    return isPrefixValid && isSufixalid;
  }
}
