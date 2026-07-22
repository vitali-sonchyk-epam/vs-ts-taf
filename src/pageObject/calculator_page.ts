import { BasePage } from './BasePage';

// TODO: Add more selectors

export class CalculatorPage extends BasePage {
  constructor() {
    super('/products/calculator');
  }

  welcomeElement() {
    return $$('.Gxwdcd');
  }

  async addEstimateButton() {
    const welcomeElement = await this.welcomeElement();
    return welcomeElement[0]!.$('//span[text()="Add to estimate"]');
  }

  addEstimationModalWindow() {
    return $('[aria-label="Add to this estimate"]');
  }

  configurationBlock() {
    return $('span.U4lDT');
  }
}
