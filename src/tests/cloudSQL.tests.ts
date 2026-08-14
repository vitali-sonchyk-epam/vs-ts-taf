import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { WelcomePage } from '../ui/pages/Welcome.page';
import { CloudSQLPage } from '../ui/pages/CloudSQL.page';
import { Tags } from '../constants/Tags';

test.describe('Cloud SQL', () => {
  const usageLimitCases = [
    { instances: 1, expectedUsageLimit: 730 },
    { instances: 2, expectedUsageLimit: 1460 },
    { instances: 5, expectedUsageLimit: 3650 },
  ];

  let cloudSQLPage: CloudSQLPage;

  test.beforeEach(async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.open();
    cloudSQLPage = await welcomePage.openCloudSQL();
  });

  usageLimitCases.forEach((usageLimit) => {
    test(
      `Cloud SQL Total usage limit for ${usageLimit.instances} is ${usageLimit.expectedUsageLimit}`,
      { tag: Tags.Smoke },
      async () => {
        await cloudSQLPage.setNumberOfInstances(usageLimit.instances);
        const actualUsageLimit = await cloudSQLPage.getTotalUsageLimit();
        expect(actualUsageLimit).toEqual(usageLimit.expectedUsageLimit);
      },
    );
  });

  test('Cloud SQL page has appropriate title', { tag: Tags.Extended }, async () => {
    const title = await cloudSQLPage.getTitle();
    expect(title).toBe('Cloud SQL');
  });
});
