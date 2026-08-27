import { BasePage } from './Base.page';
import { PageHeader } from '../../components/PageHeader';
import { CalculatorInput } from '../../controls/CalculatorInput';
import { CostDetailsPanel } from '../../components/CostDetailsPanel';

export class BaseCalculatorPage extends BasePage {
  private get pageHeaderLocator() {
    return this.page.locator('div.xJ0wqe');
  }

  get pageHeader(): PageHeader {
    return new PageHeader(this.pageHeaderLocator);
  }

  private get numberOfInstancesInputLocator() {
    return this.page.locator('div.QiFlid');
  }

  get numberOfInstancesInput(): CalculatorInput {
    return new CalculatorInput(this.numberOfInstancesInputLocator);
  }

  private get totalUsageLimitInputLocator() {
    return this.page.locator('div.KDALvb');
  }

  get totalUsageLimitInput(): CalculatorInput {
    return new CalculatorInput(this.totalUsageLimitInputLocator);
  }

  private get costDetailsPanelLocator() {
    return this.page.locator('div.uMSQA');
  }

  get costDetailsPanel(): CostDetailsPanel {
    return new CostDetailsPanel(this.costDetailsPanelLocator);
  }

  constructor(path: string) {
    super(path);
  }
}
