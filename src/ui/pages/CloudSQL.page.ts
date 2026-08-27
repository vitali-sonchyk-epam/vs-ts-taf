import { BaseCalculatorPage } from './base/BaseCalculator.page';
import { DropDown } from '../controls/DropDown';

export class CloudSQLPage extends BaseCalculatorPage {
  get serviceTypeDropDown(): DropDown {
    return new DropDown(this.page.locator('div[jsName = "HeRlU"]'));
  }

  constructor() {
    super('/products/calculator');
  }
}
