module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(ts|mjs|js|html)$': ['ts-jest', { tsconfig: 'tsconfig.spec.json', stringifyContentPathRegex: '\\.(html|svg|scss)$' }]
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@angular|rxjs)'
  ],
  testMatch: ['**/+(*.)+(spec|test).+(ts)'],
  moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text'],
  // ts-jest options are specified inline in the transform mapping (recommended)
};
