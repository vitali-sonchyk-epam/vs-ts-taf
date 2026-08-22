import { expect } from '@playwright/test';
import { KubernetesEnginePage } from '../ui/pages/KubernetesEngine.page';
import { KubernetesEngineModel } from './models/KubernetesEngineModel';
import { BaseCalculationSteps } from './base/BaseCalculation.steps';
import { Logger } from '../utils/Logger';

export class KubernetesEngineSteps extends BaseCalculationSteps<
  KubernetesEngineModel,
  KubernetesEnginePage
> {
  constructor() {
    super(new KubernetesEnginePage());
  }

  async fillForm(model: KubernetesEngineModel): Promise<void> {
    Logger.info('Filling Kubernetes Engine form');

    if (model.machineFamily != undefined)
      await this.page.machineFamilyDropDown.setValue(model.machineFamily);

    if (model.series != undefined) await this.page.seriesDropDown.setValue(model.series);

    if (model.machineType != undefined) await this.setMachineType(model.machineType);

    if (model.numberOfNodes != undefined) await this.setNumberOfInstances(model.numberOfNodes);
  }

  private async setMachineType(machineType: string): Promise<void> {
    Logger.info(`Setting machine type: ${machineType}`);
    await expect(async () => {
      await this.page.machineTypeDropDown.setValue(machineType);
      await expect(this.page.machineTypeLabel).toHaveText(machineType);
    }).toPass({ timeout: 15_000 });
  }
}
