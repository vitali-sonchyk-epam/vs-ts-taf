import 'dotenv/config';
import { test, expect } from '../fixtures/testFixture';
import { Tags } from '../constants/Tags';
import { EstimationModule } from '../constants/Enums';
import { cloudSQLFormCases } from '../testData/CloudSQLTestData';

test.describe('Cloud SQL', () => {
  const usageLimitCases = [
    { instances: 1, expectedUsageLimit: 730 },
    { instances: 2, expectedUsageLimit: 1460 },
    { instances: 5, expectedUsageLimit: 3650 },
  ];

  test.beforeEach(async ({ welcomeSteps }) => {
    await welcomeSteps.openAndNavigateToModel(EstimationModule.CloudSQL);
  });

  usageLimitCases.forEach((usageLimit) => {
    test(
      `Cloud SQL Total usage limit for ${usageLimit.instances} is ${usageLimit.expectedUsageLimit}`,
      { tag: Tags.Smoke },
      async ({ cloudSQLSteps }) => {
        const actualUsageLimit = await cloudSQLSteps.getTotalUsageLimit(usageLimit.instances);
        expect(actualUsageLimit).toEqual(usageLimit.expectedUsageLimit);
      },
    );
  });

  cloudSQLFormCases.forEach((formCase) => {
    test(
      `Cloud SQL cost for case: ${formCase.name}`,
      { tag: Tags.Smoke },
      async ({ cloudSQLSteps }) => {
        await cloudSQLSteps.fillForm(formCase.model);
        await expect.poll(() => cloudSQLSteps.getComputedCost()).toEqual(formCase.expectedCost);
      },
    );
  });

  test(
    'Cloud SQL page has appropriate title',
    { tag: Tags.Extended },
    async ({ cloudSQLSteps }) => {
      const title = await cloudSQLSteps.getTitle();
      expect(title).toBe('Cloud SQL');
    },
  );
});
