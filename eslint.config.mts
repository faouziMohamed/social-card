import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import {defineConfig, globalIgnores} from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    '.agents/**',
    '.next/**',
    'out/**',
    '.ai/**',
    'build/**',
    'next-env.d.ts',
    'eslint.config.*',
    'postcss.config.*',
    'tailwind.config.*',
    '**/*.css',
  ]),
  {
    extends: [
      'js/recommended',
      tseslint.configs['recommended'],
      eslintPluginUnicorn.configs['recommended'],
      prettierConfig,
    ],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      prettier,
      js,
      'unused-imports': unusedImports,
      import: importPlugin,
      react: reactPlugin,
    },
    languageOptions: {
      globals: {...globals.builtin, ...globals.browser, ...globals.node},
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
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
      'no-mixed-operators': [
        'error',
        {
          allowSamePrecedence: true,
          groups: [
            ['%', '**'],
            ['%', '+'],
            ['%', '-'],
            ['%', '*'],
            ['%', '/'],
            ['/', '*'],
            ['&', '|', '^', '~', '<<', '>>', '>>>'],
            ['==', '!=', '===', '!=='],
            ['&&', '||'],
          ],
        },
      ],
      'no-plusplus': ['warn', {allowForLoopAfterthoughts: true}],
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
      'react/button-has-type': 'error',
      'react/jsx-pascal-case': 'error',
      'react/no-danger': 'error',
      'react/no-danger-with-children': 'error',
      'react/jsx-fragments': 'error',
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-max-depth': ['warn', {max: 10}],
      'react/jsx-curly-brace-presence': 'warn',
      'react/display-name': 'warn',
      'react/no-typos': 'warn',
      'react/function-component-definition': [
        'warn',
        {namedComponents: 'function-declaration'},
      ],
      'react/jsx-key': [
        'error',
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
          warnOnDuplicates: true,
        },
      ],
    },
    ignores: [
      '.agents/**',
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  {
    files: [
      'src/modules/og/server/renderers/**/*.tsx',
      'src/modules/seo/server/renderers/**/*.tsx',
    ],
    rules: {
      '@next/next/no-img-element': 'off',
      'jsx-a11y/alt-text': 'off',
    },
  },
]);
