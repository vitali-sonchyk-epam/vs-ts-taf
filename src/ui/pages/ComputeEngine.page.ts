import { Locator } from '@playwright/test';
import { DropDown } from '../controls/DropDown';
import { BaseCalculatorPage } from './base/BaseCalculator.page';

export class ComputeEnginePage extends BaseCalculatorPage {
  get machineFamilyDropDown(): DropDown {
    return new DropDown(this.page.locator('div[jsName = "Wsw6tc"]'));
  }

  get seriesDropDown(): DropDown {
    return new DropDown(this.page.locator('div[jsName = "vGGDlb"]'));
  }

  get machineTypeDropDown(): DropDown {
    return new DropDown(this.page.locator('div[jsName = "kgDJk"]'));
  }

  get machineTypeLabel(): Locator {
    return this.page.locator('div[jsName = "kgDJk"] span[class *= "haAclf"]');
  }

  get regionDropDown(): DropDown {
    return new DropDown(this.page.locator('div[jsName = "U7okFc"]:has([aria-label = "Region"])'));
  }

  get numberOfCPUInput(): Locator {
    return this.page.locator('div[jsName = "pYn3de"] input[jsName = "YPqjbf"]');
  }

  get amountOfMemoryInput(): Locator {
    return this.page.locator('div[jsName = "izsKfc"] input[jsName = "YPqjbf"]');
  }

  get provisioningModelContainers(): Locator {
    return this.page.locator('div.e2WL2b').filter({ visible: true });
  }

  constructor() {
    super('/products/calculator');
  }
}
