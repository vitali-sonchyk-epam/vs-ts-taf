import { ComputeEngineModel } from '../steps/models/ComputeEngineModel';
import { ComputeEngineModelBuilder } from '../steps/builders/ComputeEngineModelBuilder';
import { ProvisioningType } from '../constants/Enums';

export interface ComputeEngineFormCase {
  name: string;
  model: ComputeEngineModel;
  expectedCost: string;
}

export const computeEngineFormCases: ComputeEngineFormCase[] = [
  {
    name: 'Regular N1 n1-standard-1 in us-central1',
    model: ComputeEngineModelBuilder.instance()
      .withMachineFamily('general-purpose')
      .withSeries('n1')
      .withMachineType('n1-standard-1')
      .withProvisioningModel(ProvisioningType.Regular)
      .withNumberOfInstances(1)
      .build(),
    expectedCost: '$35.67',
  },
  {
    name: 'Spot N1 n1-standard-1 scaled to 3 in us-central1',
    model: ComputeEngineModelBuilder.instance()
      .withMachineFamily('general-purpose')
      .withSeries('n1')
      .withMachineType('n1-standard-1')
      .withProvisioningModel(ProvisioningType.Spot)
      .withNumberOfInstances(3)
      .build(),
    expectedCost: '$51.83',
  },
  {
    name: 'Regular N1 n1-standard-2 in us-central1',
    model: ComputeEngineModelBuilder.instance()
      .withMachineFamily('general-purpose')
      .withSeries('n1')
      .withMachineType('n1-standard-2')
      .withProvisioningModel(ProvisioningType.Regular)
      .withNumberOfInstances(1)
      .build(),
    expectedCost: '$70.35',
  },
  {
    name: 'Spot N1 n1-standard-2 scaled to 2 in us-central1',
    model: ComputeEngineModelBuilder.instance()
      .withMachineFamily('general-purpose')
      .withSeries('n1')
      .withMachineType('n1-standard-2')
      .withProvisioningModel(ProvisioningType.Spot)
      .withNumberOfInstances(2)
      .build(),
    expectedCost: '$67.10',
  },
];
