import { test as base } from '@playwright/test';
import { PageContext } from '../context/PageContext';
import { Locale } from '../constants/Enums';
import { HomeSteps } from '../steps/apple/Home.steps';
import { ShopSteps } from '../steps/apple/Shop.steps';

type Fixtures = {
  bindPage: void;
  appLocale: Locale;
  homeSteps: HomeSteps;
  shopSteps: ShopSteps;
};

export const test = base.extend<Fixtures>({
  appLocale: [Locale.En, { option: true }],
  bindPage: [
    async ({ context, page, appLocale }, use) => {
      await context.addCookies([
        {
          name: 'geo',
          value: appLocale,
          url: 'https://www.apple.com/',
        },
      ]);
      PageContext.set(page);
      await use();
      PageContext.clear();
    },
    { auto: true },
  ],
  homeSteps: async ({ bindPage: _bindPage }, use) => {
    await use(new HomeSteps());
  },
  shopSteps: async ({ bindPage: _bindPage }, use) => {
    await use(new ShopSteps());
  },
});

export { expect } from '@playwright/test';
