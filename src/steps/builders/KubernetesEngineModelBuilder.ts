import { KubernetesEngineModel } from '../models/KubernetesEngineModel';

export class KubernetesEngineModelBuilder {
  private readonly model: KubernetesEngineModel;

  constructor() {
    this.model = {};
  }

  static instance = () => new KubernetesEngineModelBuilder();

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

  withNumberOfNodes(numberOfNodes: number): this {
    this.model.numberOfNodes = numberOfNodes;
    return this;
  }

  build = (): KubernetesEngineModel => this.model;
}
