import "dotenv/config";
import { WelcomePage } from "../../ui/pages/Welcome.page";
const welcomePage = new WelcomePage();

describe('Cloud Calculator', () => {
  const usageLimitCases = [
    { instances: 1, expectedUsageLimit: 730 },
    { instances: 2, expectedUsageLimit: 1460 },
    { instances: 5, expectedUsageLimit: 3650 },
  ];

  usageLimitCases.forEach(({ instances, expectedUsageLimit }) => {
    it(`Total usage limit for ${instances} instance(s) is ${expectedUsageLimit}`, async () => {
      await welcomePage.open();

      const  calculatorPage = await welcomePage.openComputeEngine();
      await calculatorPage.setNumberOfInstances(instances);
      const usageLimit = await calculatorPage.getTotalUsageLimit();
      expect(usageLimit).toEqual(expectedUsageLimit);
    });
  }); 
});
