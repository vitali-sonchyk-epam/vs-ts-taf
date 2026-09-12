/**
 * Scratch seed used by the Playwright MCP server (`playwright-test`), not a real test.
 *
 * `planner_setup_page` / `generator_setup_page` need a running Playwright test to attach a live
 * browser page to: the server starts this stub, pauses it at the end, and hands the paused page to
 * the planner/generator agent to drive with its `browser_*` tools. It is created automatically if
 * missing, so keep the path at `src/tests/seed.spec.ts` — that is the value the agents pass as
 * `seedFile`, and `playwright.config.ts` whitelists it via `testMatch: ['**\/seed.spec.ts']`.
 *
 * Do not add assertions or real scenarios here; generated tests belong in `src/tests/*.tests.ts`
 * and must follow the layered Test / Steps / Page Object architecture.
 */
import { test } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    // The `page` fixture must stay destructured so Playwright instantiates it for the MCP server
    // to attach to; `void` marks it as intentionally unused by this stub.
    void page;
    // generate code here.
  });
});

