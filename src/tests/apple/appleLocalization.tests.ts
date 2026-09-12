import { ProductTags, Tags } from '../../constants/Tags';
import { test, expect } from '../../fixtures/appleTestFixture';
import { priceCurrencyIndicator } from '../../i18n/appleLocalizationSourceData';

const iphoneModels = ['iPhone 16', 'iPhone 17', 'iPhone Air'];

test.describe('Apple localization tests', () => {
  test.beforeEach(async ({ homeSteps, shopSteps }) => {
    await homeSteps.openPage();
    await homeSteps.applyCurrentLocale();

    // Navigate to Store > iPhone listing
    await homeSteps.navigateToStore();
    await shopSteps.navigateToIphoneListing();
  });

  for (const model of iphoneModels) {
    test(
      `iPhone price shows region currency prefix: ${model}`,
      { tag: [ProductTags.Apple, Tags.Localization] },
      async ({ shopSteps, appLocale }) => {
        await expect
          .poll(() => shopSteps.getIphonePriceText(model))
          .toContain(priceCurrencyIndicator[appLocale]);
      },
    );
  }
});
