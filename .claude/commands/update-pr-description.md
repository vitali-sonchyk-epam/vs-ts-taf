---
description: Update a GitHub PR's description via MCP tools so it matches the PR's actual changes, after user confirmation.
argument-hint: [owner/repo #<number> | PR URL]
allowed-tools: Read, mcp__github
---

Update a GitHub pull request's description so it accurately reflects the PR's
actual changes, using GitHub MCP tools, after the user confirms the proposed
text.

Use the **update-pr-description** skill in
`.claude/skills/update-pr-description/SKILL.md` for the full workflow and
guidelines.

PR to update: $ARGUMENTS

If nothing is given above, ask the user for the repository and PR number (or
a full PR URL).

Steps:

1. Resolve the PR reference and fetch its current description, commits, and
   diff via GitHub MCP tools.
2. Draft an updated description reflecting the actual changes, preserving
   still-accurate existing content.
3. Show the proposed description to the user and ask for confirmation before
   writing anything to GitHub.
4. On confirmation, update the PR description via GitHub MCP tools and report
   back the result — never edit code, comments, or merge state.
