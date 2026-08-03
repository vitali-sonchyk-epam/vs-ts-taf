---
name: review-uncommitted-changes
description: Review the uncommitted changes in the current project's working tree (staged and unstaged) and produce a structured Markdown review report. Use when the user wants to sanity-check work in progress before staging, committing, or opening a pull request.
---

# Review Uncommitted Changes

## Table of Contents

- [Overview](#overview)
- [When to Use This Skill](#when-to-use-this-skill)
- [Instructions](#instructions)
- [Prerequisites](#prerequisites)
- [Output Format](#output-format)
- [Read-Only Constraint](#read-only-constraint)

## Overview

This skill reviews the uncommitted changes in the current working tree — staged,
unstaged, and optionally untracked files — and writes a structured Markdown
review report to disk. It is the working-tree counterpart to
`review-committed-files`. It is local and read-only: it never stages, commits,
discards, or edits any file. The only file it writes is the review report.

## When to Use This Skill

Use this skill when the user asks to:

- Review their current work in progress before staging or committing.
- Sanity-check the diff of uncommitted (staged and/or unstaged) changes.
- Get a Markdown summary of the risks and findings in their working tree.
- Double-check changes before running `git add` or `git commit`.

Do **not** use this skill to review already-committed changes (use
`review-committed-files`) or to write feedback to any remote.

## Instructions

1. **Resolve the review scope**: default to all uncommitted changes (staged +
   unstaged tracked files); `staged` → `git diff --cached`; `unstaged` →
   `git diff`. If the user wants new files included, also list untracked files
   with `git ls-files --others --exclude-standard`.
2. **Resolve `outputDir`**, defaulting to `./reviews`; create it if missing.
3. **Confirm this is a Git repository** with `git rev-parse --is-inside-work-tree`;
   if not, stop and tell the user without writing a file.
4. **Check there is something to review** with `git status --porcelain`; if the
   tree is clean, report that and stop without writing a file.
5. **Gather changed files** with `git status --porcelain` and
   `git diff --name-status` (and `--cached` for staged).
6. **Read the diff** with `git diff` and `git diff --cached` as scope requires,
   reading working-tree files for extra context. Do not modify any file.
7. **Analyse** the diff for correctness, security (OWASP Top 10), test coverage,
   leftover debug code, secrets, and project conventions, categorising each
   finding as Blocking, Suggestion, or Nit.
8. **Write the report** using the [Output Format](#output-format) to
   `<outputDir>/wip-review-<yyyyMMdd-HHmmss>.md`.
9. **Report back** the report path as a Markdown link plus a one-paragraph summary
   and whether the change looks ready to commit.

## Prerequisites

- The workspace must be a Git repository.
- Git must be installed and available on the `PATH`.
- The output directory must be writable.

## Output Format

The Markdown report MUST contain these sections, in order:

1. **Title** — `# Review of uncommitted changes (<scope>)`.
2. **Summary** — two- to four-sentence overview and headline recommendation.
3. **Files Changed** — table with columns `Path`, `State`
   (`staged`/`unstaged`/`untracked`), `Change`
   (`add`/`edit`/`delete`/`rename`), `Lines (+/-)`.
4. **Findings** — three H3 subsections: `### Blocking`, `### Suggestions`,
   `### Nits`. Each bullet starts with the project-relative file path and line
   range (when applicable), then a short rationale.
5. **Safety Checks** — call out any secrets, credentials, large binaries, or
   leftover debug/console statements found in the diff. If none, write
   `_No obvious secrets or debug artefacts detected._`
6. **Test Coverage** — whether the change is covered by tests and any gaps.
7. **Recommendation** — one of `Ready to commit`, `Commit with suggestions`,
   `Needs work`, or `Do not commit`, plus one sentence of rationale.

## Read-Only Constraint

This skill MUST NOT modify the repository. Never run a Git command that stages,
commits, or discards changes (`git add`, `git commit`, `git restore`,
`git checkout`, `git stash`, `git clean`, or any other mutating command), and
never edit or delete files in the working tree. Use only read-only inspection
commands (`git status`, `git diff`, `git ls-files`, `git rev-parse`). The only
file written is the Markdown report under `outputDir`. If the user asks for the
changes to be staged or committed, decline, point them at the report, and stop.
