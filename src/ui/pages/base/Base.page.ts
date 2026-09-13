import { Page, expect } from '@playwright/test';
import { Logger } from '../../../utils/Logger';
import { PageContext } from '../../../context/PageContext';

export class BasePage {
  protected get page(): Page {
    return PageContext.get();
  }

  private get cookiesConfirmationButton() {
    return this.page.locator('button.glue-cookie-notification-bar__accept');
  }

  constructor(protected readonly path: string) {}

  async confirmCookies() {
    if (await this.cookiesConfirmationButton.isVisible()) {
      Logger.info('Accepting cookie consent banner');
      await this.cookiesConfirmationButton.click();
    }
  }

  async waitForPageUrl() {
    Logger.debug('Waiting for URL to contain: %s', this.path);
    const escapedPath = this.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(this.page).toHaveURL(new RegExp(escapedPath));
  }
}
