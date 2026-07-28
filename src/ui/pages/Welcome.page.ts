import { BasePage } from './Base.page';
import {EstimationModal} from '../components/EstimationModal';
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
    const estimationModal = await this.clickAddToEstimateButton();
    return await estimationModal.openComputeEngineBlock();
  }

  async clickAddToEstimateButton() {
    await expect(this.addToEstimateButton).toBeDisplayed();
    await this.addToEstimateButton.click();
    return await this.waitForAddEstimationModal();
  }

  private async waitForAddEstimationModal() {
    await expect(this.addEstimationModal).toBeDisplayed();
    return estimationModal;
  }
}
