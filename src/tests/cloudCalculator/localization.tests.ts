import { test, expect } from '../../fixtures/localizationFixture';
import { headerTranslations } from '../../i18n/localizationSourceData';

test.describe('localization tests', () => {
  test.beforeEach(async ({ welcomeSteps }) => {
    await welcomeSteps.open();
  });

  test('check localization on the welcome page', async ({ language, welcomeSteps }) => {
    await welcomeSteps.selectLanguage(language);
    await expect
      .poll(() => welcomeSteps.getAllHeaderLabels())
      .toEqual(headerTranslations[language]);
  });
});
