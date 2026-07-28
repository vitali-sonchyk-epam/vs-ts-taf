---
name: review-github-pr
description: Review a GitHub pull request using GitHub MCP tools and produce a structured Markdown review report. Use when the user wants to audit, summarise, or sanity-check a PR hosted on GitHub via MCP tooling.
---

# Review Github Pr

## Table of Contents

- [Overview](#overview)
- [When to Use This Skill](#when-to-use-this-skill)
- [Instructions](#instructions)
- [Prerequisites](#prerequisites)
- [Output Format](#output-format)
- [Read-Only Constraint](#read-only-constraint)

## Overview

This skill reviews a pull request hosted on GitHub by fetching its metadata,
diff, and existing review comments through the available GitHub MCP tools, then
writes a structured Markdown review report to disk. It is read-only against
GitHub: it never approves, merges, comments on, or otherwise mutates the PR —
the only artefact it produces is the local report.

## When to Use This Skill

Use this skill when the user asks to:

- Review a specific GitHub pull request by number or URL via MCP tools.
- Audit a colleague's PR before approving it or requesting changes.
- Generate a Markdown summary of the risks, findings, and test coverage of a
  GitHub-hosted PR.

Do **not** use this skill to review a local uncommitted or committed diff (use
`review-uncommitted-changes` or `review-committed-files`), and never use it to
post comments, approve, or merge the PR on GitHub.

## Instructions

1. **Resolve the PR reference** from the user's request: a repo
   `owner/name` plus PR number, or a full GitHub PR URL. If nothing
   identifiable is given, ask the user for the PR number or URL.
2. **Resolve `outputDir`**, defaulting to `./reviews`; create it if missing.
3. **Fetch PR metadata** (title, author, base/head branches, description,
   status) using the GitHub MCP tools.
4. **Fetch the changed files and diff** for the PR using the GitHub MCP tools.
5. **Fetch existing review comments and discussion**, if any, using the GitHub
   MCP tools, to avoid duplicating feedback already given.
6. **Analyse** the diff for correctness, security (OWASP Top 10), test
   coverage, and project conventions, categorising each finding as Blocking,
   Suggestion, or Nit.
7. **Write the report** using the [Output Format](#output-format) to
   `<outputDir>/pr-review-<owner>-<repo>-<prNumber>.md`, appending a
   `-yyyyMMdd-HHmmss` suffix instead of overwriting an existing file.
8. **Report back** the report path as a Markdown link plus a one-paragraph
   summary of the headline findings and recommendation.

## Prerequisites

- GitHub MCP tools must be configured and available in this environment
  (authenticated against the target repository).
- The output directory must be writable.

## Output Format

The Markdown report MUST contain these sections, in order:

1. **Title** — `# Review of PR #<number>: <PR title>`.
2. **Summary** — two- to four-sentence overview and headline recommendation.
3. **PR Details** — table with `Repository`, `Author`, `Base branch`,
   `Head branch`, `Status`.
4. **Files Changed** — table with columns `Path`, `Change`
   (`add`/`edit`/`delete`/`rename`), `Lines (+/-)`.
5. **Findings** — three H3 subsections: `### Blocking`, `### Suggestions`,
   `### Nits`. Each bullet starts with the file path and line range (when
   applicable), then a short rationale.
6. **Test Coverage** — whether the change is covered by tests and any gaps.
7. **Recommendation** — one of `Approve`, `Approve with suggestions`,
   `Request changes`, or `Needs discussion`, plus one sentence of rationale.

## Read-Only Constraint

This skill MUST NOT mutate the pull request or repository on GitHub. Never use
an MCP tool that approves, merges, closes, comments on, or edits the PR, and
never push commits or branches. Use only read-only GitHub MCP tools (fetching
PR metadata, diffs, files, and comments). The only file written is the
Markdown report under `outputDir`. If the user asks for the review to be
posted as a PR comment or for the PR to be approved/merged, decline, point them
at the report, and stop.
