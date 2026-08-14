import { Page } from '@playwright/test';
import { parseNumber } from '../../utils/number';
import { Logger } from '../../utils/Logger';
import { CalculatorInput } from '../components/CalculatorInput';
import { BaseCalculatorPage } from './base/BaseCalculator.page';

export class ComputeEnginePage extends BaseCalculatorPage {
  private get numberOfInstancesInput(): CalculatorInput{
    return new CalculatorInput(this.page.locator('div.QiFlid'));
  }

  private get totalUsageLimitInput(): CalculatorInput{
    return new CalculatorInput(this.page.locator('div.KDALvb'));
  }

  constructor(page: Page) {
    super(page, '/products/calculator');
  }

  async setNumberOfInstances(value: number) {
    Logger.info('Setting number of instances to %d', value);
    await this.numberOfInstancesInput.setValue(String(value));
  }

  async getTotalUsageLimit(): Promise<number> {
    const rawValue = await this.totalUsageLimitInput.getValue();
    Logger.info('Read total usage limit: %s', rawValue);
    return parseNumber(rawValue);
  }
}
