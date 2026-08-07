import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { WelcomePage } from '../ui/pages/Welcome.page';
import { ComputeEnginePage } from '../ui/pages/ComputeEngine.page';
import { Tags } from '../constants/tags';

test.describe('Compute Engine', () => {
  const usageLimitCases = [
    { instances: 1, expectedUsageLimit: 730 },
    { instances: 2, expectedUsageLimit: 1460 },
    { instances: 5, expectedUsageLimit: 3650 },
  ];

  let computeEnginePage: ComputeEnginePage;

  test.beforeEach(async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.open();
    computeEnginePage = await welcomePage.openComputeEngine();
  })

  usageLimitCases.forEach(usageLimit => {
    test(`Compute Engine Total usage limit for ${usageLimit.instances} is ${usageLimit.expectedUsageLimit}`,
      { tag: Tags.Smoke },
      async () => {
        await computeEnginePage.setNumberOfInstances(usageLimit.instances);
        const actualUsageLimit = await computeEnginePage.getTotalUsageLimit();
        expect(actualUsageLimit).toEqual(usageLimit.expectedUsageLimit);
      }
    )
  })

  test('Compute Engine page has appropriate title',
    { tag: Tags.Extended },
    async () => {
      const title = await computeEnginePage.getTitle();
      expect(title).toBe('Compute Engine');
    }
  )
});
