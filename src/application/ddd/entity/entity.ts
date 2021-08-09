import { BusinessRule } from '@application/ddd/business-rule/business-rule';
import { ApplicationError } from '@application/errors/application-error.error';
import { BusinessRuleValidationError } from '@application/errors/business-rule-validation.error';
import { UUID } from '@application/ddd/uuid/uuid.class';

export abstract class Entity<T> {
  protected id: UUID;

  protected state: T;

  constructor(state: T, id: string) {
    this.state = state;
    this.id = new UUID(id);
  }

  public abstract toJSON(): object;

  public static async checkBusinessRule(
    rule: BusinessRule,
    ErrorType: typeof ApplicationError = BusinessRuleValidationError,
  ) {
    const isSatisfied = await rule.isSatisfied();

    if (!isSatisfied) {
      throw new ErrorType(rule.message);
    }
  }

  public isEqual(comparable: Entity<unknown> | UUID | string) {
    if (comparable instanceof Entity) {
      return this.isEqual(comparable.getID());
    }

    if (comparable instanceof UUID) {
      return this.getID().isEqual(comparable);
    }

    return this.getID().toString() === comparable;
  }

  public getID(): UUID {
    return this.id;
  }
}
