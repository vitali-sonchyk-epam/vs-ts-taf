import { ProductTags, Tags } from '../../constants/Tags';
import { test, expect } from '../../fixtures/appleTestFixture';
import { priceCurrencyIndicator } from '../../i18n/appleLocalizationSourceData';

const iphoneModels = ['iPhone 16', 'iPhone 17', 'iPhone Air'];

test.describe('Apple localization tests', () => {
  test.beforeEach(async ({ homeSteps }) => {
    await homeSteps.openPage();
    await homeSteps.applyCurrentLocale();
  });

  for (const model of iphoneModels) {
    test(
      `iPhone price shows region currency prefix: ${model}`,
      { tag: [ProductTags.Apple, Tags.Localization] },
      async ({ shopSteps, appLocale, homeSteps }) => {
        await homeSteps.openStore();
        await shopSteps.openIphoneList();
        await expect
          .poll(() => shopSteps.getIphonePrice(model))
          .toContain(priceCurrencyIndicator[appLocale]);
      },
    );
  }
});
