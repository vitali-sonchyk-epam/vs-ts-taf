import { expect } from '@playwright/test';
import { WelcomePage } from '../../ui/pages/cloudCalculator/Welcome.page';
import { EstimationModule, Language } from '../../constants/Enums';
import { BlockNames } from '../../constants/BlockNames';
import { languageCodes } from '../../i18n/localizationSourceData';
import { Logger } from '../../utils/Logger';
import { BaseSteps } from '../base/Base.steps';

const blockNameByModule: Record<EstimationModule, string> = {
  [EstimationModule.ComputeEngine]: BlockNames.ComputeEngine,
  [EstimationModule.CloudSQL]: BlockNames.CloudSQL,
  [EstimationModule.KubernetesEngine]: BlockNames.KubernetesEngine,
};

export class WelcomeSteps extends BaseSteps<WelcomePage> {
  constructor() {
    super(new WelcomePage());
  }

  async openPage() {
    Logger.info(`Navigating to welcome page`);
    await this.page.navigate();
    await this.page.confirmCookies();
  }

  async openAndNavigateToModel(estimationModule: EstimationModule) {
    const blockName = blockNameByModule[estimationModule];
    await this.page.open();
    await this.openEstimate(blockName);
  }

  private async openEstimate(blockName: string): Promise<void> {
    Logger.info(`Adding a ${blockName} estimate`);
    Logger.info('Clicking "Add to estimate" button');
    await expect(this.page.addToEstimateButton).toBeVisible();
    await this.page.addToEstimateButton.click();
    const modal = await this.page.estimationModal.waitForDisplayed();
    await modal.openEstimateBlock(blockName);
  }

  async selectLanguage(language: Language): Promise<void> {
    Logger.info(`Selecting language: ${language}`);
    await this.page.openLanguageSelector();
    await this.page.selectLanguage(languageCodes[language]);
  }

  async getAllHeaderLabels() {
    Logger.info('Retrieving all header labels');
    return await this.page.getAllHeaderLabels();
  }
}
