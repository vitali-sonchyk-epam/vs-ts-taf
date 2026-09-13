import { Logger } from '../../../utils/Logger';
import { BasePage } from './Base.page';

export class BaseNavigationalPage extends BasePage {
  constructor(protected readonly path: string) {
    super(path);
  }

  public async navigate(): Promise<void> {
    Logger.info('Opening page: %s', this.path);
    await this.page.goto(this.path);
    await this.waitForPageUrl();
  }
}
