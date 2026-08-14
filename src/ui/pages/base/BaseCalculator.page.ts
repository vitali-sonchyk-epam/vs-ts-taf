import { BasePage } from './Base.page';
import { PageHeader } from '../../components/PageHeader';
import { Page } from '@playwright/test';

export class BaseCalculatorPage extends BasePage {
  private get pageHeader(): PageHeader {
    return new PageHeader(this.page.locator('div.xJ0wqe'));
  }

  constructor(page: Page, path: string) {
    super(page, path);
  }

  async getTitle(): Promise<string> {
    return await this.pageHeader.getTitle();
  }
}
