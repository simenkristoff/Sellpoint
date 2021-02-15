module.exports = {
  preset: 'ts-jest',
  rootDir: '../',
  roots: ['<rootDir>src/'],
  modulePathIgnorePatterns: ['__mockData__', 'assets'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '\\.(html|xml|txt|md)$': 'jest-raw-loader',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', 'jest-extended'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': '<rootDir>/assetsTransformer.js',
    '\\.(css|less)$': '<rootDir>/tests/__mocks__/styleMock.ts',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
