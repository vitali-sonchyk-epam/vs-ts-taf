import 'dotenv/config';
import { test, expect } from '../fixtures/testFixture';
import { Tags } from '../constants/Tags';
import { EstimationModule } from '../constants/Enums';
import { kubernetesEngineFormCases } from '../testData/KubernetesEngineTestData';

test.describe('Kubernetes Engine', () => {
  test.beforeEach(async ({ welcomeSteps }) => {
    await welcomeSteps.openAndNavigateToModel(EstimationModule.KubernetesEngine);
  });

  kubernetesEngineFormCases.forEach((formCase) => {
    test(
      `Kubernetes Engine cost for case: ${formCase.name}`,
      { tag: Tags.Smoke },
      async ({ kubernetesEngineSteps }) => {
        await kubernetesEngineSteps.fillForm(formCase.model);
        await expect
          .poll(() => kubernetesEngineSteps.getComputedCost())
          .toEqual(formCase.expectedCost);
      },
    );
  });
});
