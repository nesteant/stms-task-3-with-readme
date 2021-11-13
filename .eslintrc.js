module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@angular-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    project: ['./tsconfig.spec.json', './tsconfig.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', '@angular-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    'max-len': [
      1,
      140,
      2,
      {
        ignorePattern: '^import\\s.+\\sfrom\\s.+;$',
        ignoreUrls: true,
      },
    ],
    'no-useless-constructor': 'off',
    semi: ['error', 'always'],
    '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: ['cs', 'app'], style: 'camelCase' }],
    '@angular-eslint/component-selector': ['error', { type: 'element', prefix: ['cs', 'app'], style: 'kebab-case' }],
  },
};
