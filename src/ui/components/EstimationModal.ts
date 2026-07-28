import { BaseComponent } from './BaseComponent';
import { CalculatorPage } from '../pages/Calculator.page';

const calculatorPage = new CalculatorPage();

export class EstimationModal extends BaseComponent {

  private get computeEngineBlock() {
    return this.rootElement.$('.//div[@role = "button"][.//h2[contains(text(), "Compute Engine")]]');
  }

  constructor() {
    super(() => $('div[role="dialog"][aria-label="Add to this estimate"]'));
  }

  async openComputeEngineBlock() {
    await this.computeEngineBlock.click();
    await calculatorPage.waitForPageLoad();
    return calculatorPage;
  }
}