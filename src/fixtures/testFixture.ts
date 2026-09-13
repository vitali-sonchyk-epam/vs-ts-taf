import { test as base } from '@playwright/test';
import { ComputeEngineSteps } from '../steps/cloud-calculator/ComputeEngine.steps';
import { CloudSQLSteps } from '../steps/cloud-calculator/CloudSQL.steps';
import { KubernetesEngineSteps } from '../steps/cloud-calculator/KubernetesEngine.steps';
import { WelcomeSteps } from '../steps/cloud-calculator/Welcome.steps';
import { AddToEstimateModalSteps } from '../steps/cloud-calculator/AddToEstimateModal.steps';
import { PageContext } from '../context/PageContext';

type Fixtures = {
  bindPage: void;
  welcomeSteps: WelcomeSteps;
  computeEngineSteps: ComputeEngineSteps;
  cloudSQLSteps: CloudSQLSteps;
  kubernetesEngineSteps: KubernetesEngineSteps;
  addToEstimateModalSteps: AddToEstimateModalSteps;
};

export const test = base.extend<Fixtures>({
  bindPage: [
    async ({ page }, use) => {
      PageContext.set(page);
      await use();
      PageContext.clear();
    },
    { auto: true },
  ],
  welcomeSteps: async ({ bindPage: _bindPage }, use) => {
    await use(new WelcomeSteps());
  },
  computeEngineSteps: async ({ bindPage: _bindPage }, use) => {
    await use(new ComputeEngineSteps());
  },
  cloudSQLSteps: async ({ bindPage: _bindPage }, use) => {
    await use(new CloudSQLSteps());
  },
  kubernetesEngineSteps: async ({ bindPage: _bindPage }, use) => {
    await use(new KubernetesEngineSteps());
  },
  addToEstimateModalSteps: async ({ bindPage: _bindPage }, use) => {
    await use(new AddToEstimateModalSteps());
  },
});

export { expect } from '@playwright/test';
