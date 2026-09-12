import { expect } from '@playwright/test';
import { PageContext } from '../../context/PageContext';
import { HomePage } from '../../ui/pages/apple/Home.page';
import { Logger } from '../../utils/Logger';
import { BaseSteps } from '../base/Base.steps';

export class HomeSteps extends BaseSteps<HomePage> {
  constructor() {
    super(new HomePage());
  }

  async applyCurrentLocale(): Promise<void> {
    if (await this.page.continuteButtonLocator.isVisible()) {
      Logger.info('Applying current language');
      await this.page.continuteButtonLocator.click();
    }
  }

  async navigateToStore(): Promise<void> {
    Logger.info('Navigating to the Store section');
    // The global nav item first opens a hover-style flyout menu before the
    // click registers as navigation, so retry the click until the URL changes.
    await expect(async () => {
      await this.page.storeLinkLocator.click();
      await expect(PageContext.get()).toHaveURL(/\/store/, { timeout: 3_000 });
    }).toPass({ timeout: 30_000 });
  }
}
