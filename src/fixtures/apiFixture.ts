import { test as base } from '@playwright/test';
import { ApiContext } from '../context/ApiContext';
import { apiConfig } from '../config/api.config';
import { ActivitiesService } from '../api/services/Activities.service';

type ApiFixtures = {
  bindApiRequest: void;
  activitiesService: ActivitiesService;
};

export const test = base.extend<ApiFixtures>({
  bindApiRequest: [
    async ({ playwright }, use) => {
      const requestContext = await playwright.request.newContext({
        baseURL: apiConfig.baseUrl,
        extraHTTPHeaders: apiConfig.defaultHeaders,
        timeout: apiConfig.timeout,
      });
      ApiContext.set(requestContext);
      await use();
      ApiContext.clear();
      await requestContext.dispose();
    },
    { auto: true },
  ],
  activitiesService: async ({ bindApiRequest: _bindApiRequest }, use) => {
    await use(new ActivitiesService());
  },
});

export { expect } from '@playwright/test';
