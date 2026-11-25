---
description: Build an approved spec with TDD, one commit per step. Usage: /build 04 (add "fast" to stop only at the end)
argument-hint: "<NN> [fast]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git:*), Bash(pnpm:*)
---
Input: $ARGUMENTS (a spec number, optionally followed by `fast`)

1. Find `docs/specs/NN-*.md`. Stop if it is missing or its Status is not `approved`.
   Stop if the current branch is `main`.
2. If the spec file or the table in `docs/specs/README.md` has uncommitted changes, commit them first
   (`docs(spec): add spec NN`). Stage only those files.
3. Read the spec and the files in its "Read first" list. Nothing else unless needed.
   For UI work, also read `docs/design/design-system.md` and the mockups the spec names.
4. Propose a plan: files to create or change per layer and the order of the test cases.
   Wait for my approval, also in fast mode.
5. For each test case in the spec, in order:
   - **Red:** write the failing test, run it, show the failure. Commit it (`test(...)`).
   - **Green:** write the minimum code to pass, run the tests. Commit it (`feat(...)`).
   - **Refactor:** only if something is worth improving. Commit it (`refactor(...)`).
   - Then explain in three short lines: what changed, why this design, the trade-off.
   - **Stop and wait for me**, unless the input says `fast`. In fast mode keep going and give all the
     explanations at the end.
   - If a test still fails after 3 attempts, stop and report instead of looping.
6. After the last test case: run lint and all unit tests, update Swagger and docs as the spec requires,
   tick the spec's checklist, set its Status to `done` in the spec and in the table in
   `docs/specs/README.md` (commit that as `docs(spec): mark spec NN done`), and add anything notable
   about how AI was used to `docs/ai-workflow.md`.
7. Reply with: what was built, test results, the manual test steps from the spec, and
   "Test it, then run /review, then push and run /prepare-pr".

Follow the code style in `CLAUDE.md`: simple, readable, no unnecessary abstraction.
Stage only the files of each step. Never `--no-verify`. No links in commit messages. Never push.
