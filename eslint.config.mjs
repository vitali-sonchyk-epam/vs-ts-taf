import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: [
      'node_modules/**',
      'allure-report/**',
      'allure-results/**',
      'test-results/**',
      'playwright-report/**',
    ],
  },
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['**/*.tests.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/valid-test-tags': 'off',
      'playwright/no-skipped-test': 'warn',
      'playwright/expect-expect': 'error',
    },
  },
  prettier,
]);
