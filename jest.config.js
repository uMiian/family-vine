module.exports = {
  // Create aliases for tests
  moduleNameMapper: {
    '^@main/(.*)$': '<rootDir>/src/main/$1',
    '^@models/(.*)$': '<rootDir>/src/main/models/$1',
    '^@services/(.*)$': '<rootDir>/src/main/services/$1',
    '^@handlers/(.*)$': '<rootDir>/src/main/handlers/$1',
  },
}
