# vs-ts-taf — WebdriverIO + TypeScript Test Automation Framework

End-to-end UI test automation for the [Google Cloud Pricing Calculator](https://cloud.google.com/products/calculator), built with **WebdriverIO 9**, **TypeScript**, and **Mocha**, using the Page Object Model.

> **Disclaimer**
> This is an educational project. Do not consider the current solutions as the only correct ones or as production-ready.

## Tech stack

| Area | Tool |
| --- | --- |
| Test runner | WebdriverIO 9 (`@wdio/cli`, `@wdio/local-runner`) |
| Language | TypeScript 5 (transpiled on the fly via `tsx`) |
| Test framework | Mocha (`@wdio/mocha-framework`) |
| Assertions | `expect-webdriverio` (built-in, auto-retrying) |
| Reporting | Spec reporter + Allure (`@wdio/allure-reporter`) |
| Config/env | `dotenv` |

## Prerequisites

- **Node.js >= 18.20.0** (see `engines` in `package.json`)
- **Google Chrome** installed (WebdriverIO 9 auto-manages the matching driver)
- **Java** (only required to generate/serve Allure reports)

## Getting started

```powershell
# 1. Install dependencies
npm install

# 2. (Optional) create a .env file for environment-specific values
#    e.g. BASE_URL overrides, credentials, etc.

# 3. Run the tests
npm test
```

## Running tests

```powershell
# Run everything (uses wdio.conf.js "specs")
npm test

# Run only the smoke suite defined in wdio.conf.js
npx wdio run ./wdio.conf.js --suite smoke

# Run a single spec file
npx wdio run ./wdio.conf.js --spec ./src/tests/smoke/cloud-calculator.tests.ts

# Filter by test title (Mocha grep)
npx wdio run ./wdio.conf.js --spec ./src/tests/smoke/cloud-calculator.tests.ts --mochaOpts.grep "Total usage limit for"
```

## Reporting (Allure)

Allure results are written to `allure-results/` during a run.

```powershell
# Generate a static HTML report from the latest results
npm run report:generate

# Or serve an interactive report
npx allure serve allure-results
```

## Project structure

```
src/
  ui/
    pages/               # Page objects (one class per page)
      Base.page.ts       # Shared page behaviour (open, cookies, waitForPageLoad)
      Welcome.page.ts    # Calculator landing page
      Calculator.page.ts # Compute Engine estimate form
    components/          # Reusable UI components
      BaseComponent.ts   # Lazy root-element base for components
      EstimationModal.ts # "Add to this estimate" modal
  utils/
    Logger.ts            # Thin static wrapper over @wdio/logger ("taf" namespace)
    number.ts            # parseNumber helper
  tests/
    smoke/
      cloud-calculator.tests.ts   # Data-driven smoke tests
wdio.conf.js             # WebdriverIO runner configuration
tsconfig.json            # TypeScript compiler options
```

## Conventions

- **Page objects / components** — `PascalCase` filenames matching the exported class; pages use the `.page.ts` suffix.
- **Spec files** — lowercase kebab-case with the `.tests.ts` suffix (matched by the `specs` glob in `wdio.conf.js`).
- **Utilities** — lowercase filenames (no default class export).
- **Element access** — page objects expose private getters returning `$()` locators; components receive a lazy `() => ChainablePromiseElement` root so `$` is resolved only after a session exists.
- **Assertions** — prefer the built-in `expect-webdriverio` matchers (they auto-wait/poll up to `waitforTimeout`).

## Configuration notes

- `baseUrl` is set to `https://cloud.google.com` in `wdio.conf.js`.
- Logging is tuned via `logLevel` (`warn`) plus a per-logger `logLevels` map: WDIO's own protocol loggers are capped at `warn` (info/debug BiDi noise is hidden, warnings/errors are kept) while the project's `taf` logger stays at `info` so business-step logs remain visible. Raise levels for deeper diagnostics.
- Tests run against modern **WebDriver BiDi** (the WebdriverIO 9 default).
