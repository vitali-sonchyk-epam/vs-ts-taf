import { ProvisioningType } from '../../constants/Enums';
import { BaseCalculationModel } from './BaseCalculationModel';

export interface ComputeEngineModel extends BaseCalculationModel {
  machineFamily?: string;
  series?: string;
  machineType?: string;
  region?: string;
  provisioningType?: ProvisioningType;
  numberOfInstances?: number;
  numberOfCPUs?: number;
  amountOfMemory?: number;
}
