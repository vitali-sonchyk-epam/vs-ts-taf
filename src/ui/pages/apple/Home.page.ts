import { Locator } from '@playwright/test';
import { BasePage } from '../base/Base.page';

export class HomePage extends BasePage {
  constructor() {
    super('');
  }
  get continuteButtonLocator(): Locator {
    return this.page.locator('a.ac-ls-continue');
  }

  get storeLinkLocator(): Locator {
    // The nav's accessible name and link text are localized (e.g. "Sklep" in
    // Polish), so target the stable, locale-independent data attribute instead.
    return this.page.locator('a[data-globalnav-item-name="store"]');
  }
}
