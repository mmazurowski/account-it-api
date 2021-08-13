module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      diagnostics: true,
    },
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@root/(.*)': '<rootDir>/src/$1',
    '@application/(.*)': '<rootDir>/src/shared/application/$1',
    '@system/(.*)': '<rootDir>/src/shared/system/$1',
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@tools/(.*)': '<rootDir>/src/shared/tools/$1',
  },
};
