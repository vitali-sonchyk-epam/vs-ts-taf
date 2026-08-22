import { test as base } from '@playwright/test';
import { ComputeEngineSteps } from '../steps/ComputeEngine.steps';
import { CloudSQLSteps } from '../steps/CloudSQL.steps';
import { KubernetesEngineSteps } from '../steps/KubernetesEngine.steps';
import { WelcomeSteps } from '../steps/Welcome.steps';
import { PageContext } from '../context/PageContext';

type Fixtures = {
  bindPage: void;
  welcomeSteps: WelcomeSteps;
  computeEngineSteps: ComputeEngineSteps;
  cloudSQLSteps: CloudSQLSteps;
  kubernetesEngineSteps: KubernetesEngineSteps;
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
});

export { expect } from '@playwright/test';
