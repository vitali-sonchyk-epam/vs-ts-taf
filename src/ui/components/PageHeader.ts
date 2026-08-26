import { Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class PageHeader extends BaseComponent {
  private get titleElement(): Locator {
    return this.rootElement.locator('h1');
  }

  constructor(rootElement: Locator) {
    super(rootElement);
  }

  public async getTitle(): Promise<string> {
    return (await this.titleElement.textContent()) ?? '';
  }
}
