---
name: review-committed-files
description: Review the files changed by one or more Git commits in the current project and produce a structured Markdown review report. Use when the user wants to audit, summarise, or sanity-check committed changes locally before pushing or opening a pull request.
---

# Review Committed Files

## Table of Contents

- [Overview](#overview)
- [When to Use This Skill](#when-to-use-this-skill)
- [Instructions](#instructions)
- [Prerequisites](#prerequisites)
- [Output Format](#output-format)
- [Read-Only Constraint](#read-only-constraint)

## Overview

This skill reviews the files changed by one or more Git commits in the current
project and writes a structured Markdown review report to disk. It is local and
read-only: it never rewrites history, edits the working tree, or pushes to any
remote. The only file it writes is the review report.

## When to Use This Skill

Use this skill when the user asks to:

- Review the files changed by the latest commit in the current project.
- Audit a specific commit, a commit range, or the branch diff against its base.
- Generate a Markdown summary of the risks and test coverage of committed changes.
- Sanity-check what was committed locally before pushing or opening a pull request.

Do **not** use this skill to review uncommitted working-tree changes (use
`review-uncommitted-changes`) or to write feedback back to any remote.

## Instructions

1. **Resolve the review target** from the user's request: a single commit SHA, a
   symbolic ref such as `HEAD`, a commit range (`<base>..<head>`), or the last N
   commits. If nothing is given, default to `HEAD`. For branch changes, default
   to `<mergeBase>..HEAD` against `main` (fall back to `master`).
2. **Resolve `outputDir`**, defaulting to `./reviews`; create it if missing.
3. **Confirm this is a Git repository** with `git rev-parse --is-inside-work-tree`;
   if not, stop and tell the user without writing a file.
4. **Gather commit metadata** with `git show --stat --no-patch <target>` or
   `git log --stat <range>` (author, date, subject, body).
5. **List changed files** with `git diff --name-status <range>` (or
   `git show --name-status <sha>`).
6. **Read the diff** with `git diff <range>` / `git show <sha>`, reading files at
   that revision via `git show <sha>:<path>` where extra context helps.
7. **Analyse** the diff for correctness, security (OWASP Top 10), test coverage,
   and project conventions, categorising each finding as Blocking, Suggestion, or
   Nit.
8. **Write the report** using the [Output Format](#output-format) to
   `<outputDir>/commit-review-<shortSha-or-range>.md`, appending a
   `-yyyyMMdd-HHmmss` suffix instead of overwriting an existing file.
9. **Report back** the report path as a Markdown link plus a one-paragraph summary
   of the headline findings and recommendation.

## Prerequisites

- The workspace must be a Git repository with the commits under review present
  locally (fetch or pull first if reviewing commits from another branch).
- Git must be installed and available on the `PATH`.
- The output directory must be writable.

## Output Format

The Markdown report MUST contain these sections, in order:

1. **Title** — `# Review of <commit SHA or range>: <headline subject>`.
2. **Summary** — two- to four-sentence overview and headline recommendation.
3. **Commits** — table with columns `SHA`, `Author`, `Date`, `Subject`.
4. **Files Changed** — table with columns `Path`, `Change`
   (`add`/`edit`/`delete`/`rename`), `Lines (+/-)`.
5. **Findings** — three H3 subsections: `### Blocking`, `### Suggestions`,
   `### Nits`. Each bullet starts with the project-relative file path and line
   range (when applicable), then a short rationale.
6. **Test Coverage** — whether the change is covered by tests and any gaps.
7. **Recommendation** — one of `Ready to push`, `Push with suggestions`,
   `Needs work`, or `Do not push`, plus one sentence of rationale.

## Read-Only Constraint

This skill MUST NOT modify the repository or any remote. Never run a Git command
that writes history or state (`git commit`, `git rebase`, `git reset`,
`git push`, a destructive `git checkout`, `git clean`, or any other mutating
command), and never edit, stage, or delete files in the working tree. Use only
read-only inspection commands (`git show`, `git diff`, `git log`,
`git rev-parse`). The only file written is the Markdown report under `outputDir`.
If the user asks for the review to be committed or pushed, decline, point them at
the report, and stop.
