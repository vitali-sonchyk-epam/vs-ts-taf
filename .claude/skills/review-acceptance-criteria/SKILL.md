---
name: review-acceptance-criteria
description: Reviews the files changed on the current branch against a supplied list of acceptance criteria and reports whether each one is satisfied. Use when validating a task's changes meet its acceptance criteria before requesting review.
---

# Review Acceptance Criteria

## Table of Contents

- [Overview](#overview)
- [When to Use This Skill](#when-to-use-this-skill)
- [Instructions](#instructions)
- [Prerequisites](#prerequisites)
- [Output Format](#output-format)
- [Read-Only Constraint](#read-only-constraint)

## Overview

This skill takes a list of acceptance criteria and checks the current branch's
changed files against each one, reporting a per-criterion verdict with
supporting evidence from the diff. It is meant to give a test automation
engineer a quick self-review before opening or requesting a code review,
mirroring how a reviewer would check a task off against its acceptance
criteria.

## When to Use This Skill

Use this skill when the user asks to:

- Check whether their branch satisfies a given set of acceptance criteria.
- Self-review a task's changes against its requirements before requesting
  review.
- Validate that all criteria for a learning-system or ticketed task are met
  by the current branch.
- Get a pass/fail breakdown of acceptance criteria versus actual code changes.

Do **not** use this skill for general code quality review with no acceptance
criteria supplied (use `review-uncommitted-changes` or `review-committed-files`
instead), or for reviewing a remote GitHub PR (use `review-github-pr`).

## Instructions

1. **Parse the acceptance criteria** from the argument. Accept one criterion
   per line, numbered, or comma-separated; normalize into a clean numbered
   list. If no criteria were supplied, ask the user for them before
   proceeding.
2. **Determine the diff scope.** Find the current branch's base (e.g. `main`)
   and list changed files with `git diff <base>...HEAD --name-status` plus
   `git status` for any uncommitted work still on the branch.
3. **Read the actual changes**, not just file names — pull the diff content
   (`git diff <base>...HEAD -- <file>`) and read full files with `Read` where
   diff context alone isn't enough to judge a criterion.
4. **Evaluate each criterion independently** against the observed changes.
   For each one, decide: Met, Partially Met, or Not Met, and cite the
   specific file(s)/line(s) that justify the verdict.
5. **Flag gaps** — criteria with no corresponding change, or changes that look
   unrelated to any criterion (potential scope creep worth calling out).
6. **Produce the report** per [Output Format](#output-format) and present it
   to the user; do not modify any files.

## Prerequisites

- The project must be a Git repository with a current branch that has
  diverged from its base branch.
- The user must supply the acceptance criteria to check against; the skill
  does not infer them from a ticket system.

## Output Format

Present a Markdown report with:

- A table with columns: `#`, `Criterion`, `Verdict` (Met / Partially Met /
  Not Met), `Evidence` (file:line references).
- A short "Unmatched changes" note listing any changed files not tied to a
  criterion, if applicable.
- A one-line overall summary (e.g. "4 of 5 criteria met; 1 partially met").

## Read-Only Constraint

This skill only reads Git history and file contents to produce its report.
It must never edit files, stage changes, commit, or alter branch state.
