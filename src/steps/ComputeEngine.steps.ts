import { expect } from '@playwright/test';
import { ProvisioningType } from '../constants/Enums';
import { ComputeEnginePage } from '../ui/pages/ComputeEngine.page';
import { Logger } from '../utils/Logger';
import { ComputeEngineModel } from './models/ComputeEngineModel';
import { BaseCalculationSteps } from './base/BaseCalculation.steps';

export class ComputeEngineSteps extends BaseCalculationSteps<
  ComputeEngineModel,
  ComputeEnginePage
> {
  constructor() {
    super(new ComputeEnginePage());
  }

  async getTotalUsageLimit(): Promise<number> {
    Logger.info('Getting total usage limit');
    return this.readTotalUsageLimit();
  }

  async setProvisioningModel(provisioningType: ProvisioningType): Promise<void> {
    Logger.info('Setting provisioning model to %s', provisioningType);
    await this.page.provisioningModelContainers.filter({ hasText: provisioningType }).click();
  }

  async fillForm(model: ComputeEngineModel): Promise<void> {
    Logger.info(`Filling compute engine form`);

    if (model.provisioningType != undefined)
      await this.setProvisioningModel(model.provisioningType);

    if (model.machineFamily != undefined)
      await this.page.machineFamilyDropDown.setValue(model.machineFamily);

    if (model.series != undefined) await this.page.seriesDropDown.setValue(model.series);

    if (model.machineType != undefined) await this.setMachineType(model.machineType);

    if (model.region != undefined) await this.page.regionDropDown.setValue(model.region);

    if (model.numberOfInstances != undefined)
      await this.setNumberOfInstances(model.numberOfInstances);
  }

  private async setMachineType(machineType: string): Promise<void> {
    Logger.info(`Setting machine type: ${machineType}`);
    await expect(async () => {
      await this.page.machineTypeDropDown.setValue(machineType);
      await expect(this.page.machineTypeLabel).toHaveText(machineType);
    }).toPass({ timeout: 15_000 });
  }
}
