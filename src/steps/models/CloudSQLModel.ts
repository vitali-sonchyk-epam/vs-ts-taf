import { CloudSQLServiceType } from '../../constants/Enums';
import { BaseCalculationModel } from './BaseCalculationModel';

export interface CloudSQLModel extends BaseCalculationModel {
  serviceType?: CloudSQLServiceType;
  numberOfInstances?: number;
}
