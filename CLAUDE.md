# acme-pay: working agreement

Salary management software for ACME's HR manager: 10,000 employees across 6 countries.
The two files below are loaded automatically at the start of every session:

@docs/requirements.md
@docs/business-rules.md

## How we work

- **Spec-driven.** Every unit of work has a spec in `docs/specs/`. Never build outside a spec.
  If something is missing from the spec, ask. Do not assume.
  Start by reading the spec's "Read first" list. Do not read other files unless needed (the mockups are large).
- **Plan first.** Start every spec in plan mode. Write nothing until the plan is approved.
- **TDD, in small steps.** Failing test, then minimum code to pass, then refactor.
  `/build NN` stops after each test case (red and green) and waits; `/build NN fast` stops only at the end.
- **Explain briefly after each step:** what changed, why this design, the trade-off.
  Name any principle or pattern you used and why it fits here.
- **Commits:** Claude Code makes one commit per TDD step (red, green, refactor) so the history shows
  the evolution. Only on a spec branch, never on `main`. Message is Conventional Commits, as suggested
  in the step. Stage only the files of that step. Never `--no-verify`.
- **Never push, open PRs, merge or delete branches.** The developer does that. The one exception is
  the developer running `/post-merge`, which deletes the merged local branch.
  `.claude/settings.json` denies `git push` and PR creation or merge.
- **No links in commits or PR bodies.** Never include session links or any link to an AI tool.
  A `Co-Authored-By` trailer is fine; no "Generated with" lines. `.claude/settings.json` sets the
  commit trailer and leaves PR attribution empty. AI use is also documented in `docs/ai-workflow.md`.

## Architecture (see docs/architecture.md)

```
api/src/domain          pure TypeScript: entities, value objects, rules, errors. No framework or DB imports.
api/src/application     use cases and the interfaces (ports) they need, e.g. repositories. Dependencies come in through constructors.
api/src/infrastructure  TypeORM entities, mappers, repositories, migrations, seed.
api/src/http            Express routes, Zod schemas, middleware, OpenAPI.
api/src/container.ts    the only place that wires dependencies together.
web/src                 React + Vite UI.
```

- Dependencies point inward: http -> application -> domain. Infrastructure implements the interfaces declared in application.
- TypeORM is used in Data Mapper style. Domain classes never import TypeORM.
- Schema changes only through migrations. Never `synchronize: true`.

- Web stack: see ADR-010 (Tailwind, shadcn/ui, TanStack Query, React Router). Do not add other UI libraries without a new ADR.
- Build order: backend first (specs 00 to 07b), then web (specs 08 to 11).
- For any UI work, follow `docs/design/design-system.md` and match `docs/design/mockups/`.
  Do not invent new colours, radii or components.
  Where `docs/design/README.md` lists something as "not in v1", it overrides the mockups: do not build it.

## Code style: simple, human-like, efficient

Readability
- Plain names (`activeEmployees`, not `filteredData`). Small functions. Early returns.
- No clever one-liners. A junior developer should follow every function on first read.
- Comments explain *why*, never restate *what*.
- No abstraction until there are two real uses. No generic base repository, no DI container library,
  no wrappers around libraries "just in case".
- Prefer a lookup table or a plain function over a design pattern when the logic is simple.
- Errors are handled once, at the boundary (error middleware). No try/catch in every function.
- Avoid noise: no redundant type annotations, no defensive checks for impossible cases,
  no helper files with one tiny function.
- TypeScript strict. No `any`.

Efficiency where it matters
- Aggregations run in SQL (`GROUP BY`, `percentile_cont`). Never load all employees into Node.
- Select only the columns needed. No N+1 queries. Index the columns we filter and group by.
- Lists are always paginated on the server. Offset pagination is fine at this size.
- Seed inserts in batches of about 1,000 rows inside one transaction.
- Frontend: server-side pagination and filters, debounced search, TanStack Query caching.

## API conventions

- Validate input with Zod at the http layer. Domain classes enforce their own invariants.
- One error shape everywhere:
  `{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [] } }`
- Error codes: `VALIDATION_ERROR` (400), `NOT_FOUND` (404), `CONFLICT` (409), `INTERNAL_ERROR` (500).
  Never leak stack traces.
- Every endpoint is registered in OpenAPI (generated from the Zod schemas), served at `/api/docs`.
- Logging with pino. No `console.log` in committed code.
- Config comes from environment variables, validated with Zod at startup. Fail fast.

## Testing

- Unit tests (`pnpm test`): domain and use cases with in-memory fakes. No network, no DB. Must stay fast.
- Integration tests (`pnpm test:integration`): repositories and SQL against the Neon **test** branch,
  using `TEST_DATABASE_URL` only. Refuse to run without it. Truncate tables before each test.
- API tests: Supertest against the Express app.
- Test names describe behaviour: `rejects a negative salary`, not `test createEmployee`.
- Deterministic: fixed seeds for random data, no reliance on the current time without a fixed clock.

## Git

- Branch per spec: `chore/00-setup`, `feat/04-list-employees`, `docs/12-readme`.
- Conventional Commits: `test(domain): ...`, `feat(api): ...`, `refactor(api): ...`, `docs(spec): ...`.
- PRs are merged with **merge commits** (never squash), so the TDD history stays visible.

## Definition of done (every spec)

- [ ] All tests green, lint clean
- [ ] OpenAPI / Swagger updated (API specs)
- [ ] Manual check from the spec passed
- [ ] Docs updated (ADR if a decision was made, architecture if structure changed)
- [ ] `docs/ai-workflow.md` updated with anything notable about how AI was used
