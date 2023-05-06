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
  settings: {
    'import/resolver': {
      node: {
        paths: ['global_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': 'off',
  },
};
