import { ValueObject } from '@application/ddd/value-object/value-object';

interface PostalCodeValueObjectState {
  value: string;
}

export class PhoneNumberValueObject extends ValueObject<PostalCodeValueObjectState> {
  private constructor(value: string) {
    super({
      value,
    });
  }

  public static async fromValue(value: string) {
    return new PhoneNumberValueObject(value);
  }

  public getValue() {
    return this.props.value;
  }
}
