---
name: fix-pr-review-comments
description: Fetch a GitHub pull request's review comments by PR id via MCP tools, propose and implement fixes for each, and confirm with the user before applying them. Use when the user wants to address reviewer feedback on an open PR.
---

# Fix Pr Review Comments

## Table of Contents

- [Overview](#overview)
- [When to Use This Skill](#when-to-use-this-skill)
- [Instructions](#instructions)
- [Prerequisites](#prerequisites)
- [Guidelines](#guidelines)

## Overview

This skill fetches the review comments left on a GitHub pull request (by PR
id) using GitHub MCP tools, works out a concrete code fix for each actionable
comment, and applies those fixes to the local working tree — but only after
the user confirms the plan. It never pushes, replies to comments, or resolves
threads on GitHub; it only edits local files.

## When to Use This Skill

Use this skill when the user asks to:

- Address or resolve the review comments left on a specific PR by its id.
- Pull reviewer feedback from GitHub and implement the requested changes.
- Go through outstanding PR comments one by one and fix what's actionable.

Do **not** use this skill to review a PR from scratch and produce a report
(use `review-github-pr`), and never use it to reply to, resolve, or dismiss
comments on GitHub, or to push/commit without being asked.

## Instructions

1. **Resolve the PR id** from the user's request (a PR number, optionally with
   `owner/repo`). If missing, ask the user for it.
2. **Fetch the PR's review comments** using GitHub MCP tools, including the
   file path, line/range, and comment body for each.
3. **Filter to actionable comments** — skip comments that are resolved,
   purely conversational, or already addressed by the current code.
4. **For each actionable comment**, locate the referenced code, and draft a
   concrete fix; note comments that are ambiguous or need a design decision
   instead of guessing.
5. **Present the plan** to the user: a numbered list mapping each comment to
   its proposed fix (or to "needs clarification"), and **ask for confirmation**
   before changing any file.
6. **On confirmation**, implement the confirmed fixes with Edit/Write, keeping
   changes scoped to what each comment asked for.
7. **Report back** which comments were fixed, which were skipped and why, and
   remind the user that nothing was committed, pushed, or replied to on
   GitHub — that remains their action.

## Prerequisites

- GitHub MCP tools must be configured and available in this environment
  (authenticated against the target repository).
- The PR's base branch/commit should be checked out or otherwise available
  locally so the referenced files can be edited.

## Guidelines

- Always show the fix plan and get explicit user confirmation before editing
  any file — never apply fixes silently.
- If a comment's intent is ambiguous, ask rather than guessing at a fix.
- Keep each fix minimal and scoped to the comment it addresses; don't bundle
  unrelated cleanup into the same change.
- Never reply to, resolve, or dismiss PR comments on GitHub, and never commit
  or push — those are separate, user-initiated actions.
