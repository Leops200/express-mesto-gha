module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // "no-var-requires": 0,
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': 'off',
  },
};
