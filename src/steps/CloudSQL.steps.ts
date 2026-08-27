import { CloudSQLPage } from '../ui/pages/CloudSQL.page';
import { CloudSQLModel } from './models/CloudSQLModel';
import { BaseCalculationSteps } from './base/BaseCalculation.steps';
import { Logger } from '../utils/Logger';

export class CloudSQLSteps extends BaseCalculationSteps<CloudSQLModel, CloudSQLPage> {
  constructor() {
    super(new CloudSQLPage());
  }

  async getTotalUsageLimit(instances: number): Promise<number> {
    await this.setNumberOfInstances(instances);
    return this.readTotalUsageLimit();
  }

  async fillForm(model: CloudSQLModel): Promise<void> {
    Logger.info('Filling cloud SQL form');

    if (model.serviceType) await this.page.serviceTypeDropDown.selectOption(model.serviceType);
    if (model.numberOfInstances) await this.setNumberOfInstances(model.numberOfInstances);
  }
}
