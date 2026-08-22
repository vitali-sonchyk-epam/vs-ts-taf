import { BasePage } from './Base.page';
import { PageHeader } from '../../components/PageHeader';
import { CalculatorInput } from '../../controls/CalculatorInput';
import { CostDetailsPanel } from '../../components/CostDetailsPanel';

export class BaseCalculatorPage extends BasePage {
  get pageHeader(): PageHeader {
    return new PageHeader(this.page.locator('div.xJ0wqe'));
  }

  get numberOfInstancesInput(): CalculatorInput {
    return new CalculatorInput(this.page.locator('div.QiFlid'));
  }

  get totalUsageLimitInput(): CalculatorInput {
    return new CalculatorInput(this.page.locator('div.KDALvb'));
  }

  get costDetailsPanel(): CostDetailsPanel {
    return new CostDetailsPanel(this.page.locator('div.uMSQA'));
  }

  constructor(path: string) {
    super(path);
  }
}
