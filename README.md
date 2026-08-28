# vs-ts-taf — Playwright + TypeScript Test Automation Framework

End-to-end UI test automation for the [Google Cloud Pricing Calculator](https://cloud.google.com/products/calculator), built with **Playwright**, **TypeScript**, and a layered Page Object / Steps architecture: page objects expose element getters, while step classes drive all interaction and orchestration and are injected into tests through Playwright fixtures.

> **Disclaimer**
> This is an educational project. Do not consider the current solutions as the only correct ones or as production-ready.

## Tech stack

| Area | Tool |
| --- | --- |
| Test runner | Playwright Test (`@playwright/test`) |
| Language | TypeScript |
| Assertions | Playwright's built-in `expect` (auto-retrying web-first assertions) |
| Reporting | Configurable via `REPORTER` env var — see [Reporting](#reporting) below |
| Logging | `winston`, with optional Allure step reporting (`allure-js-commons`) when `REPORTER=allure` |
| Linting/formatting | ESLint (flat config, `typescript-eslint` + `eslint-plugin-playwright`) and Prettier |
| Config/env | `dotenv` |

## Prerequisites

- **Node.js >= 18.20.0** (see `engines` in `package.json`)
- **Java** (only required to generate/serve Allure reports)

## Getting started

```powershell
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install

# 3. Create your local .env from the template and adjust values
copy .env.example .env

# 4. Run the tests
npm test
```

## Running tests

```powershell
# Run everything (uses playwright.config.ts "testDir"/"testMatch")
npm test

# Run only the smoke-tagged tests
npm run test:smoke

# Run in headed mode (visible browser)
npm run test:headed

# Run a single spec file
npx playwright test src/tests/computeEngine.tests.ts

# Filter by test title
npx playwright test -g "Total usage limit for 1"

# Run only the Cloud SQL suite
npx playwright test src/tests/cloudSQL.tests.ts

# Run only the Kubernetes Engine suite
npx playwright test src/tests/kubernetesEngine.tests.ts

# Run only the cost report download suite
npx playwright test src/tests/costReportDownload.tests.ts

# Open the interactive UI mode
npx playwright test --ui
```

## Linting and formatting

```powershell
# Check for lint errors
npm run lint

# Auto-fix lint issues where possible
npm run lint:fix

# Check formatting without writing changes
npm run format:check

# Reformat the codebase with Prettier
npm run format

# Type-check without emitting output
npm run typecheck
```

## Reporting

The active reporter is chosen at runtime by the `REPORTER` environment variable (see `.env.example`); only one reporter runs per invocation:

| `REPORTER` value | What it produces |
| --- | --- |
| `html` (default) | Playwright's built-in HTML report, including trace/screenshot/video for failed tests |
| `list` | Plain console output only |
| `allure` | Allure results in `allure-results/`, plus Allure step logs from `Logger` |
| `junit` | A JUnit XML file (`test-results/junit/results.xml` by default, or `JUNIT_OUTPUT_FILE`) |
| `reportportal` | Uploads the run to Report Portal, using the `RP_*` variables from `.env` |

```powershell
# View the Playwright HTML report (after a REPORTER=html run)
npm run html:report

# Generate a static Allure report from the latest allure-results (after a REPORTER=allure run)
npm run report:generate

# Open the generated static Allure report
npm run report:open

# Or serve an interactive Allure report directly from the raw results
npx allure serve allure-results

# Clean out old Allure results / Playwright HTML report before a fresh run
npm run report:clean
npm run pwreport:clean
```

## Project structure

```
src/
  config/
    logger.config.ts             # Winston logger instance (level from LOG_LEVEL)
  context/
    PageContext.ts               # Holds the active Playwright Page for the current test
  fixtures/
    testFixture.ts               # Extends base test with step fixtures + auto page binding
    downloadFixture.ts           # Extends testFixture with a `downloads` list, cleaned up after each test
  ui/
    BaseElement.ts               # Base element wrapper (root Locator, waitForDisplayed)
    pages/
      base/
        Base.page.ts             # Shared page behaviour (open, cookies, waitForPageUrl)
        BaseCalculator.page.ts   # Shared calculator-page element getters
      Welcome.page.ts            # Calculator landing page (estimate modal + button getters)
      ComputeEngine.page.ts      # Compute Engine form element getters
      CloudSQL.page.ts           # Cloud SQL form element getters
      KubernetesEngine.page.ts   # Kubernetes Engine form element getters
    components/                  # Reusable read-oriented UI components
      BaseComponent.ts           # Base component (extends BaseElement)
      EstimationModal.ts         # "Add to this estimate" modal
      CostDetailsPanel.ts        # Estimated cost panel
      PageHeader.ts              # Page title (<h1>) component
    controls/                    # Interactive input controls
      BaseControl.ts             # Base control (getValue/setValue contract)
      CalculatorInput.ts         # Numeric input control used by calculator forms
      DropDown.ts                # Dropdown selection control
  steps/                         # Actions/orchestration on top of page objects
    base/
      BaseCalculation.steps.ts   # Shared calculator step actions (generic base)
    Welcome.steps.ts             # Navigation to an estimate module
    ComputeEngine.steps.ts       # Compute Engine form actions
    CloudSQL.steps.ts            # Cloud SQL form actions
    KubernetesEngine.steps.ts    # Kubernetes Engine form actions
    models/                      # Form input models
    builders/                    # Fluent builders for the models
  testData/
    ComputeEngineTestData.ts     # Compute Engine data-driven cases
    CloudSQLTestData.ts          # Cloud SQL data-driven cases
    KubernetesEngineTestData.ts  # Kubernetes Engine data-driven cases
  constants/
    Tags.ts                      # Shared test tags (@smoke, @extended)
    BlockNames.ts                # Estimate block names
    Enums.ts                     # ProvisioningType, CloudSQLServiceType, EstimationModule
  utils/
    Logger.ts                    # Static logger; also emits Allure steps when REPORTER=allure
    number.ts                    # parseNumber helper
    costReportReader.ts          # Parses/validates a downloaded cost-report CSV
    randomGenerator.ts           # Random.string() helper (faker-backed)
  types/
    env.d.ts                     # Typed `process.env` keys (BASE_URL, REPORTER, DOWNLOAD_PATH, ...)
  tests/
    computeEngine.tests.ts       # Data-driven Compute Engine tests
    cloudSQL.tests.ts            # Data-driven Cloud SQL tests
    kubernetesEngine.tests.ts    # Data-driven Kubernetes Engine tests
    costReportDownload.tests.ts  # Downloads and validates a Compute Engine cost report
specs/
  README.md                # Directory for test plans (e.g. generated by the Playwright test planner)
playwright.config.ts     # Playwright runner configuration
eslint.config.mjs        # ESLint flat config
tsconfig.json            # TypeScript compiler options
```

## Conventions

- **Page objects / components** — `PascalCase` filenames matching the exported class; pages use the `.page.ts` suffix and step classes the `.steps.ts` suffix.
- **Spec files** — camelCase with the `.tests.ts` suffix (matched by `testMatch` in `playwright.config.ts`).
- **Utilities** — lowercase filenames (no default class export).
- **Pages vs. Steps** — page objects expose only element/component getters; all interaction (filling forms, clicking, reading values) lives in step classes under `src/steps`, with shared actions in `BaseCalculationSteps`.
- **Fixtures & page context** — step classes are provided to tests via fixtures in `src/fixtures/testFixture.ts`; an auto `bindPage` fixture stores the active `Page` in `PageContext` so page objects can resolve it without constructor plumbing.
- **Element access** — page objects expose `Locator`/control getters that are lazy by design and resolved only when step actions run.
- **Assertions** — prefer Playwright's web-first `expect` matchers (`toBeVisible`, `toHaveURL`, ...) which auto-wait/poll up to the configured `expect.timeout`.
- **Logging** — use `Logger` (`src/utils/Logger.ts`) instead of `console.*`; it writes to the console via `winston` and, only when `REPORTER=allure`, also emits Allure steps.

## Configuration notes

- `baseURL` is set to `https://cloud.google.com` in `playwright.config.ts` and can be overridden via the `BASE_URL` environment variable (loaded from `.env`).
- Tests run against Chromium by default (`projects` in `playwright.config.ts`). Add more projects (Firefox, WebKit) as needed.
- Screenshots are captured on failure, and traces and video are retained on failure (`use.screenshot` / `use.trace` / `use.video`).
- Timeouts: global test timeout `120s`, action/expect timeouts `10s`, navigation timeout `90s`.
- `LOG_LEVEL` (`trace` | `debug` | `info` | `warn` | `error`) controls `Logger`/`winston` verbosity; defaults to `debug`.
- `REPORTER` selects the active reporter (see [Reporting](#reporting)); `RP_ENDPOINT`, `RP_PROJECT`, `RP_API_KEY`, and `RP_LAUNCH` configure the Report Portal integration when `REPORTER=reportportal`.
- `DOWNLOAD_PATH` sets the directory used for downloaded test artifacts (e.g. cost report CSVs fetched via `downloadFixture`'s `downloads` fixture).

_TODO: `src/utils/costReportReader.ts` and `src/utils/randomGenerator.ts` import `csv-file-validator` and `@faker-js/faker`, but neither package is currently listed in `package.json`/`package-lock.json` — add them as dependencies._
