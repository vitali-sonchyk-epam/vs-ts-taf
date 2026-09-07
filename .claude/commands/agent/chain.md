---
description: Run the chain agent flow over the Playwright JSON report and show the generated Markdown analysis.
argument-hint: [path-to-playwright-json-report] (defaults to test-results/report.json)
allowed-tools: Bash(npm run agent:chain*), Read, Glob
---

Run the **chain** flow: a fixed sequence of model calls (summary → root cause →
next steps) over the first failing test of the Playwright JSON report.

Report to analyse: $ARGUMENTS

Steps:

1. Run `npm run agent:chain -- $ARGUMENTS` (drop the trailing arguments when
   nothing is given above, so the configured default report is used).
2. Read the Markdown report the run prints under `agent-reports/`.
3. Post its root cause, suggested fix and the usage/cost totals in the chat
   panel. Do not modify any source or test files.
