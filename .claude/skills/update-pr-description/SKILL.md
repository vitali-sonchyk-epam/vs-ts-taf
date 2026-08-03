---
name: update-pr-description
description: Update a GitHub pull request's description via MCP tools so it accurately reflects the PR's actual changes, after user confirmation. Use when a PR's description is stale, missing, or out of sync with its diff.
---

# Update Pr Description

## Table of Contents

- [Overview](#overview)
- [When to Use This Skill](#when-to-use-this-skill)
- [Instructions](#instructions)
- [Prerequisites](#prerequisites)
- [Guidelines](#guidelines)

## Overview

This skill inspects a GitHub pull request's actual changes (commits, diff,
and existing description) via GitHub MCP tools, drafts an updated description
that accurately reflects what the PR does, and — once the user confirms —
writes that description back to the PR on GitHub. It only ever touches the
PR's description field; it never edits code, comments, approves, or merges.

## When to Use This Skill

Use this skill when the user asks to:

- Update, refresh, or rewrite a PR's description to match its current changes.
- Sync a PR's description after new commits were pushed to it.
- Fill in a missing or template-only PR description based on the real diff.

Do **not** use this skill to review a PR's quality (use `review-github-pr`),
to address reviewer feedback (use `fix-pr-review-comments`), or to edit
anything on the PR other than its description.

## Instructions

1. **Resolve the PR reference** from the user's request: `owner/repo` plus PR
   number, or a full GitHub PR URL. If nothing identifiable is given, ask the
   user for it.
2. **Fetch the PR's current description, commits, and diff/changed files**
   using GitHub MCP tools.
3. **Draft an updated description** that summarizes what actually changed
   (the "why" where the commit messages make it clear, otherwise the "what"),
   preserving any sections of the existing description worth keeping (e.g. a
   test plan checklist, linked issues) and correcting or removing parts that
   no longer match the diff.
4. **Show the user a diff** of the current vs. proposed description and **ask
   for confirmation** before writing anything to GitHub.
5. **On confirmation**, update the PR description using the GitHub MCP tools.
6. **Report back** whether the update was applied, and a link/reference to
   the PR.

## Prerequisites

- GitHub MCP tools must be configured and available in this environment
  (authenticated against the target repository, with permission to edit PR
  descriptions).

## Guidelines

- Always show the proposed description and get explicit user confirmation
  before writing it to GitHub — never update the PR silently.
- Preserve maintainer-authored content that is still accurate (linked issues,
  test plans, checklists); only rewrite parts that are stale or missing.
- Base the description on the actual commits/diff, not on assumptions —
  re-fetch if the PR has new commits since it was last inspected.
- Never edit code, comments, labels, reviewers, or merge state — this skill
  touches the description field only.
