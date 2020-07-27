module.exports = {
  roots: ['<rootDir>'],
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx', 'html', 'json', 'node'],
  coverageReporters: ['html'],
  testPathIgnorePatterns: ['/node_modules/'],
}
