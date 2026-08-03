const allureReporter = require('@wdio/allure-reporter').default;
exports.config = {
  runner: 'local',

  specs: ['./src/tests/**/**.tests.ts'],
  suites: {
    smoke: ['./src/tests/smoke/**.tests.ts'],
  },

  maxInstances: 1,

  capabilities: [
    {
      browserName: 'chrome',
    },
  ],

  logLevel: 'warn',
  logLevels: {
    webdriver: 'warn',
    devtools: 'warn',
    '@wdio/local-runner': 'warn',
    '@wdio/utils': 'warn',
    taf: 'info',
  },

  bail: 0,
  baseUrl: 'https://cloud.google.com',

  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverScreenshotsReporting: true,
      },
    ],
  ],

  framework: 'mocha',
  mochaOpts: {
    timeout: 120000,
  },

  async beforeTest() {
    if (this._wdioFirstTestDone) {
      await browser.reloadSession();
    }
    this._wdioFirstTestDone = true;
    await browser.maximizeWindow();
  },

  async afterTest(test, _context, { error }) {
    if (error) {
      const screenshot = await browser.takeScreenshot();
      allureReporter.addAttachment(
        `${test.title} (screenshot)`,
        Buffer.from(screenshot, 'base64'),
        'image/png',
      );
    }
},
};
