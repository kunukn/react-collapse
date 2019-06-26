module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  extends: [
    // "react-app",
    // "react-hooks",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  rules: {
    // "react-hooks/rules-of-hooks": "error",
    // "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": 0,
    "no-console": 0
  }
};
