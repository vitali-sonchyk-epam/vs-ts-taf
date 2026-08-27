import { Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class CostDetailsPanel extends BaseComponent {
  private get computeValueLabelLocator(): Locator {
    return this.rootElement.locator('label.RI8Tpc');
  }

  constructor(rootElement: Locator) {
    super(rootElement);
  }

  async getComputeValue(): Promise<string> {
    return await this.computeValueLabelLocator.innerText();
  }
}
