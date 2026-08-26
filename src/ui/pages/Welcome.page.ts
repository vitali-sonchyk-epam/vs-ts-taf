import { Locator } from '@playwright/test';
import { BaseCalculatorPage } from './base/BaseCalculator.page';
import { EstimationModal } from '../components/EstimationModal';

export class WelcomePage extends BaseCalculatorPage {
  get estimationModal(): EstimationModal {
    return new EstimationModal(this.page);
  }

  get addToEstimateButton(): Locator {
    return this.page.locator('.Gxwdcd button');
  }

  constructor() {
    super('/products/calculator');
  }
}
