import { Locator, expect } from '@playwright/test';
import { Logger } from '../../utils/Logger';

export class BaseComponent {
  protected constructor(protected readonly rootElement: Locator) {}

  async waitForDisplayed() {
      Logger.debug('Waiting for the "Add to this estimate" modal');
      await expect(this.rootElement).toBeVisible();
      return this;
    }
}
