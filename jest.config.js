module.exports = {
  rootDir: '.',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/controller/*.js',
    '<rootDir>/src/services/*.js',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.js'],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20,
    },
  },
}