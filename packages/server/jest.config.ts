export default {
  clearMocks: true,
  restoreMocks: true,
  collectCoverage: true,
  roots: ["<rootDir>/tests/"],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/server.ts',
  ],
  coverageReporters: [
    'text-summary',
    'html',
  ],
  coveragePathIgnorePatterns: [
    'node_modules',
    'interfaces',
    'database',
  ],
  testEnvironment: 'node',
  forceExit: true,
};
