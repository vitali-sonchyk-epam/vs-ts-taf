import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  testMatch: '**/*.tests.ts',

  timeout: 120_000,
  expect: {
    timeout: 10_000,
  },

  fullyParallel: true,
  retries: 0,

  reporter: [
    ['list'],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],

  use: {
    baseURL: process.env['BASE_URL'] ?? 'https://cloud.google.com',
    headless: process.env['HEADLESS'] === 'true',
    actionTimeout: 10_000,
    navigationTimeout: 90_000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'cloud-calculator',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});
