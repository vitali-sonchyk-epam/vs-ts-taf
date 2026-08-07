import { Locator, Page, expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { Logger } from '../../utils/Logger';

export class EstimationModal extends BaseComponent {
  constructor(page: Page) {
    super(page.locator('div[role="dialog"][aria-label="Add to this estimate"]'));
  }

  async waitForDisplayed() {
    Logger.debug('Waiting for the "Add to this estimate" modal');
    await expect(this.rootElement).toBeVisible();
    return this;
  }

  async openEstimateBlock(label: string) {
    Logger.info('Selecting the estimate block: %s', label);
    const estimateBlock = this.getEstimateBlock(label);
    await estimateBlock.click();
    await expect(this.rootElement).toBeHidden();
  }

  private getEstimateBlock(label: string): Locator{
    return this.rootElement.locator('.//div[@role="button"]').filter({ hasText: label });
  }
}
