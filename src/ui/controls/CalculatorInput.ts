import { Locator } from '@playwright/test';
import { BaseControl } from './BaseControl';

export class CalculatorInput extends BaseControl {
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
