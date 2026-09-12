---
description: Update README.md so it accurately reflects the current project structure, scripts, and setup steps.
argument-hint: [optional focus, e.g. "running tests" or "structure"] (defaults to a full refresh)
allowed-tools: Read, Write, Glob, Grep, Bash(git ls-files:*)
---

Update the project `README.md` so it accurately reflects the current codebase.

Use the **update-readme** skill in `.claude/skills/update-readme/SKILL.md` for the
full workflow and section list.

Focus for this update: $ARGUMENTS

If nothing is given above, do a full refresh of the whole README.

Steps:

1. Read the existing `README.md` (if any) to preserve intentional prose, badges,
   and licence notes.
2. Inspect the project — folder layout, `package.json` scripts and test runner
   (if present), and the test suites under `tests/` — to gather accurate facts.
3. Draft/update the README sections (title, prerequisites, installation,
   structure, running tests, configuration), omitting sections that do not apply
   and never inventing commands or dependencies.
4. Write the result to `README.md` and report a short summary of what changed.
