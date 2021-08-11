import { ValueObject } from '@application/ddd/value-object/value-object';
import { MustHaveTenDigitsRule } from '@modules/service-provider-access/registration/core/value-objects/vat-id/rules/must-have-ten-digits.rule';
import { MustHaveCountryCodeRule } from '@modules/service-provider-access/registration/core/value-objects/vat-id/rules/must-have-country-code.rule';

interface VatIdValueObjectState {
  value: string;
}

export class VatIdValueObject extends ValueObject<VatIdValueObjectState> {
  private constructor(value: string) {
    super({
      value,
    });
  }

  public static async fromValue(value: string) {
    await VatIdValueObject.checkBusinessRule(new MustHaveCountryCodeRule(value));

    await VatIdValueObject.checkBusinessRule(new MustHaveTenDigitsRule(value));

    return new VatIdValueObject(value);
  }

  public getValue() {
    return this.props.value;
  }
}
