module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/src/test/jestSetup.js',
  snapshotSerializers: [],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(xcss|xscss)$': '<rootDir>/__mocks__/styleMock.js'
  },
  testEnvironment: 'node',
  testURL: 'http://localhost',
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx}', '<rootDir>/src/**/?(*.)(spec|test).{js,jsx}'],
  setupFiles: ['<rootDir>/config/polyfills.js'],
  roots: ['<rootDir>'],
  modulePaths: [],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleFileExtensions: ['js', 'jsx', 'css', 'scss']
};
