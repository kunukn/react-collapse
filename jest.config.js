module.exports = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/test/__mocks__/client.js"],
  snapshotSerializers: [],
  transform: {
    "^.+\\.(js|jsx|tsx)?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/__mocks__/fileMock.js",
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.(xcss|xscss)$": "<rootDir>/test/__mocks__/styleMock.js"
  },
  testEnvironment: "node",
  testURL: "http://localhost",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx}"
  ],
  setupFiles: ["raf/polyfill", "<rootDir>/test/__mocks__/polyfills.js"],
  roots: ["<rootDir>"],
  modulePaths: [],
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  moduleFileExtensions: ["js", "jsx", "css", "scss"],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/"
    // Change MODULE_NAME_HERE to your module that isn't being compiled
    // '/node_modules/(?!@kunukn)',
  ]
};
