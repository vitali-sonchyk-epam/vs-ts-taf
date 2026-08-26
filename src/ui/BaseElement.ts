import { expect, Locator } from '@playwright/test';
import { Logger } from '../utils/Logger';

export class BaseElement {
  protected constructor(protected readonly rootElement: Locator) {}

  public async waitForDisplayed() {
    Logger.debug('Waiting for element to be visible');
    await expect(this.rootElement).toBeVisible();
    return this;
  }
}
