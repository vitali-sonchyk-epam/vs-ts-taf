import { WelcomePage } from '../ui/pages/Welcome.page';
import { Logger } from '../utils/Logger';

export class AddToEstimateModalSteps {
  private welcomePage: WelcomePage;

  constructor() {
    this.welcomePage = new WelcomePage();
  }

  async open(): Promise<void> {
    Logger.info('Opening the calculator page');
    await this.welcomePage.open();
  }

  async isAddToEstimateButtonVisible(): Promise<boolean> {
    return this.welcomePage.addToEstimateButton.isVisible();
  }

  async openModal(): Promise<void> {
    Logger.info('Clicking "Add to estimate" button');
    await this.welcomePage.addToEstimateButton.click();
    await this.welcomePage.estimationModal.waitForDisplayed();
  }

  async closeModal(): Promise<void> {
    Logger.info('Clicking the "Close dialog" button');
    await this.welcomePage.estimationModal.close();
  }

  async isModalVisible(): Promise<boolean> {
    return this.welcomePage.estimationModal.isDisplayed();
  }

  async isCloseButtonVisible(): Promise<boolean> {
    return this.welcomePage.estimationModal.closeButton.isVisible();
  }

  async getCloseButtonTooltipText(): Promise<string> {
    Logger.info('Hovering over the "Close dialog" button to reveal its tooltip');
    return this.welcomePage.estimationModal.getCloseButtonTooltipText();
  }

  async isHeadingVisible(): Promise<boolean> {
    return this.welcomePage.estimationModal.heading.isVisible();
  }

  async getHeadingText(): Promise<string> {
    return this.welcomePage.estimationModal.getHeadingText();
  }

  async isSearchIconVisible(): Promise<boolean> {
    return this.welcomePage.estimationModal.searchIcon.isVisible();
  }

  async isSearchInputVisible(): Promise<boolean> {
    return this.welcomePage.estimationModal.searchInput.isVisible();
  }

  async getSearchInputValue(): Promise<string> {
    return this.welcomePage.estimationModal.getSearchInputValue();
  }

  async isSortControlVisible(): Promise<boolean> {
    return this.welcomePage.estimationModal.sortControl.isVisible();
  }

  async getSortControlText(): Promise<string> {
    return this.welcomePage.estimationModal.getSortControlText();
  }

  async getProductCardCount(): Promise<number> {
    return this.welcomePage.estimationModal.getProductCardCount();
  }

  async getFirstProductCardName(): Promise<string> {
    return this.welcomePage.estimationModal.getProductCardName(0);
  }

  async isFirstProductCardButtonRole(): Promise<boolean> {
    return this.welcomePage.estimationModal.isProductCardButtonRole(0);
  }

  async getProductCardNames(count: number): Promise<string[]> {
    Logger.info('Reading the first %s product card names', count);
    const names: string[] = [];
    for (let index = 0; index < count; index++) {
      names.push(await this.welcomePage.estimationModal.getProductCardName(index));
    }
    return names;
  }
}
