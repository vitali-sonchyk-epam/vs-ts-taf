import { test, expect } from '../fixtures/downloadFixture';
import { Tags } from '../constants/Tags';
import { EstimationModule, ProvisioningType } from '../constants/Enums';
import { ComputeEngineModelBuilder } from '../steps/builders/ComputeEngineModelBuilder';
import { parseNumber } from '../utils/number';

test.describe('Cost report download', () => {
  test.beforeEach(async ({ welcomeSteps }) => {
    await welcomeSteps.openAndNavigateToModel(EstimationModule.ComputeEngine);
  });

  test(
    'Download compute engine report. Content validation',
    { tag: Tags.Extended },
    async ({ computeEngineSteps, downloads }) => {
      const expectedCost = '$56.70';
      const expectedService = 'Instances (Compute Engine)';
      const model = ComputeEngineModelBuilder.instance()
        .withMachineFamily('general-purpose')
        .withSeries('n1')
        .withMachineType('n1-standard-1')
        .withProvisioningModel(ProvisioningType.Spot)
        .withNumberOfInstances(3)
        .build();

      await computeEngineSteps.fillForm(model);
      await expect.poll(() => computeEngineSteps.getComputedCost()).toEqual(expectedCost);

      const form = await computeEngineSteps.readForm();
      const totalUsageTime = await computeEngineSteps.getTotalUsageLimit();
      const report = await computeEngineSteps.downloadReport();
      downloads.push(report.filePath);

      expect(report.vmRows.length).toBeGreaterThan(0);
      expect(report.vmRows.every((row) => row.serviceDisplayName === expectedService)).toBe(true);
      expect(report.vmRows.every((row) => form.region!.includes(row.region))).toBe(true);
      expect(report.vmRows.every((row) => row.name.includes(form.series!.toUpperCase()))).toBe(
        true,
      );
      expect(parseNumber(report.coreRow.quantity)).toEqual(totalUsageTime);
      expect(`$${parseNumber(report.totalPrice).toFixed(2)}`).toEqual(expectedCost);
    },
  );
});
