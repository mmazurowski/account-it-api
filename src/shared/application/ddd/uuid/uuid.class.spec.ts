import { v4 } from 'uuid';
import { UUID } from './uuid.class';

describe('UUID building block', () => {
  test('Should compare UUID with id in string', () => {
    const uuid = new UUID();

    expect(uuid.isEqual('test')).toEqual(false);
    expect(uuid.isEqual(uuid.toString())).toEqual(true);
  });

  test('Should compare two strings id in string', () => {
    const id = v4();

    const uuid = new UUID(id);

    expect(uuid.isEqual(id)).toEqual(true);
  });

  test('Should compare UUID', () => {
    const id = v4();

    const uuidA = new UUID(id);
    const uuidB = new UUID(id);

    expect(uuidA.isEqual(uuidB)).toEqual(true);
  });
});
