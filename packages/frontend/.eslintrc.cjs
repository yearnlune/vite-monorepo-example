require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 14,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json'],
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/airbnb-with-typescript',
    '@vue/prettier',
  ],
  ignorePatterns: ['.eslintrc.cjs'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': ['error', { allow: ['__DEBUG__'] }],
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
