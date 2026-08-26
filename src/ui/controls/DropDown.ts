import { Locator } from '@playwright/test';
import { BaseElement } from '../BaseElement';

export class DropDown extends BaseElement {
  private get labelLocator(): Locator {
    return this.rootElement.locator('span[class *= "haAclf"]');
  }

  private get expanderLocator(): Locator {
    return this.rootElement.locator('div.rHGeGc-aPP78e');
  }

  private get allOptions(): Locator {
    return this.rootElement.locator('ul[role = "listbox"] li[class *= "aqdrmf"]');
  }

  constructor(rootElement: Locator) {
    super(rootElement);
  }

  private getOptionByValue(value: string): Locator {
    return this.rootElement.locator(`ul[role = "listbox"] li[data-value = "${value}"]`);
  }

  async getValue(): Promise<string> {
    return await this.labelLocator.innerText();
  }

  async selectOption(value: string): Promise<void> {
    await this.expanderLocator.click();
    const option = this.getOptionByValue(value);
    if ((await option.count()) > 0) {
      await option.first().click();
      return;
    }
    await this.allOptions.filter({ visible: true, hasText: value }).click();
  }
}
