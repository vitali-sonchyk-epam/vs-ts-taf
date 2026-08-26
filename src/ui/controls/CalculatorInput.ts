import { Locator } from '@playwright/test';
import { BaseElement } from '../BaseElement';

export class CalculatorInput extends BaseElement {
  constructor(rootElement: Locator) {
    super(rootElement);
  }

  private get inputField(): Locator {
    return this.rootElement.getByRole('spinbutton');
  }

  public async setValue(value: string) {
    await this.inputField.waitFor({ state: 'visible' });
    await this.inputField.fill(value);
  }

  public async getValue(): Promise<string> {
    return await this.inputField.inputValue();
  }
}
