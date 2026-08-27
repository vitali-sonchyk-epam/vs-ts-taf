import { expect } from '@playwright/test';
import { WelcomePage } from '../ui/pages/Welcome.page';
import { EstimationModule } from '../constants/Enums';
import { BlockNames } from '../constants/BlockNames';
import { Logger } from '../utils/Logger';

const blockNameByModule: Record<EstimationModule, string> = {
  [EstimationModule.ComputeEngine]: BlockNames.ComputeEngine,
  [EstimationModule.CloudSQL]: BlockNames.CloudSQL,
  [EstimationModule.KubernetesEngine]: BlockNames.KubernetesEngine,
};

export class WelcomeSteps {
  private welcomePage: WelcomePage;

  constructor() {
    this.welcomePage = new WelcomePage();
  }

  async openAndNavigateToModel(estimationModule: EstimationModule) {
    const blockName = blockNameByModule[estimationModule];
    await this.welcomePage.open();
    await this.openEstimate(blockName);
  }

  private async openEstimate(blockName: string): Promise<void> {
    Logger.info(`Adding a ${blockName} estimate`);
    Logger.info('Clicking "Add to estimate" button');
    await expect(this.welcomePage.addToEstimateButton).toBeVisible();
    await this.welcomePage.addToEstimateButton.click();
    const modal = await this.welcomePage.estimationModal.waitForDisplayed();
    await modal.openEstimateBlock(blockName);
  }
}
