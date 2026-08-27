export enum ProvisioningType {
  Regular = 'Regular',
  Spot = 'Spot (Preemptible VM)',
}

export enum CloudSQLServiceType {
  MySQL = 'MySQL',
  PostgreSQL = 'PostgreSQL',
  SQLServer = 'SQL Server',
}

export enum EstimationModule {
  ComputeEngine = 'Compute Engine',
  CloudSQL = 'Cloud SQL',
  KubernetesEngine = 'Kubernetes Engine',
}
