---
description: Review a GitHub pull request via MCP tools and write a structured Markdown review report.
argument-hint: [owner/repo #<number> | PR URL]
allowed-tools: Read, Write, Glob, Grep, mcp__github
---

Review a GitHub pull request using GitHub MCP tools and write a structured
Markdown review report to disk.

Use the **review-github-pr** skill in `.claude/skills/review-github-pr/SKILL.md`
for the full workflow, output format, and read-only constraint.

PR to review: $ARGUMENTS

If nothing is given above, ask the user for the repository and PR number (or a
full PR URL).

Steps:

1. Resolve the PR reference (owner/repo and PR number, or URL); ask if unclear.
2. Fetch PR metadata, changed files/diff, and existing review comments using
   GitHub MCP tools only — never approve, comment on, merge, or push to the PR.
3. Analyse the diff for correctness, security, test coverage, and project
   conventions, grouping findings as Blocking, Suggestions, or Nits.
4. Write the report to `./reviews/pr-review-<owner>-<repo>-<prNumber>.md`
   (timestamp-suffixed if it already exists) and report the path back with a
   short summary.
