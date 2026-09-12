import { BasePage } from '../../ui/pages/base/Base.page';

export abstract class BaseSteps<TPage extends BasePage> {
  protected constructor(protected readonly page: TPage) {}

  async openPage(): Promise<void> {
    await this.page.open();
  }
}
