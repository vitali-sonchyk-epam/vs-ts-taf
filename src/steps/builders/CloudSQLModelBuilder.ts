import { CloudSQLModel } from '../models/CloudSQLModel';
import { CloudSQLServiceType } from '../../constants/Enums';

export class CloudSQLModelBuilder {
  private readonly model: CloudSQLModel;

  constructor() {
    this.model = {};
  }

  static instance = () => new CloudSQLModelBuilder();

  withServiceType(serviceType: CloudSQLServiceType): this {
    this.model.serviceType = serviceType;
    return this;
  }

  withNumberOfInstances(numberOfInstances: number): this {
    this.model.numberOfInstances = numberOfInstances;
    return this;
  }

  build = (): CloudSQLModel => this.model;
}
