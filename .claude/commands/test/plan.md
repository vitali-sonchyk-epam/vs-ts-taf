---
description: Delegate test planning to the playwright-test-planner subagent.
argument-hint: <feature or scenario to plan> (e.g. "Add to this estimate modal menu items")
allowed-tools: Task, Read
---

Create a Playwright test plan for: $ARGUMENTS

**Delegate this to the `playwright-test-planner` subagent.**

Pass `$ARGUMENTS` through verbatim; the subagent cannot see this conversation.

When it returns, report the saved plan's path and the scenarios it covers. Do
not implement the tests — that is `playwright-test-generator`'s job.
