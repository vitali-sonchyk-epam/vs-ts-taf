import { ShopPage } from '../../ui/pages/apple/Shop.page';
import { Logger } from '../../utils/Logger';
import { BaseSteps } from '../base/Base.steps';

export class ShopSteps extends BaseSteps<ShopPage> {
  constructor() {
    super(new ShopPage());
  }

  async navigateToIphoneListing(): Promise<void> {
    Logger.info('Navigating to the iPhone listing');
    await this.page.waitForPageUrl();
    await this.page.iphoneCategoryLinkLocator.click();
  }

  async getIphonePriceText(model: string): Promise<string> {
    Logger.info('Reading displayed price for %s', model);
    return (await this.page.modelPriceLocator(model).innerText()).trim();
  }
}
