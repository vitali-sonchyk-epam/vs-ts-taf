# vs-ts-taf — Playwright + TypeScript Test Automation Framework

End-to-end UI test automation for the [Google Cloud Pricing Calculator](https://cloud.google.com/products/calculator), built with **Playwright**, **TypeScript**, and the Page Object Model.

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
    logger.config.ts          # Winston logger instance (level from LOG_LEVEL)
  ui/
    pages/
      base/
        Base.page.ts           # Shared page behaviour (open, cookies, waitForPageUrl)
        BaseCalculator.page.ts # Shared calculator-page behaviour (getTitle via PageHeader)
      Welcome.page.ts          # Calculator landing page (opens the estimate modal)
      ComputeEngine.page.ts    # Compute Engine estimate form
      CloudSQL.page.ts         # Cloud SQL estimate form
    components/                # Reusable UI components
      BaseComponent.ts         # Base component holding the root Locator
      EstimationModal.ts       # "Add to this estimate" modal
      CalculatorInput.ts       # Numeric input control used by calculator forms
      PageHeader.ts            # Page title (<h1>) component
  constants/
    Tags.ts                    # Shared test tags (@smoke, @extended)
    BlockNames.ts               # Shared estimate block names (Compute Engine, Cloud SQL)
  utils/
    Logger.ts                  # Static logger; also emits Allure steps when REPORTER=allure
    number.ts                  # parseNumber helper
  tests/
    computeEngine.tests.ts     # Data-driven Compute Engine tests
    cloudSQL.tests.ts          # Data-driven Cloud SQL tests
playwright.config.ts     # Playwright runner configuration
eslint.config.mjs        # ESLint flat config
tsconfig.json            # TypeScript compiler options
```

## Conventions

- **Page objects / components** — `PascalCase` filenames matching the exported class; pages use the `.page.ts` suffix.
- **Spec files** — camelCase with the `.tests.ts` suffix (matched by `testMatch` in `playwright.config.ts`).
- **Utilities** — lowercase filenames (no default class export).
- **Element access** — page objects and components receive the Playwright `Page` and expose `Locator` getters; locators are lazy by design and resolved only when actions run.
- **Assertions** — prefer Playwright's web-first `expect` matchers (`toBeVisible`, `toHaveURL`, ...) which auto-wait/poll up to the configured `expect.timeout`.
- **Logging** — use `Logger` (`src/utils/Logger.ts`) instead of `console.*`; it writes to the console via `winston` and, only when `REPORTER=allure`, also emits Allure steps.

## Configuration notes

- `baseURL` is set to `https://cloud.google.com` in `playwright.config.ts` and can be overridden via the `BASE_URL` environment variable (loaded from `.env`).
- Tests run against Chromium by default (`projects` in `playwright.config.ts`). Add more projects (Firefox, WebKit) as needed.
- Screenshots are captured on failure, and traces and video are retained on failure (`use.screenshot` / `use.trace` / `use.video`).
- Timeouts: global test timeout `120s`, action/expect timeouts `10s`, navigation timeout `90s`.
- `LOG_LEVEL` (`trace` | `debug` | `info` | `warn` | `error`) controls `Logger`/`winston` verbosity; defaults to `debug`.
- `REPORTER` selects the active reporter (see [Reporting](#reporting)); `RP_ENDPOINT`, `RP_PROJECT`, `RP_API_KEY`, and `RP_LAUNCH` configure the Report Portal integration when `REPORTER=reportportal`.
