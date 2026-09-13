import { Locator } from '@playwright/test';
import { EstimationModal } from '../../components/EstimationModal';
import { BaseNavigationalPage } from '../base/BaseNavigational.page';

export class WelcomePage extends BaseNavigationalPage {
  get estimationModal(): EstimationModal {
    return new EstimationModal(this.page);
  }

  get addToEstimateButton(): Locator {
    return this.page.locator('.Gxwdcd button');
  }

  get languageSelectorLocator(): Locator {
    return this.page.locator('div.VfPpkd-aPP78e');
  }

  languageOptionLocator(languageCode: string): Locator {
    return this.page.locator(`li.MCs1Pd[data-value="${languageCode}"]`);
  }

  get allHeaderLabels(): Locator {
    return this.page.locator('div.ZUAiPc a.nKZVnd');
  }

  constructor() {
    super('/products/calculator');
  }

  async open() {
    await this.navigate();
    await this.confirmCookies();
  }

  async openLanguageSelector(): Promise<void> {
    await this.languageSelectorLocator.click();
  }

  async selectLanguage(languageCode: string): Promise<void> {
    await this.languageOptionLocator(languageCode).click();
  }

  async getAllHeaderLabels(): Promise<Array<string>> {
    const labels = await this.allHeaderLabels
      .filter({ visible: true })
      .filter({ hasText: /\S+/ })
      .allInnerTexts();
    return labels.map((label) => label.trim());
  }
}
