import { BaseComponent } from './BaseComponent';
import { CalculatorPage } from '../pages/Calculator.page';
import { Logger } from '../../utils/Logger';

const calculatorPage = new CalculatorPage();

export class EstimationModal extends BaseComponent {

  private get computeEngineBlock() {
    return this.rootElement.$('.//div[@role="button"][.//h2[contains(text(), "Compute Engine")]]');
  }

  constructor() {
    super(() => $('div[role="dialog"][aria-label="Add to this estimate"]'));
  }

  async waitForDisplayed() {
    Logger.debug('Waiting for the "Add to this estimate" modal');
    await expect(this.rootElement).toBeDisplayed();
    return this;
  }

  async openComputeEngineBlock() {
    Logger.info('Selecting the Compute Engine block');
    await this.computeEngineBlock.click();
    await calculatorPage.waitForPageUrl();
    return calculatorPage;
  }
}
