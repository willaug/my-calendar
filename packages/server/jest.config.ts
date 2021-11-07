import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from './tsconfig.json';

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
    'database',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  testEnvironment: 'node',
  forceExit: true,
};
