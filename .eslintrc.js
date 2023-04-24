module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends:
    'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "rules": {
      "no-underscore-dangle": ["error", { "allow": ["_id"] }]
  },
}
};
