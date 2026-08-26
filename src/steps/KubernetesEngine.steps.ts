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

    if (model.machineFamily)
      await this.page.machineFamilyDropDown.selectOption(model.machineFamily);
    if (model.series) await this.page.seriesDropDown.selectOption(model.series);
    if (model.machineType) await this.setMachineType(model.machineType);
    if (model.numberOfNodes) await this.setNumberOfInstances(model.numberOfNodes);
  }

  private async setMachineType(machineType: string): Promise<void> {
    Logger.info(`Setting machine type: ${machineType}`);
    await expect(async () => {
      await this.page.machineTypeDropDown.selectOption(machineType);
      await expect(this.page.machineTypeLabel).toHaveText(machineType);
    }).toPass({ timeout: 15_000 });
  }
}
