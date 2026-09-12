---
description: Delegate test implementation to the playwright-test-generator subagent.
argument-hint: <plan path or scenario to implement> (e.g. "specs/plan.md 1.2" or "Cloud SQL page title")
allowed-tools: Task, Read
---

Implement Playwright tests for: $ARGUMENTS

**Delegate this to the `playwright-test-generator` subagent.**

Pass `$ARGUMENTS` through verbatim; the subagent cannot see this conversation.
If `$ARGUMENTS` names a plan file, read it first and pass the relevant suite
name, scenario name, target `src/tests/<module>.tests.ts` file and step body to
the subagent.

Remind it to follow the repository's layered Test / Steps / Page Object
architecture rather than emitting a flat page-driven script.

When it returns, report every file it created or changed across the test, steps,
page object, model, builder and test data layers, plus the result of the suite
run it used to verify the work.
