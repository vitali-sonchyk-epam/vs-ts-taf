const timestamp = () => new Date().toISOString().replace('T', ' ').slice(0, 19);

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

  logLevel: 'trace',

  bail: 0,
  baseUrl: 'https://cloud.google.com',

  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  reporters: ['spec', 'allure'],

  framework: 'mocha',
  mochaOpts: {
    timeout: 300000,
  },

  onPrepare() {
    console.warn(`Start time: ${timestamp()}`);
  },

  async before() {
    await browser.setWindowSize(1280, 720);
  },

  async afterTest(_test, _context, { error }) {
    if (error) {
      await browser.takeScreenshot();
    }
  },

  onComplete() {
    console.warn(`Finish time: ${timestamp()}`);
  }
};
