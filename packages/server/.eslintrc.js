module.exports = {
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
      typescript: {},
    },
  },
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'import',
    '@typescript-eslint',
  ],
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
  },
};
