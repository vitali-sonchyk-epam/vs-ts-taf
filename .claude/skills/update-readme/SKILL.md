---
name: update-readme
description: Update the project's README.md so it accurately reflects the current codebase structure, scripts, and setup steps. Use when the user wants to refresh, regenerate, or sync the README with the actual project.
---

# Update README

## Table of Contents

- [Overview](#overview)
- [When to Use This Skill](#when-to-use-this-skill)
- [Instructions](#instructions)
- [Prerequisites](#prerequisites)
- [Guidelines](#guidelines)

## Overview

This skill inspects the current project and updates `README.md` so it matches the
real state of the codebase — folder structure, available scripts, test suites,
prerequisites, and setup steps. It edits the existing `README.md` in place
(creating one only if none exists) and never touches source or test files.

## When to Use This Skill

Use this skill when the user asks to:

- Refresh, regenerate, or rewrite the project `README.md`.
- Sync the README with the current folder structure or available scripts.
- Document how to install dependencies and run the tests.
- Fill out a stub or empty README for the project.

Do **not** use this skill to write API docs for individual modules or to generate
changelogs — it maintains the top-level `README.md` only.

## Instructions

1. **Read the current `README.md`** (if present) to preserve intentional prose,
   badges, or licensing notes the maintainer already wrote.
2. **Inspect the project** to gather accurate facts: the top-level layout (for
   example `src/`, `tests/`, `config/`); `package.json` scripts, dependencies, and
   the test runner if one exists (if there is no `package.json`, note that setup
   is not yet defined rather than inventing commands); the test suites under
   `tests/`; and any config files under `config/` or the root.
3. **Draft the README** with these sections, omitting any that do not apply: title
   and one-line description; Prerequisites; Installation (only if a manifest
   exists); Project Structure (a short annotated tree); Running Tests (the actual
   scripts per suite); Configuration; and Contributing / License (preserve
   existing content).
4. **Never invent commands or dependencies.** Only document scripts, tools, and
   folders that actually exist. Where information is missing, add a short `_TODO_`
   note rather than guessing.
5. **Write the result to `README.md`** using the editor's file tools, preserving
   the maintainer's tone where reasonable.
6. **Report back** a short summary of what changed (sections added, updated, or
   flagged as TODO).

## Prerequisites

- The project root must be writable so `README.md` can be updated.
- Read access to the project files being documented.

## Guidelines

- Prefer accuracy over completeness: a short, correct README beats a long,
  speculative one.
- Keep the structure tree shallow (top-level folders plus one level where it aids
  understanding).
- Use fenced code blocks for all commands and directory trees.
- Do not add badges or links to services the project is not actually using.
