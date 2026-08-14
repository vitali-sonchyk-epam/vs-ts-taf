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
| Reporting | Built-in `list` reporter + Allure (`allure-playwright`) |
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

# 3. (Optional) create a .env file for environment-specific values
#    e.g. BASE_URL overrides, credentials, etc.

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

## Reporting (Allure)

Allure results are written to `allure-results/` during a run.

```powershell
# Generate a static HTML report from the latest results
npm run report:generate

# Open the generated static report
npm run report:open

# Or serve an interactive report directly from the raw results
npx allure serve allure-results

# Clean out old results before a fresh run
npm run results:clean
```

Playwright's own HTML report is also available:

```powershell
npx playwright show-report
```

## Project structure

```
src/
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
    tags.ts                    # Shared test tags (@smoke, @extended)
  utils/
    Logger.ts                  # Static logger that also emits Allure steps ("taf" namespace)
    number.ts                  # parseNumber helper
  tests/
    computeEngine.tests.ts     # Data-driven Compute Engine tests
    cloudSQL.tests.ts          # Data-driven Cloud SQL tests
playwright.config.ts     # Playwright runner configuration
tsconfig.json            # TypeScript compiler options
```

## Conventions

- **Page objects / components** — `PascalCase` filenames matching the exported class; pages use the `.page.ts` suffix.
- **Spec files** — camelCase with the `.tests.ts` suffix (matched by `testMatch` in `playwright.config.ts`).
- **Utilities** — lowercase filenames (no default class export).
- **Element access** — page objects and components receive the Playwright `Page` and expose `Locator` getters; locators are lazy by design and resolved only when actions run.
- **Assertions** — prefer Playwright's web-first `expect` matchers (`toBeVisible`, `toHaveURL`, ...) which auto-wait/poll up to the configured `expect.timeout`.

## Configuration notes

- `baseURL` is set to `https://cloud.google.com` in `playwright.config.ts` and can be overridden via the `BASE_URL` environment variable (loaded from `.env`).
- Tests run against Chromium by default (`projects` in `playwright.config.ts`). Add more projects (Firefox, WebKit) as needed.
- Screenshots are captured on failure and traces are retained on failure (`use.screenshot` / `use.trace`).
- Timeouts: global test timeout `120s`, action/expect timeouts `10s`, navigation timeout `90s`.
