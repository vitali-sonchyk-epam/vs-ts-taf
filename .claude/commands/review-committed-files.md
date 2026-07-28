---
description: Review the files changed by one or more Git commits in the current project and write a structured Markdown review report.
argument-hint: [commit | range | "last N commits"] (defaults to HEAD)
allowed-tools: Bash(git show:*), Bash(git diff:*), Bash(git log:*), Bash(git rev-parse:*), Read, Write, Glob, Grep
---

Review the files changed by one or more Git commits in the current project and
write a structured Markdown review report to disk.

Use the **review-committed-files** skill in
`.claude/skills/review-committed-files/SKILL.md` for the full workflow, output
format, and read-only constraint.

Target to review: $ARGUMENTS

If nothing is given above, default to the most recent commit (`HEAD`).

Steps:

1. Resolve the review target (single commit, range, or latest commit) and confirm
   the workspace is a Git repository.
2. Gather commit metadata, changed files, and the diff using only read-only Git
   commands — never modify the repository or any remote.
3. Analyse the diff for correctness, security, test coverage, and project
   conventions, grouping findings as Blocking, Suggestions, or Nits.
4. Write the report to `./reviews/commit-review-<shortSha-or-range>.md`
   (timestamp-suffixed if it already exists) and report the path back with a short
   summary.
