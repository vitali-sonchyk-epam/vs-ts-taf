---
description: Run a chosen test suite in the current project and produce a concise pass/fail summary with likely root causes for any failures.
argument-hint: [suite | file | test filter] (e.g. smoke, e2e, api; defaults to smoke)
allowed-tools: Bash(npm:*), Bash(npx:*), Bash(node:*), Bash(pnpm:*), Bash(yarn:*), Read, Glob, Grep
---

Run a test suite in the current project and summarise the results.

Use the **run-and-summarise-tests** skill in
`.claude/skills/run-and-summarise-tests/SKILL.md` for the full workflow and output
format.

Target to run: $ARGUMENTS

If nothing is given above, default to the fastest suite (usually `smoke`).

Steps:

1. Resolve the target suite/file/filter and detect the test runner from
   `package.json` scripts and dependencies.
2. Run the tests with a non-interactive, read-only invocation (never auto-update
   snapshots or baselines unless explicitly asked).
3. Parse the output (prefer a structured reporter when available) and summarise:
   command, totals, per-failure root cause and next step, flaky tests, and a
   one-line recommendation.
4. Report the summary in the chat panel without modifying any source or test
   files.
