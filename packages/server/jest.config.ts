export default {
  clearMocks: true,
  restoreMocks: true,
  collectCoverage: true,
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
    'migrations',
    'scripts',
    'seeds',
  ],
  testEnvironment: 'node',
  forceExit: true,
};
