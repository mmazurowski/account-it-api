import { ValueObject } from './value-object';

interface ValueObjectProps {
  value: number;
  type: string;
  deepObject: {
    value: boolean;
    type: string;
  };
}

class TestedValueObject extends ValueObject<ValueObjectProps> {
  public toJSON(): object {
    return {};
  }
}

describe('Value Object Building Block', () => {
  test('Should compare shallow props', () => {
    const props = {
      value: 200,
      type: 'default',
      deepObject: {
        value: true,
        type: 'default',
      },
    };

    const voA = new TestedValueObject(props);
    const voB = new TestedValueObject(props);

    expect(voA.isEqual(voB)).toEqual(true);
  });

  test('Should compare when missing key', () => {
    const props = {
      value: 200,
      type: 'default',
      deepObject: {
        value: true,
        type: 'default',
      },
    };

    const voA = new TestedValueObject(props);
    // @ts-ignore-next-line
    const voB = new TestedValueObject({
      value: 200,
      deepObject: {
        value: true,
        type: 'default',
      },
    });

    expect(voA.isEqual(voB)).toEqual(false);
  });

  test('Should compare props in wrong order', () => {
    const voA = new TestedValueObject({
      value: 200,
      type: 'default',
      deepObject: {
        value: true,
        type: 'default',
      },
    });
    const voB = new TestedValueObject({
      type: 'default',
      value: 200,
      deepObject: {
        value: true,
        type: 'default',
      },
    });

    expect(voA.isEqual(voB)).toEqual(true);
  });

  test('Should compare props with deep equality', () => {
    const voA = new TestedValueObject({
      value: 200,
      type: 'default',
      deepObject: {
        value: true,
        type: 'default',
      },
    });
    const voB = new TestedValueObject({
      value: 200,
      type: 'default',
      deepObject: {
        value: false,
        type: 'default',
      },
    });

    expect(voA.isEqual(voB)).toEqual(false);
  });
});
