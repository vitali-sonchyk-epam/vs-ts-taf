import { Logger } from '../../utils/Logger';

export class BasePage {
  private get cookiesConfirmationButton() {
    return $('button.glue-cookie-notification-bar__accept');
  }

  constructor(private readonly url: string) {}

  async open() {
    Logger.info('Opening page: %s', this.url);
    const url = await browser.url(this.url);
    await this.waitForPageLoad();
    await this.confirmCookies();
    return url;
  }

  async confirmCookies() {
    if (await this.cookiesConfirmationButton.isDisplayed()) {
      Logger.info('Accepting cookie consent banner');
      await this.cookiesConfirmationButton.click();
    }
  }

  async waitForPageLoad(){
    Logger.debug('Waiting for URL to contain: %s', this.url);
    await expect(browser).toHaveUrl(expect.stringContaining(this.url));
  }
}
