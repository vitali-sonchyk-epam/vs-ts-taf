import { Locator } from '@playwright/test';
import { BaseCalculatorPage } from './base/BaseCalculator.page';
import { DropDown } from '../controls/DropDown';

export class KubernetesEnginePage extends BaseCalculatorPage {
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

  constructor() {
    super('/products/calculator');
  }
}
