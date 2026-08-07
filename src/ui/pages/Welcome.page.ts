import { Page, expect } from '@playwright/test';
import { BaseCalculatorPage } from './base/BaseCalculator.page';
import { EstimationModal } from '../components/EstimationModal';
import { Logger } from '../../utils/Logger';
import { ComputeEnginePage } from './ComputeEngine.page';
import { CloudSQLPage } from './CloudSQL.page';
import { blockNames } from '../../constants/blockNames';

export class WelcomePage extends BaseCalculatorPage {
  private readonly estimationModal: EstimationModal;

  private get addToEstimateButton() {
    return this.page.locator('.Gxwdcd button');
  }

  constructor(page: Page) {
    super(page, '/products/calculator');
    this.estimationModal = new EstimationModal(page);
  }

  openComputeEngine(): Promise<ComputeEnginePage> {
    return this.openEstimate(blockNames.ComputeEngine, ComputeEnginePage);
  }

  openCloudSQL(): Promise<CloudSQLPage> {
    return this.openEstimate(blockNames.CloudSQL, CloudSQLPage);
  }

  private async openEstimate<T extends BaseCalculatorPage>(
    blockName: string,
    PageClass: new (page: Page) => T,
  ): Promise<T> {
    Logger.info(`Adding a ${blockName} estimate`);
    const modal = await this.clickAddToEstimateButton();
    await modal.openEstimateBlock(blockName);
    return new PageClass(this.page);
  }

  async clickAddToEstimateButton() {
    Logger.info('Clicking "Add to estimate" button');
    await expect(this.addToEstimateButton).toBeVisible();
    await this.addToEstimateButton.click();
    return await this.estimationModal.waitForDisplayed();
  }
}
