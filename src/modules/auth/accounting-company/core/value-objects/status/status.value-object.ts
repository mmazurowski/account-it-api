import { ValueObject } from '@application/ddd/value-object/value-object';

export enum StatusValues {
  CONFIRMED = 'confirmed',
  AWAITING_CONFIRMATION = 'awaiting_confirmation',
}

interface StatusValueObjectState {
  value: StatusValues;
}

export class StatusValueObject extends ValueObject<StatusValueObjectState> {
  private constructor(value: StatusValues) {
    super({
      value,
    });
  }

  public static CONFIRMED = new StatusValueObject(StatusValues.CONFIRMED);

  public static AWAITING_CONFIRMATION = new StatusValueObject(StatusValues.AWAITING_CONFIRMATION);

  public static fromValue(value: string) {
    switch (value) {
      case StatusValues.CONFIRMED:
        return StatusValueObject.CONFIRMED;
      case StatusValues.AWAITING_CONFIRMATION:
        return StatusValueObject.AWAITING_CONFIRMATION;
      default:
        // TODO: Add error
        break;
    }
  }

  public getValue() {
    return this.props.value;
  }
}
