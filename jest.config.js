module.exports = {
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],

    etupFilesAfterEnv: ['<rootDir>/tests/singleton.ts'],
  }
  