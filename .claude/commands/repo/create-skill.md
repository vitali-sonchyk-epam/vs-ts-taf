---
description: Scaffold a new Claude skill (SKILL.md) and its matching slash command in .claude/, following the conventions of the existing skills.
argument-hint: <plain-text brief of the skill to create>
allowed-tools: Read, Write, Glob, Grep
---

Scaffold a new Claude skill and its matching slash command in this project's
`.claude/` folder.

Use the **create-claude-skill** skill in
`.claude/skills/create-claude-skill/SKILL.md` for the full derivation rules,
required/optional sections, and file templates.

Brief for the new skill: $ARGUMENTS

If no brief is given above, ask one short question for a plain-text description of
the skill to create, then stop until the user replies.

Steps:

1. Derive the fields (`name`, `title`, `description`, when-to-use bullets,
   instructions, `allowed-tools`, `argument-hint`) from the brief — do not
   interview field by field.
2. Decide which optional sections apply (`Output Format`, and one of
   `Read-Only Constraint` or `Guidelines`) using the skill's section table.
3. Refuse to overwrite: stop if `.claude/skills/<name>/SKILL.md` or
   `.claude/commands/<name>.md` already exists.
4. Write `.claude/skills/<name>/SKILL.md` and its matching
   `.claude/commands/<name>.md` — always create both, never a skill without its
   command.
5. Report both file paths back and remind the user to reload Claude so the new
   `/<name>` command appears.
