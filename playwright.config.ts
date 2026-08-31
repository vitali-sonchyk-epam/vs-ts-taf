import 'dotenv/config';
import { defineConfig, type ReporterDescription } from '@playwright/test';

// Pick a single reporter based on the REPORTER value from `.env` (defaults to html).
const reporterKind = process.env['REPORTER'] ?? 'html';

const htmlReporter: ReporterDescription = ['html', { open: 'never' }];

const reportPortalConfig = {
  apiKey: process.env['RP_API_KEY'] ?? '',
  endpoint: process.env['RP_ENDPOINT'] ?? 'https://reportportal.epam.com/api/v2',
  project: process.env['RP_PROJECT'] ?? '',
  launch: process.env['RP_LAUNCH'] ?? 'vs-ts-taf',
  attributes: [{ key: 'framework', value: 'playwright' }],
  includeTestSteps: true,
};

const reporterByKind: Record<string, ReporterDescription> = {
  list: ['list'],
  html: htmlReporter,
  allure: ['allure-playwright', { resultsDir: 'allure-results' }],
  junit: [
    'junit',
    {
      outputFile: process.env['JUNIT_OUTPUT_FILE'] ?? 'test-results/junit/results.xml',
      includeProjectInTestName: true,
      stripANSIControlSequences: true,
      embedAnnotationsAsProperties: true,
    },
  ],
  reportportal: ['@reportportal/agent-js-playwright', reportPortalConfig],
};

const reporter: ReporterDescription = reporterByKind[reporterKind] ?? htmlReporter;

export default defineConfig({
  testDir: './src/tests',
  testMatch: ['**/*.tests.ts'],
  snapshotPathTemplate: './screenshots/{testFilePath}/{arg}.webp',

  timeout: 120_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: { maxDiffPixels: 100 },
  },

  fullyParallel: true,
  retries: 0,

  reporter: [reporter],

  use: {
    baseURL: process.env['BASE_URL'] ?? 'https://cloud.google.com',
    headless: process.env['HEADLESS'] === 'true',
    actionTimeout: 10_000,
    navigationTimeout: 90_000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'cloud-calculator',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
      },
    },
  ],
});
