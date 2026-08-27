import { BaseCalculationModel } from './BaseCalculationModel';

export interface KubernetesEngineModel extends BaseCalculationModel {
  machineFamily?: string;
  series?: string;
  machineType?: string;
  numberOfNodes?: number;
}
