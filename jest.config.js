module.exports = {
  rootDir: '.',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/controllers/*.js',
    '<rootDir>/src/services/*.js',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.js'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
}