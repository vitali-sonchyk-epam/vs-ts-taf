import { Page, expect } from '@playwright/test';
import { BaseCalculatorPage } from './base/BaseCalculator.page';
import { EstimationModal } from '../components/EstimationModal';
import { Logger } from '../../utils/Logger';
import { ComputeEnginePage } from './ComputeEngine.page';
import { CloudSQLPage } from './CloudSQL.page';

export class WelcomePage extends BaseCalculatorPage {
  private readonly estimationModal: EstimationModal;

  private get addToEstimateButton() {
    return this.page.locator('.Gxwdcd button');
  }

  constructor(page: Page) {
    super(page, '/products/calculator');
    this.estimationModal = new EstimationModal(page);
  }

  async openComputeEngine() : Promise<ComputeEnginePage> {
    Logger.info('Adding a Compute Engine estimate');
    const modal = await this.clickAddToEstimateButton();
    await modal.openEstimateBlock("Compute Engine");
    return new ComputeEnginePage(this.page);
  }

  async openCloudSQL() : Promise<CloudSQLPage> {
    Logger.info('Adding a Cloud SQL estimate');
    const modal = await this.clickAddToEstimateButton();
    await modal.openEstimateBlock("Cloud SQL");
    return new CloudSQLPage(this.page);
  }

  async clickAddToEstimateButton() {
    Logger.info('Clicking "Add to estimate" button');
    await expect(this.addToEstimateButton).toBeVisible();
    await this.addToEstimateButton.click();
    return await this.estimationModal.waitForDisplayed();
  }
}
