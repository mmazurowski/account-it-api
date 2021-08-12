import { ValueObject } from '@application/ddd/value-object/value-object';
import { MustBeIntegerRule } from '@modules/service-provider-access/registration/core/value-objects/regon/rules/must-be-integer.rule';
import { MustHaveNineDigitsRule } from '@modules/service-provider-access/registration/core/value-objects/regon/rules/must-have-nine-digits.rule';

interface RegonValueObjectState {
  value: number;
}

export class RegonValueObject extends ValueObject<RegonValueObjectState> {
  private constructor(value: number) {
    super({
      value,
    });
  }

  public static async fromValue(value: number) {
    await RegonValueObject.checkBusinessRule(new MustBeIntegerRule(value));

    await RegonValueObject.checkBusinessRule(new MustHaveNineDigitsRule(value));

    return new RegonValueObject(value);
  }

  public getValue() {
    return this.props.value;
  }
}
