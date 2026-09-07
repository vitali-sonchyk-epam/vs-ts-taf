import { test, expect } from '../fixtures/testFixture';
import { Tags } from '../constants/Tags';
import { PageContext } from '../context/PageContext';
import { EstimationModule } from '../constants/Enums';

test.describe('Screenshots tests', () => {
  test('Welcome page', { tag: Tags.Sanity }, async ({ welcomeSteps }) => {
    await welcomeSteps.open();
    await expect(PageContext.get()).toHaveScreenshot();
  });

  test('Compute Engine page', { tag: Tags.Sanity }, async ({ welcomeSteps }) => {
    await welcomeSteps.openAndNavigateToModel(EstimationModule.ComputeEngine);
    await expect(PageContext.get()).toHaveScreenshot();
  });

  test('Cloud SQL page', { tag: Tags.Sanity }, async ({ welcomeSteps }) => {
    await welcomeSteps.openAndNavigateToModel(EstimationModule.CloudSQL);
    await expect(PageContext.get()).toHaveScreenshot();
  });

  test('Kubernetes Engine page', { tag: Tags.Sanity }, async ({ welcomeSteps }) => {
    await welcomeSteps.openAndNavigateToModel(EstimationModule.KubernetesEngine);
    await expect(PageContext.get()).toHaveScreenshot();
  });
});
