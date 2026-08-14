---
description: Review the current branch's changed files against a supplied list of acceptance criteria and report which are met.
argument-hint: <acceptance-criteria> (one per line, numbered, or comma-separated)
allowed-tools: Bash(git diff:*), Bash(git status:*), Bash(git log:*), Read, Grep, Glob
---

Checks whether the changes on the current branch satisfy a given list of acceptance criteria, producing a per-criterion pass/fail report with evidence.

Use the **review-acceptance-criteria** skill in `.claude/skills/review-acceptance-criteria/SKILL.md` for the full workflow, output format, and read-only constraint.

Acceptance criteria: $ARGUMENTS

If nothing is given above, ask the user to provide the acceptance criteria before proceeding.

Steps:

1. Parse the acceptance criteria into a clean numbered list.
2. Diff the current branch against its base and read the actual changes (committed and uncommitted).
3. Judge each criterion as Met / Partially Met / Not Met with file/line evidence, and flag any unmatched changes.
4. Report a Markdown table plus a one-line overall summary; make no edits.
