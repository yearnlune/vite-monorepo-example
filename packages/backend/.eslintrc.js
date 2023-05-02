module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    camelcase: 'off',
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
