# How AI was used

Tool: Claude Code, guided by `CLAUDE.md` and the commands in `.claude/commands/`.

## Workflow

1. I write or edit the spec for a slice (`/create-spec` drafts it, I make the decisions).
2. Claude Code proposes a plan in plan mode; I review and adjust it.
3. `/build` implements test-first. Claude Code commits each red and green step on the spec branch and stops after each test case for my review (a `fast` option stops only at the end).
4. I test manually (Swagger / browser), run `/review`, then push and open the PR myself.

The first drafts of the requirements, business rules, ADRs and the design mockups were produced with Claude
(in claude.ai chat). I reviewed them, kept what I can defend, and changed the rest (for example: departments
reduced to 5, outliers promoted to must-have, backend-first build order).

## What I delegated vs kept

| Delegated to AI | Kept for myself |
|---|---|
| Boilerplate, test scaffolding, Zod/OpenAPI wiring | Requirements, scope, business rules |
| First drafts of specs and ADRs | Architecture and trade-off decisions |
| Seed data generation | Reviewing every diff before commit |

## Spec 00 notes

- Claude chose `cors({ origin: [webOrigin] })` over a plain string after the CORS test failed: a string sends the allowed origin on every response, the array only on a match.
- A failed green step was committed by mistake (the shell chain did not stop on a failing test). The unpushed commit was amended once the test passed, and later steps stop on failure before committing.
- Claude dropped the planned `CheckHealth` use case: it only forwarded one call, so the route uses the `DatabaseHealth` port directly.
- Added one test beyond the red list (OpenAPI lists `/api/health`) so the Swagger checkbox is backed by a test.
- typescript-eslint did not support TypeScript 7, so TypeScript is pinned to 6.
