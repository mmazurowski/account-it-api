import { v4, validate } from 'uuid';
import { UniqueIdFormatError } from '@application/errors/unique-id-format.error';

export class UUID {
  private readonly id: string;

  constructor(id?: string) {
    if (id && !validate(id)) {
      throw new UniqueIdFormatError(`Provided id: ${id} is not proper uuid`);
    } else {
      this.id = id || v4();
    }
  }

  public toString() {
    return this.id;
  }

  public isEqual(value: UUID | string) {
    if (value instanceof UUID) {
      return value.toString() === this.id;
    }

    return this.id === value;
  }
}
