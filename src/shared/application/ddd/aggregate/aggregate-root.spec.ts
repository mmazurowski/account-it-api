// eslint-disable-next-line max-classes-per-file
import { UUID } from '../uuid/uuid.class';
import { AggregateRoot } from './aggregate-root';
import { BusinessRule } from '@application/ddd/business-rule/business-rule';
import { UnauthorizedError } from '@application/errors/unauthorized.error';
import { BusinessRuleValidationError } from '@application/errors/business-rule-validation.error';

class ConcreteBusinessRule extends BusinessRule {
  message = 'Concrete error';

  public async isSatisfied(): Promise<boolean> {
    return false;
  }
}

interface AggregateRootProps {}

class ConcreteAggregateRoot extends AggregateRoot<AggregateRootProps> {
  public async simpleBusinessRuleValidation() {
    await ConcreteAggregateRoot.checkBusinessRule(new ConcreteBusinessRule());
  }

  public async businessRuleValidationWithCustomError() {
    await ConcreteAggregateRoot.checkBusinessRule(new ConcreteBusinessRule(), UnauthorizedError);
  }

  public toJSON(): object {
    return {};
  }
}

describe('Aggregate Building Block', () => {
  test('Two aggregates are equal when their ID are equal', () => {
    const uuid = new UUID().toString();

    const aggA = new ConcreteAggregateRoot({}, uuid);
    const aggB = new ConcreteAggregateRoot({}, uuid);

    expect(aggA.isEqual(aggB)).toEqual(true);
  });

  test('Two aggregates are not equal when their ID are different', () => {
    const aggA = new ConcreteAggregateRoot({}, new UUID().toString());
    const aggB = new ConcreteAggregateRoot({}, new UUID().toString());

    expect(aggA.isEqual(aggB)).toEqual(false);
  });

  test('Should throw business rule validation error', async () => {
    const aggregateRoot = new ConcreteAggregateRoot({}, new UUID().toString());

    await expect(() => aggregateRoot.simpleBusinessRuleValidation()).rejects.toThrowError(
      'Concrete error',
    );
    await expect(() => aggregateRoot.simpleBusinessRuleValidation()).rejects.toBeInstanceOf(
      BusinessRuleValidationError,
    );
  });

  test('Should throw business rule asd error', async () => {
    const aggregateRoot = new ConcreteAggregateRoot({}, new UUID().toString());

    await expect(() => aggregateRoot.businessRuleValidationWithCustomError()).rejects.toThrowError(
      'Concrete error',
    );

    await expect(() =>
      aggregateRoot.businessRuleValidationWithCustomError(),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
