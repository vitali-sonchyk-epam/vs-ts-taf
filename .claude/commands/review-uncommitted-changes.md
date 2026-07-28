---
description: Review the uncommitted changes (staged and/or unstaged) in the current working tree and write a structured Markdown review report to disk.
argument-hint: [all | staged | unstaged] (defaults to all uncommitted changes)
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git ls-files:*), Bash(git rev-parse:*), Read, Write, Glob, Grep
---

Review the uncommitted changes in the current project's working tree and write a
structured Markdown review report to disk.

Use the **review-uncommitted-changes** skill in
`.claude/skills/review-uncommitted-changes/SKILL.md` for the full workflow, output
format, and read-only constraint.

Scope to review: $ARGUMENTS

If nothing is given above, review all uncommitted changes (staged + unstaged).

Steps:

1. Resolve the scope (all / staged / unstaged) and confirm the workspace is a Git
   repository with uncommitted changes.
2. Gather the changed files and read the diff using only read-only Git commands —
   never stage, commit, discard, or edit anything.
3. Analyse the diff for correctness, security, secrets/debug leftovers, test
   coverage, and project conventions, grouping findings as Blocking, Suggestions,
   or Nits.
4. Write the report to `./reviews/wip-review-<timestamp>.md` and report the path
   back with a short summary and whether the change looks ready to commit.
