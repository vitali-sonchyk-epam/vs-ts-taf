import { Locator } from '@playwright/test';
import { BaseCalculatorPage } from './base/BaseCalculator.page';
import { EstimationModal } from '../components/EstimationModal';

export class WelcomePage extends BaseCalculatorPage {
  get estimationModal(): EstimationModal {
    return new EstimationModal(this.page);
  }

  get addToEstimateButton(): Locator {
    return this.page.locator('.Gxwdcd button');
  }

  get languageSelectorLocator(): Locator {
    return this.page.locator('div.VfPpkd-aPP78e');
  }

  get allLanguagesOptionsLocator(): Locator {
    return this.page.locator('li.MCs1Pd');
  }

  get allHeaderLabels(): Locator {
    return this.page.locator('div.ZUAiPc a.nKZVnd');
  }

  constructor() {
    super('/products/calculator');
  }

  async openLanguageSelector(): Promise<void> {
    await this.languageSelectorLocator.click();
  }

  async selectLanguage(selectorLabel: string): Promise<void> {
    await this.allLanguagesOptionsLocator.filter({ hasText: selectorLabel }).click();
  }

  async getAllHeaderLabels(): Promise<string[]> {
    const labels = await this.allHeaderLabels.filter({ visible: true }).allInnerTexts();
    // The first anchor is the logo and has no text.
    return labels.map((label) => label.trim()).filter(Boolean);
  }
}
