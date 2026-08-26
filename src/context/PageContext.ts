import { Page } from '@playwright/test';

export class PageContext {
  private static currentPage: Page | undefined;

  static set(page: Page): void {
    PageContext.currentPage = page;
  }

  static get(): Page {
    if (!PageContext.currentPage) {
      throw new Error('No active page. Ensure the page-binding auto fixture is registered.');
    }
    return PageContext.currentPage;
  }

  static clear(): void {
    PageContext.currentPage = undefined;
  }
}
