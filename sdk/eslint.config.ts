import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import {defineConfig, globalIgnores} from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['node_modules/**', 'dist/**', 'examples/**']),
  {
    extends: [
      'js/recommended',
      tseslint.configs['recommended'],
      eslintPluginUnicorn.configs['recommended'],
      prettierConfig,
    ],
    files: ['**/*.{js,ts}'],
    plugins: {
      prettier,
      js,
      'unused-imports': unusedImports,
      import: importPlugin,
    },
    languageOptions: {
      globals: {...globals.builtin, ...globals.node},
    },
    rules: {
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'no-var': 'warn',
      'no-empty': 'error',
      'no-implicit-coercion': [
        'error',
        {boolean: false, number: true, string: true},
      ],
      'no-underscore-dangle': 'off',
      'no-continue': 'off',
      'no-void': 'off',
      'no-console': ['warn', {allow: ['warn', 'error']}],
      'no-empty-function': 'warn',
      'no-param-reassign': ['error', {props: false}],
      'no-restricted-syntax': [
        'error',
        'ForInStatement',
        'LabeledStatement',
        'WithStatement',
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
      ],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'unicorn/better-regex': 'warn',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/consistent-destructuring': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-top-level-await': 'off',
    },
  },
]);
