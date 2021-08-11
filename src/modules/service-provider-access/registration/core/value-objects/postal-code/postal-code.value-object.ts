import { ValueObject } from '@application/ddd/value-object/value-object';
import { MustHaveProperFormatRule } from '@modules/service-provider-access/registration/core/value-objects/postal-code/rules/must-have-proper-format.rule';

interface PostalCodeValueObjectState {
  value: string;
}

export class PostalCodeValueObject extends ValueObject<PostalCodeValueObjectState> {
  private constructor(value: string) {
    super({
      value,
    });
  }

  public static async fromValue(value: string) {
    await PostalCodeValueObject.checkBusinessRule(new MustHaveProperFormatRule(value));

    return new PostalCodeValueObject(value);
  }

  public getValue() {
    return this.props.value;
  }
}
