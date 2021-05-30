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
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}