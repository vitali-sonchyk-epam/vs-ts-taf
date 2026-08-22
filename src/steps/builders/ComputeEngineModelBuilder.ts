import { ComputeEngineModel } from '../models/ComputeEngineModel';
import { ProvisioningType } from '../../constants/Enums';

export class ComputeEngineModelBuilder {
  private readonly model: ComputeEngineModel;

  constructor() {
    this.model = {};
  }

  static instance = () => new ComputeEngineModelBuilder();

  withMachineFamily(machineFamily: string): this {
    this.model.machineFamily = machineFamily;
    return this;
  }

  withSeries(series: string): this {
    this.model.series = series;
    return this;
  }

  withMachineType(machineType: string): this {
    this.model.machineType = machineType;
    return this;
  }

  withRegion(region: string): this {
    this.model.region = region;
    return this;
  }

  withProvisioningModel(provisioningType: ProvisioningType): this {
    this.model.provisioningType = provisioningType;
    return this;
  }

  withNumberOfInstances(numberOfInstances: number): this {
    this.model.numberOfInstances = numberOfInstances;
    return this;
  }

  withNumberOfCPUs(numberOfCPUs: number): this {
    this.model.numberOfCPUs = numberOfCPUs;
    return this;
  }

  withAmountOfMemory(amountOfMemory: number): this {
    this.model.amountOfMemory = amountOfMemory;
    return this;
  }

  build = (): ComputeEngineModel => this.model;
}
