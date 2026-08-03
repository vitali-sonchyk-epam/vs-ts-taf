---
name: create-claude-skill
description: Scaffold a new Claude skill (SKILL.md) together with its matching slash command in this project's .claude/ folder, following the conventions of the existing skills. Use when the user asks to create, add, scaffold, or generate a new Claude skill or command.
---

# Create Claude Skill

## Table of Contents

- [Overview](#overview)
- [When to Use This Skill](#when-to-use-this-skill)
- [Instructions](#instructions)
- [Required and Optional Sections](#required-and-optional-sections)
- [SKILL.md Structure](#skillmd-structure)
- [Command Conventions](#command-conventions)
- [Prerequisites](#prerequisites)
- [Guidelines](#guidelines)

## Overview

This skill scaffolds a **new Claude skill** in the current project and **always
creates a matching slash command for it** in the same pass. It derives the slug,
title, description, and body from a short plain-text brief and writes two files
that follow the conventions of the existing skills under `.claude/`:

- `.claude/skills/<name>/SKILL.md` — the skill definition.
- `.claude/commands/<name>.md` — the slash command that invokes the skill.

A skill is never scaffolded without its command: every skill produced by this
workflow is paired with a `.claude/commands/<name>.md` file so it is invokable as
`/<name>` from day one.

## When to Use This Skill

Use this skill when the user asks to:

- Create, add, scaffold, or generate a new Claude skill for this project.
- Turn an ad-hoc workflow into a reusable, discoverable Claude skill.
- Bootstrap a `SKILL.md` plus its matching `/`-command from a short description.

Do **not** use this skill to edit an existing skill, to create GitHub Copilot
customizations (`.github/`), or to author non-Claude tooling — it scaffolds
Claude skills and their commands only.

## Instructions

1. **Take the brief as a single plain-text description.** Do not interview the
   user field by field. Only ask one open clarifying question if the brief is
   missing entirely or too short to identify a subject and a purpose.
2. **Derive the fields** from the brief:
   - `name` — a kebab-case slug of 2–5 words capturing the noun + key action
     (for example `generate-page-object`). Must match
     `^[a-z][a-z0-9-]*[a-z0-9]$`.
   - `title` — the Title-Cased human form of `name`.
   - `description` — one sentence covering **what** the skill does and **when**
     to use it (include a "Use when…" clause), kept under ~50 words.
   - `whenToUse` — 3–5 concrete user requests that should match the skill.
   - `instructions` — numbered steps for the happy path the brief describes.
   - `allowedTools` — the minimal Claude tool list the command needs (see
     [Command Conventions](#command-conventions)).
   - `argumentHint` — a short hint describing what `$ARGUMENTS` should contain,
     including any default.
3. **Decide the optional sections** using [Required and Optional Sections](#required-and-optional-sections):
   - Include `## Output Format` only if the skill produces a structured
     artefact (a report, file, or table).
   - Include a closing `## Read-Only Constraint` if the skill must not mutate
     state, otherwise include `## Guidelines` for general do/don't notes. Include
     neither only if truly nothing applies.
4. **Resolve target paths** relative to the project root:
   - Skill: `.claude/skills/<name>/SKILL.md`
   - Command: `.claude/commands/<name>.md`
5. **Refuse to overwrite.** If either file already exists, stop and tell the
   user; suggest a more specific name or editing the existing files directly.
6. **Write the SKILL.md** using [SKILL.md Structure](#skillmd-structure).
7. **Write the matching command** using [Command Conventions](#command-conventions).
   This step is mandatory — never finish with a skill but no command.
8. **Report back** the path of both created files as Markdown links plus a
   one-line summary of what was scaffolded, and remind the user to reload Claude
   so the new `/<name>` command appears.

## Required and Optional Sections

Derived from the existing skills under `.claude/skills/`. A scaffolded
`SKILL.md` MUST contain the required sections in this order and MAY add the
optional ones when they apply.

| Section | Required? | Include when |
|---------|-----------|--------------|
| YAML frontmatter (`name`, `description`) | Required | Always. |
| `# <Title>` | Required | Always. |
| `## Table of Contents` | Required | Always — bullet links to every H2 that follows. |
| `## Overview` | Required | Always — 2–4 sentences on what the skill does and its constraints. |
| `## When to Use This Skill` | Required | Always — bulleted matching requests plus a "Do not use" note. |
| `## Instructions` | Required | Always — numbered, imperative steps. |
| `## Prerequisites` | Required | Always — list setup/access needed, or a single bullet stating none. |
| `## Output Format` | Optional | The skill writes a report or other structured artefact. |
| `## Read-Only Constraint` | Optional | The skill must not mutate the repo, remote, or files beyond its output. |
| `## Guidelines` | Optional | General do/don't notes when there is no strict read-only constraint. |

Rules:
- Use only one of `## Read-Only Constraint` or `## Guidelines` as the closing
  section, not both. Prefer `## Read-Only Constraint` for review/inspection
  skills.
- Do not add sections beyond this set unless the brief clearly needs them.

## SKILL.md Structure

Render the skill in exactly this shape, substituting the derived values and
dropping optional sections that do not apply:

```markdown
---
name: <name>
description: <description>
---

# <Title>

## Table of Contents

- [Overview](#overview)
- [When to Use This Skill](#when-to-use-this-skill)
- [Instructions](#instructions)
- [Prerequisites](#prerequisites)
<!-- Add a bullet for each optional section you include, in the same order. -->

## Overview

<2–4 sentence overview.>

## When to Use This Skill

Use this skill when the user asks to:

- <request 1>
- <request 2>
- <request 3>

Do **not** use this skill to <out-of-scope note>.

## Instructions

1. **<Step 1>** …
2. **<Step 2>** …

## Prerequisites

- <prerequisite, or "None — this skill needs no special setup.">

<!-- Optional: ## Output Format when a structured artefact is produced. -->
<!-- Optional closing: ## Read-Only Constraint OR ## Guidelines. -->
```

## Command Conventions

Every skill is scaffolded with a matching command at
`.claude/commands/<name>.md`. Render it in exactly this shape:

```markdown
---
description: <one-line imperative description of what the command does>
argument-hint: <argumentHint>
allowed-tools: <minimal comma-separated tool list>
---

<One or two sentences describing what the command does.>

Use the **<name>** skill in `.claude/skills/<name>/SKILL.md` for the full
workflow<, output format, and constraints as applicable>.

<Label for the argument>: $ARGUMENTS

If nothing is given above, <default behaviour>.

Steps:

1. <condensed step 1>
2. <condensed step 2>
3. <condensed step 3>
```

`allowed-tools` guidance:
- Grant only what the workflow needs. Prefer scoped `Bash(<cmd>:*)` entries (for
  example `Bash(git diff:*)`) over a blanket `Bash`.
- Add `Read`, `Glob`, `Grep` for inspection; add `Write` only if the skill
  creates or edits files.
- For read-only skills, never include mutating Bash commands.

## Prerequisites

- The project must contain a `.claude/` folder (create `.claude/skills/` and
  `.claude/commands/` if either is missing).
- Write access to the project so the two files can be created.

## Guidelines

- Never rewrite the brief verbatim into `description` or `instructions` — phrase
  them in the canonical style of the existing skills.
- Keep the command a thin pointer to the skill; the skill holds the full detail.
- Always produce both files. A skill without its command, or a command without
  its skill, is an incomplete result.
- Do not create GitHub Copilot artefacts (`.github/`); this project uses Claude
  skills only.
