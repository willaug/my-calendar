export default {
  clearMocks: true,
  restoreMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageReporters: [
    'text-summary',
    'html',
  ],
  testEnvironment: 'node',
  forceExit: true,
};
