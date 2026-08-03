import { BasePage } from './Base.page';
import {EstimationModal} from '../components/EstimationModal';
import { Logger } from '../../utils/Logger';

const estimationModal = new EstimationModal();

export class WelcomePage extends BasePage {
  private get addToEstimateButton() {
    return $('.Gxwdcd button');
  }

  constructor() {
    super('/products/calculator');
  }

  async openComputeEngine(){
    Logger.info('Adding a Compute Engine estimate');
    const modal = await this.clickAddToEstimateButton();
    return await modal.openComputeEngineBlock();
  }

  async clickAddToEstimateButton() {
    Logger.info('Clicking "Add to estimate" button');
    await expect(this.addToEstimateButton).toBeDisplayed();
    await this.addToEstimateButton.click();
    return await estimationModal.waitForDisplayed();
  }
}
