import { Locator } from '@playwright/test';
import { BasePage } from '../base/Base.page';

export class ShopPage extends BasePage {
  constructor() {
    super('/store');
  }

  get iphoneCategoryLinkLocator(): Locator {
    // Scoped by the stable "product nav card" class rather than the list's
    // accessible name, which is localized (e.g. "Produkt" in Polish).
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
