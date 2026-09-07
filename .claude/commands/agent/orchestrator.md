---
description: Run the orchestrator agent flow, which delegates the Playwright failure investigation to its subagents, and show the generated Markdown report.
allowed-tools: Bash(npm run agent:orchestrator*), Read, Glob
---

Run the **orchestrator** flow: the orchestrator decides which subagents
(collector, analyzer, code_investigator) to call and in what order to explain the
first failing test of the Playwright JSON report.

Steps:

1. Run `npm run agent:orchestrator`.
2. Read the Markdown report the run prints under `agent-reports/`.
3. Post the subagents that were used, the root cause, the suggested fix and the
   usage/cost totals in the chat panel. Do not modify any source or test files.
