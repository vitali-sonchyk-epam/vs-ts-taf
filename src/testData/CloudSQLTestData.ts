import { CloudSQLModel } from '../steps/models/CloudSQLModel';
import { CloudSQLModelBuilder } from '../steps/builders/CloudSQLModelBuilder';
import { CloudSQLServiceType } from '../constants/Enums';

export interface CloudSQLFormCase {
  name: string;
  model: CloudSQLModel;
  expectedCost: string;
}

export const cloudSQLFormCases: CloudSQLFormCase[] = [
  {
    name: 'MySQL single instance in us-central1',
    model: CloudSQLModelBuilder.instance()
      .withServiceType(CloudSQLServiceType.MySQL)
      .withNumberOfInstances(1)
      .build(),
    expectedCost: '$115.62',
  },
  {
    name: 'PostgreSQL single instance in us-central1',
    model: CloudSQLModelBuilder.instance()
      .withServiceType(CloudSQLServiceType.PostgreSQL)
      .withNumberOfInstances(1)
      .build(),
    expectedCost: '$115.62',
  },
  {
    name: 'SQL Server single instance in us-central1',
    model: CloudSQLModelBuilder.instance()
      .withServiceType(CloudSQLServiceType.SQLServer)
      .withNumberOfInstances(1)
      .build(),
    expectedCost: '$593.85',
  },
];
