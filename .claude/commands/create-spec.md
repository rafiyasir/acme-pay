---
description: Create a spec and its branch. Usage: /create-spec 04 list-employees
argument-hint: "<NN> <short-name>"
allowed-tools: Read, Write, Edit, Glob, Bash(git status:*), Bash(git switch:*), Bash(git log:*)
---
Input: $ARGUMENTS

1. Run `git status --porcelain`. If anything is uncommitted, stop and ask me to commit or stash.
2. Parse `NN` (two digits, or `07b` style) and the kebab-case short name. Ask if unclear.
3. Read @docs/specs/README.md. Confirm the spec is listed and its Status is `todo`. If it is not listed, ask.
4. Read @docs/specs/_template.md, the specs this one depends on, and only the business rules,
   ADRs and design files it needs (the mockups are large; read only the ones named in
   `docs/design/README.md` for this spec).
5. Create the branch from `main`: `git switch main` then `git switch -c <type>/NN-name`, where
   type is `chore` for setup, `docs` for docs, and `feat` otherwise.
6. Write `docs/specs/NN-name.md` from the template, Status `draft`. Keep it short:
   reference business rule IDs instead of restating them, fill the "Read first" list, and make each
   test case line specific enough to become one test. List open questions at the bottom instead of guessing.
7. Set the spec's Status to `draft` in the table in `docs/specs/README.md`.
8. Reply with: branch, spec file, number of test cases, and the open questions.
   Do not commit and do not write code.

Design gate: if a UI spec needs a screen that has no mockup, stop and say which one.
