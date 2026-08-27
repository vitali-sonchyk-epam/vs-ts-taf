import 'dotenv/config';
import { test, expect } from '../fixtures/testFixture';
import { Tags } from '../constants/Tags';
import { EstimationModule } from '../constants/Enums';
import { computeEngineFormCases } from '../testData/ComputeEngineTestData';

test.describe('Compute Engine', () => {
  const usageLimitCases = [
    { instances: 1, expectedUsageLimit: 730 },
    { instances: 2, expectedUsageLimit: 1460 },
    { instances: 5, expectedUsageLimit: 3650 },
  ];

  test.beforeEach(async ({ welcomeSteps }) => {
    await welcomeSteps.openAndNavigateToModel(EstimationModule.ComputeEngine);
  });

  usageLimitCases.forEach((usageLimit) => {
    test(
      `Compute Engine Total usage limit for ${usageLimit.instances} is ${usageLimit.expectedUsageLimit}`,
      { tag: Tags.Smoke },
      async ({ computeEngineSteps }) => {
        await computeEngineSteps.setNumberOfInstances(usageLimit.instances);
        const actualUsageLimit = await computeEngineSteps.getTotalUsageLimit();
        expect(actualUsageLimit).toEqual(usageLimit.expectedUsageLimit);
      },
    );
  });

  computeEngineFormCases.forEach((formCase) => {
    test(
      `Compute engine cost for case: ${formCase.name}`,
      { tag: Tags.Smoke },
      async ({ computeEngineSteps }) => {
        await computeEngineSteps.fillForm(formCase.model);
        await expect
          .poll(() => computeEngineSteps.getComputedCost())
          .toEqual(formCase.expectedCost);
      },
    );
  });

  test(
    'Compute Engine page has appropriate title',
    { tag: Tags.Extended },
    async ({ computeEngineSteps }) => {
      const title = await computeEngineSteps.getTitle();
      expect(title).toBe('Compute Engine');
    },
  );
});
