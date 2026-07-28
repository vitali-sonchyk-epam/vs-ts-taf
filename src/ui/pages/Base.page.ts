export class BasePage {
  private get cookiesConfirmationButton() {
    return $('button.glue-cookie-notification-bar__accept');
  }

  get currentUrl(): Promise<string> {
    return browser.getUrl();
  }

  constructor(private readonly url: string) {}

  async open() {
    const url = await browser.url(this.url);
    await this.waitForPageLoad();
    await this.confirmCookies();
    return url;
  }

  async confirmCookies() {
    if (await this.cookiesConfirmationButton.isDisplayed()) {
      await this.cookiesConfirmationButton.click();
    }
  }

  async waitForPageLoad(){
    await expect(browser).toHaveUrl(expect.stringContaining(this.url));
  }
}
