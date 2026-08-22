import { Locator } from '@playwright/test';
import { BaseControl } from './BaseControl';

export class DropDown extends BaseControl {
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

  async getValue(): Promise<string> {
    return await this.labelLocator.innerText();
  }
  async setValue(value: string): Promise<void> {
    await this.expanderLocator.click();
    const optionByValue = this.rootElement.locator(
      `ul[role = "listbox"] li[data-value = "${value}"]`,
    );
    if ((await optionByValue.count()) > 0) {
      await optionByValue.first().click();
      return;
    }
    await this.allOptions.filter({ visible: true, hasText: value }).click();
  }
}
