import { Locator } from '@playwright/test';
import { BaseNavigationalPage } from '../base/BaseNavigational.page';

export class ShopPage extends BaseNavigationalPage {
  constructor() {
    super('/store');
  }

  async open(): Promise<void> {
    await this.navigate();
  }

  get iphoneCategoryLinkLocator(): Locator {
    return this.page.locator('a.rf-productnav-card-title', { hasText: /^\s*iPhone\s*$/ });
  }

  modelHeadingLocator(model: string): Locator {
    return this.page.getByRole('heading', { name: model, exact: true });
  }

  modelCardLocator(model: string): Locator {
    return this.modelHeadingLocator(model).locator(
      'xpath=ancestor::div[contains(concat(" ", normalize-space(@class), " "), " rf-hcard ")][1]',
    );
  }

  modelPriceLocator(model: string): Locator {
    return this.modelCardLocator(model).locator('span.nowrap').first();
  }
}
