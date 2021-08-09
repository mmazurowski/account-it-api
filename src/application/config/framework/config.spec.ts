import { Config, ConfigProps } from '@application/config/framework/config';

interface BaseConfigValues {
  SOME_PRODUCT_ID: string;
}

describe('Config Building Block', () => {
  test('should return production variable when using production env', () => {
    const base: BaseConfigValues = {
      SOME_PRODUCT_ID: 'base',
    };

    const props = {
      base,
      production: {},
      development: {},
      staging: {
        SOME_PRODUCT_ID: 'staging',
      },
      test: {
        SOME_PRODUCT_ID: 'test',
      },
      ci: {},
    } as ConfigProps<BaseConfigValues>;

    process.env.NODE_ENV = 'test';

    const testConfig = new Config<BaseConfigValues>(props);

    expect(testConfig.get('SOME_PRODUCT_ID')).toEqual('test');

    process.env.NODE_ENV = 'staging';

    const stageConfig = new Config<BaseConfigValues>(props);

    expect(stageConfig.get('SOME_PRODUCT_ID')).toEqual('staging');
  });
});
