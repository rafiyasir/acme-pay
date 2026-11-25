---
description: Strict review of the current changes (report only)
allowed-tools: Read, Grep, Glob, Bash(git diff:*), Bash(git log:*), Bash(git status:*)
---

Review the current branch against `main` (`git diff main...HEAD` plus uncommitted changes) as a strict
senior software craftsperson. Stop if the diff is empty.

Check:
- Does it do what the spec says, no more and no less?
- Business rules from `docs/business-rules.md` applied correctly?
- Readability: names, function size, unnecessary abstraction, clever code, noisy comments
- Layer rules from `CLAUDE.md` (domain stays pure, wiring only in container.ts)
- Tests: meaningful, behaviour-named, deterministic; missing edge cases
- Performance: N+1 queries, missing indexes, loading too much data
- Error handling and the standard error shape
- Secrets, personal data or links in code, logs or commit messages

Output a short list grouped as **Must fix**, **Should fix**, **Nit**, each with file and line.
Do not change any code.
