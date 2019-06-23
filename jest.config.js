module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/test/jestSetup.js', '@testing-library/react/cleanup-after-each'],
  snapshotSerializers: [],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
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
  moduleFileExtensions: ['js', 'jsx', 'css', 'scss'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/'

    // Change MODULE_NAME_HERE to your module that isn't being compiled
    //  '/node_modules/(?!MODULE_NAME_HERE).+\\.js$'
  ]
};
