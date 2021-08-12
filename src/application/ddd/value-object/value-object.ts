import { deepStrictEqual } from 'assert';
import { BusinessRule } from '../business-rule/business-rule';
import { BusinessRuleValidationError } from '@application/errors/business-rule-validation.error';
import { ApplicationError } from '@application/errors/application-error.error';

export abstract class ValueObject<T> {
  public constructor(protected readonly props: T) {}

  public static async checkBusinessRule(
    rule: BusinessRule,
    ErrorType: typeof ApplicationError = BusinessRuleValidationError,
  ) {
    const isSatisfied = await rule.isSatisfied();

    if (!isSatisfied) {
      throw new ErrorType(rule.message);
    }
  }

  public isEqual(comparable: ValueObject<unknown>) {
    try {
      deepStrictEqual(comparable.props, this.props);
    } catch (e) {
      return false;
    }

    return true;
  }
}
