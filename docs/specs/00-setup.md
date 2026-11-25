# Spec 00: API setup and deployed walking skeleton

- Status: draft
- Branch: chore/00-setup

## Goal
A deployed API skeleton: Express reaches Neon, tests and lint run in CI, Swagger is live.
Backend comes first (specs 00 to 07b); the web app starts in spec 08. Every later API spec is live as soon as it merges.

## Depends on
Nothing.

## Read first
- `docs/architecture.md` (layers and environments)
- ADR-001 (Neon), ADR-002 (layers), ADR-009 (Render and Vercel split)

## Scope
In:
- pnpm workspace with `api/` (the `web/` package is added in spec 08); TypeScript strict; ESLint + Prettier; Vitest
- API: Express app, env validation with Zod, pino logging, error middleware with the standard error shape
- TypeORM DataSource connected to Neon (no entities yet), migrations folder and scripts
- `GET /api/health` returns `{ status: "ok", db: "ok" }` (or `db: "down"` with 503)
- OpenAPI generated from Zod, Swagger UI at `/api/docs`
- GitHub Actions: install, lint, unit tests on every push and PR
- Deploy the API to Render (Singapore region, root directory `api/`); Neon `main` branch for production (ADR-009)
- CORS allows only the origin in `WEB_ORIGIN` (no wildcard)
- `.env.example` documenting every variable

Out: any employee feature, any web code and the Vercel deploy (spec 08).

## API contract
`GET /api/health`
- 200 `{ "status": "ok", "db": "ok" }`
- 503 `{ "status": "degraded", "db": "down" }`

## Test cases (red list)
- [ ] health returns 200 with db ok when the database responds
- [ ] health returns 503 with db down when the database check fails (fake)
- [ ] unknown route returns 404 in the standard error shape
- [ ] invalid environment config fails at startup with a clear message
- [ ] CORS allows the configured web origin and no other

## Implementation notes
- The health check takes a small `DatabaseHealth` interface so it can be faked in tests.
- Root scripts: `dev`, `build`, `start`, `test`, `test:integration`, `lint`, `migrate`.
- Pin the Node and pnpm versions (`packageManager` field, `.nvmrc`).
- Render free web services sleep after 15 minutes idle and take about a minute to wake. Note the cold start in the README.
- Environment files, all in `api/` and gitignored except the example:
  - `.env.development`: `DATABASE_URL` (Neon `dev` branch), `WEB_ORIGIN`, `PORT`. Loaded by `pnpm dev` and the seed.
  - `.env.test`: `TEST_DATABASE_URL` (Neon `test` branch) only. Loaded by `pnpm test:integration`, which refuses to run without it.
  - `.env.example`: every variable name with a placeholder. The only committed one.
  - Production has no local file: the variables are set in the Render dashboard, so `seed:reset` cannot hit production by accident. Seed production once with a one-off command.
  - Pick one way to load the files (Node `--env-file` or `dotenv`) and make sure Vitest loads `.env.test` too.
  - Neon: use the pooled connection string for the running API and the direct one for migrations; both need `sslmode=require`. Run `pnpm migrate` separately for each branch.

## Manual test
1. `pnpm dev`, call `GET /api/health`: it returns `{ "status": "ok", "db": "ok" }`.
2. Open `/api/docs`: the health endpoint is listed and works from Swagger.
3. The deployed URL shows the same.

## Definition of done
- [ ] Tests green, lint clean, CI green
- [ ] Swagger shows health endpoint
- [ ] Deployed URL works
- [ ] README has run instructions
