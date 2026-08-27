import { KubernetesEngineModel } from '../steps/models/KubernetesEngineModel';
import { KubernetesEngineModelBuilder } from '../steps/builders/KubernetesEngineModelBuilder';

export interface KubernetesEngineFormCase {
  name: string;
  model: KubernetesEngineModel;
  expectedCost: string;
}

export const kubernetesEngineFormCases: KubernetesEngineFormCase[] = [
  {
    name: 'N1 n1-standard-1 with 3 nodes in us-central1',
    model: KubernetesEngineModelBuilder.instance()
      .withMachineType('n1-standard-1')
      .withNumberOfNodes(3)
      .build(),
    expectedCost: '$180.02',
  },
  {
    name: 'N1 n1-standard-2 with 3 nodes in us-central1',
    model: KubernetesEngineModelBuilder.instance()
      .withMachineType('n1-standard-2')
      .withNumberOfNodes(3)
      .build(),
    expectedCost: '$284.05',
  },
  {
    name: 'N1 n1-standard-1 with 1 node in us-central1',
    model: KubernetesEngineModelBuilder.instance()
      .withMachineType('n1-standard-1')
      .withNumberOfNodes(1)
      .build(),
    expectedCost: '$108.67',
  },
  {
    name: 'N1 n1-standard-4 with 2 nodes in us-central1',
    model: KubernetesEngineModelBuilder.instance()
      .withMachineType('n1-standard-4')
      .withNumberOfNodes(2)
      .build(),
    expectedCost: '$352.40',
  },
];
