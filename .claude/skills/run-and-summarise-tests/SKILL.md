---
name: run-and-summarise-tests
description: Run a chosen test suite in the current project, then parse the results and produce a concise pass/fail summary with likely root causes for any failures. Use when the user wants to execute tests and get a readable summary rather than raw output.
---

# Run and Summarise Tests

## Table of Contents

- [Overview](#overview)
- [When to Use This Skill](#when-to-use-this-skill)
- [Instructions](#instructions)
- [Prerequisites](#prerequisites)
- [Output Format](#output-format)
- [Guidelines](#guidelines)

## Overview

This skill runs a test suite in the current project, captures the output, and
produces a concise, readable summary: totals, the list of failures, and a likely
root cause plus suggested next step for each failure. It runs tests but makes no
source changes unless the user explicitly asks for fixes afterwards.

## When to Use This Skill

Use this skill when the user asks to:

- Run the smoke, e2e, api, or full test suite and summarise the outcome.
- Execute a single test file or a filtered set of tests and explain the results.
- Get a human-readable digest of a Playwright or Jest run instead of raw output.
- Triage which tests failed and why after a run.

Do **not** use this skill to author new tests or to fix application code
automatically — summarise first, then let the user decide.

## Instructions

1. **Resolve the target suite**: a named suite such as `smoke`, `e2e`, or `api`
   → map to the matching folder under `tests/` or `package.json` script; a
   specific file or test-name filter → pass it through; nothing specified → ask
   which suite, or default to the fastest suite (usually `smoke`) if the user just
   said "run the tests".
2. **Detect the test runner**: read `package.json` `scripts` and
   `devDependencies`; prefer an existing script (for example `npm run test:smoke`)
   over a raw runner invocation; if Playwright is present, prefer
   `npx playwright test` with the right project/grep filter and a machine-readable
   reporter. If no runner or manifest exists, stop and tell the user.
3. **Run the tests** with a read-only, non-interactive invocation. Never pass
   flags that modify snapshots or baselines (such as `--update-snapshots`) unless
   the user explicitly asked.
4. **Capture and parse** the output — prefer a structured reporter (JSON / JUnit)
   when supported; otherwise parse the console summary.
5. **Summarise** using the [Output Format](#output-format).
6. **Report back** the summary in the chat panel; offer to open the HTML report or
   drill into a failure, but do not change any source files unless explicitly
   asked.

## Prerequisites

- The project must have a configured test runner (for example a `package.json`
  with test scripts) and dependencies installed (`node_modules` present).
- A terminal capable of running the test command.

## Output Format

Present the summary in this order:

1. **Command** — the exact command that was run.
2. **Totals** — passed / failed / skipped / flaky counts and total duration.
3. **Failures** — one bullet per failed test with the test title and file path,
   the key assertion or error (trimmed), a likely root cause (timing, selector,
   data, environment, real bug), and a suggested next step. If none, write
   `All tests passed.`
4. **Flaky / Retried** — tests that only passed on retry, if reported.
5. **Recommendation** — one short line, for example "Safe to push", "Investigate
   the 2 selector failures", or "Environment issue — rerun".

## Guidelines

- Never modify source, test, or snapshot files as part of running the suite.
- Keep the summary concise — surface the signal and link to the full report for
  detail rather than pasting hundreds of lines.
- If the run fails to start (missing deps, config error), report that clearly
  instead of presenting it as test failures.
