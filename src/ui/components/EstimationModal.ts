import { Locator, Page, expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { Logger } from '../../utils/Logger';

export class EstimationModal extends BaseComponent {
  constructor(page: Page) {
    super(page.locator('div[role="dialog"][aria-label="Add to this estimate"]'));
  }

  get closeButton(): Locator {
    return this.rootElement.getByRole('button', { name: 'Close dialog' });
  }

  get heading(): Locator {
    return this.rootElement.getByRole('heading', { level: 3 });
  }

  get searchIcon(): Locator {
    return this.rootElement.locator('i.google-material-icons', { hasText: 'search' });
  }

  get searchInput(): Locator {
    return this.rootElement.getByRole('textbox', { name: 'Search by product name' });
  }

  get sortControl(): Locator {
    return this.rootElement.getByRole('button', { name: 'Sort by' });
  }

  get productCards(): Locator {
    return this.rootElement.locator('div[role="button"]:has(h2)');
  }

  private get closeButtonTooltip(): Locator {
    return this.rootElement.page().locator('div[role="tooltip"]', { hasText: 'Close dialog' });
  }

  async openEstimateBlock(label: string) {
    Logger.info('Selecting the estimate block: %s', label);
    const estimateBlock = this.getEstimateBlock(label);
    await estimateBlock.click();
    await expect(this.rootElement).toBeHidden();
  }

  async isDisplayed(): Promise<boolean> {
    return this.rootElement.isVisible();
  }

  async getHeadingText(): Promise<string> {
    return (await this.heading.textContent()) ?? '';
  }

  async getSearchInputValue(): Promise<string> {
    return this.searchInput.inputValue();
  }

  async getSortControlText(): Promise<string> {
    return (await this.sortControl.textContent()) ?? '';
  }

  async getProductCardCount(): Promise<number> {
    return this.productCards.count();
  }

  async getProductCardName(index: number): Promise<string> {
    return (await this.productCards.nth(index).locator('h2').textContent()) ?? '';
  }

  async isProductCardButtonRole(index: number): Promise<boolean> {
    return (await this.productCards.nth(index).getAttribute('role')) === 'button';
  }

  async hoverCloseButton(): Promise<void> {
    await this.closeButton.hover();
  }

  async getCloseButtonTooltipText(): Promise<string> {
    await this.hoverCloseButton();
    return (await this.closeButtonTooltip.textContent()) ?? '';
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }

  private getEstimateBlock(label: string): Locator {
    return this.rootElement.locator(`//div[@role="button"][.//h2[normalize-space(.)="${label}"]]`);
  }
}
