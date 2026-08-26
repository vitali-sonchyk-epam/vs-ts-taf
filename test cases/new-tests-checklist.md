# Test Cases — Google Cloud Pricing Calculator: Compute Engine, Cloud SQL & Kubernetes Engine Estimate Suites

Functional test-case checklist for the Google Cloud Pricing Calculator estimate flows,
covering the **Compute Engine**, **Cloud SQL**, and **Kubernetes Engine** suites. Each test
starts from the calculator landing page, navigates to the target module via the
"Add to this estimate" flow, performs the described interaction on the estimate form, and
asserts either the computed **total usage limit**, the estimated **monthly cost**, or the
**page title**.

- **Scope:** 19 cases — Compute Engine (8), Cloud SQL (7), Kubernetes Engine (4).
- **Preconditions:** calculator landing page reachable; cookies consent handled; default
  region `us-central1`.
- **Columns:** `Name` (test identifier), `Description` (steps/inputs), `Expected Result`
  (assertion), `Module` (suite under test).

## Compute Engine

| Name | Description | Expected Result | Module |
| --- | --- | --- | --- |
| Total usage limit for 1 instance | Set number of instances to 1 and read the total usage limit | Total usage limit equals `730` | Compute Engine |
| Total usage limit for 2 instances | Set number of instances to 2 and read the total usage limit | Total usage limit equals `1460` | Compute Engine |
| Total usage limit for 5 instances | Set number of instances to 5 and read the total usage limit | Total usage limit equals `3650` | Compute Engine |
| Regular N1 n1-standard-1 in us-central1 | Fill form with general-purpose family, N1 series, n1-standard-1 machine type, Regular provisioning, 1 instance | Estimated cost is `$35.67` | Compute Engine |
| Spot N1 n1-standard-1 scaled to 3 in us-central1 | Fill form with general-purpose family, N1 series, n1-standard-1 machine type, Spot provisioning, 3 instances | Estimated cost is `$51.83` | Compute Engine |
| Regular N1 n1-standard-2 in us-central1 | Fill form with general-purpose family, N1 series, n1-standard-2 machine type, Regular provisioning, 1 instance | Estimated cost is `$70.35` | Compute Engine |
| Spot N1 n1-standard-2 scaled to 2 in us-central1 | Fill form with general-purpose family, N1 series, n1-standard-2 machine type, Spot provisioning, 2 instances | Estimated cost is `$67.10` | Compute Engine |
| Compute Engine page has appropriate title | Navigate to the Compute Engine estimate form and read the page title | Page title is `Compute Engine` | Compute Engine |

## Cloud SQL

| Name | Description | Expected Result | Module |
| --- | --- | --- | --- |
| Total usage limit for 1 instance | Set number of instances to 1 and read the total usage limit | Total usage limit equals `730` | Cloud SQL |
| Total usage limit for 2 instances | Set number of instances to 2 and read the total usage limit | Total usage limit equals `1460` | Cloud SQL |
| Total usage limit for 5 instances | Set number of instances to 5 and read the total usage limit | Total usage limit equals `3650` | Cloud SQL |
| MySQL single instance in us-central1 | Fill form with MySQL service type, 1 instance | Estimated cost is `$115.62` | Cloud SQL |
| PostgreSQL single instance in us-central1 | Fill form with PostgreSQL service type, 1 instance | Estimated cost is `$115.62` | Cloud SQL |
| SQL Server single instance in us-central1 | Fill form with SQL Server service type, 1 instance | Estimated cost is `$593.85` | Cloud SQL |
| Cloud SQL page has appropriate title | Navigate to the Cloud SQL estimate form and read the page title | Page title is `Cloud SQL` | Cloud SQL |

## Kubernetes Engine

| Name | Description | Expected Result | Module |
| --- | --- | --- | --- |
| N1 n1-standard-1 with 3 nodes in us-central1 | Fill form with n1-standard-1 machine type, 3 nodes | Estimated cost is `$180.02` | Kubernetes Engine |
| N1 n1-standard-2 with 3 nodes in us-central1 | Fill form with n1-standard-2 machine type, 3 nodes | Estimated cost is `$284.05` | Kubernetes Engine |
| N1 n1-standard-1 with 1 node in us-central1 | Fill form with n1-standard-1 machine type, 1 node | Estimated cost is `$108.67` | Kubernetes Engine |
| N1 n1-standard-4 with 2 nodes in us-central1 | Fill form with n1-standard-4 machine type, 2 nodes | Estimated cost is `$352.40` | Kubernetes Engine |
