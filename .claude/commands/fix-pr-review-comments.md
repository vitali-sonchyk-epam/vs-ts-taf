---
description: Fetch a GitHub PR's review comments by id, propose fixes, and implement them after user confirmation.
argument-hint: [owner/repo #<number> | PR id]
allowed-tools: Read, Edit, Write, Glob, Grep, mcp__github
---

Fetch the review comments on a GitHub pull request by its id, work out a fix
for each actionable comment, and implement the fixes locally once the user
confirms the plan.

Use the **fix-pr-review-comments** skill in
`.claude/skills/fix-pr-review-comments/SKILL.md` for the full workflow and
guidelines.

PR to fix: $ARGUMENTS

If nothing is given above, ask the user for the repository and PR number.

Steps:

1. Resolve the PR id and fetch its review comments via GitHub MCP tools.
2. Filter to actionable comments and draft a concrete fix for each.
3. Present the fix plan to the user and ask for confirmation before editing
   any file.
4. On confirmation, implement the confirmed fixes and report back what was
   fixed or skipped — never reply, resolve, commit, or push without being
   asked.
