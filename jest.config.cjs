module.exports = {
    roots: ['<rootDir>/src/tests'], 
    testMatch: ['**/*.test.ts?(x)'], 
    setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'], 
    testEnvironment: 'jsdom', 
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', 
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  };