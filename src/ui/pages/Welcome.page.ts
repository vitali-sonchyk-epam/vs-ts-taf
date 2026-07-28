import { BasePage } from './Base.page';
import {EstimationModal} from '../components/EstimationModal';
import { Logger } from '../../utils/Logger';

const estimationModal = new EstimationModal();

export class WelcomePage extends BasePage {
  private get addToEstimateButton() {
    return $('.Gxwdcd button');
  }

  private get addEstimationModal() {
    return $('div[role="dialog"][aria-label="Add to this estimate"]');
  }

  constructor() {
    super('/products/calculator');
  }

  async openComputeEngine(){
    Logger.info('Adding a Compute Engine estimate');
    const estimationModal = await this.clickAddToEstimateButton();
    return await estimationModal.openComputeEngineBlock();
  }

  async clickAddToEstimateButton() {
    Logger.info('Clicking "Add to estimate" button');
    await expect(this.addToEstimateButton).toBeDisplayed();
    await this.addToEstimateButton.click();
    return await this.waitForAddEstimationModal();
  }

  private async waitForAddEstimationModal() {
    Logger.debug('Waiting for the "Add to this estimate" modal');
    await expect(this.addEstimationModal).toBeDisplayed();
    return estimationModal;
  }
}
