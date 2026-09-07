---
description: Delegate failing-test debugging to the playwright-test-healer subagent.
argument-hint: <test file, title or "all"> (e.g. "src/tests/addToEstimateModal.tests.ts" or "all")
allowed-tools: Task, Read
---

Debug and fix the failing Playwright tests for: $ARGUMENTS

**Delegate this to the `playwright-test-healer` subagent.**

Pass `$ARGUMENTS` through verbatim; the subagent cannot see this conversation.
If `$ARGUMENTS` is empty or says "all", tell it to run the whole suite first and
heal every failure it finds.

Remind it that fixes must respect the repository's layered Test / Steps / Page
Object architecture: updated selectors belong in `src/ui/`, changed interactions
belong in `src/steps/`, and only assertions and test data may change in
`src/tests/`. It must not inline `page` calls or selectors into a test to make it
pass.

When it returns, report for each test: the root cause, the layer it changed, and
the final run result — including any test it marked `test.fixme()` and why.
