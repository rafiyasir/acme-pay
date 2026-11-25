# acme-pay

Salary management for ACME's HR manager: manage 10,000 employees across 6 countries and see how the organisation pays people.

## Start here

| Read | Why |
|---|---|
| [Requirements](docs/requirements.md) | Goal, the HR questions answered, scope, and what was left out |
| [Business rules](docs/business-rules.md) | Salary, currency, deductions, statistics |
| [Architecture](docs/architecture.md) | Layers and request flow |
| [Design](docs/design/) | Design system and mockups |
| [Decisions (ADRs)](docs/adr/) | Trade-offs behind each choice |
| [Specs](docs/specs/) | How the work was sliced and built |
| [AI workflow](docs/ai-workflow.md) | How AI was used, and where it was corrected |

## Run it locally

Needs Node 24 (`.nvmrc`) and pnpm 10 (`corepack enable` picks the right version).

1. Create a free Postgres database on [Neon](https://neon.tech) (or use a local Postgres). Neon branches `dev` and `test` keep development and tests apart.
2. In `api/`, copy the variables from `.env.example` into two files (both gitignored):
   - `.env.development`: `DATABASE_URL`, `WEB_ORIGIN`, `PORT`
   - `.env.test`: `TEST_DATABASE_URL` only
   Use the direct connection string with `sslmode=require`.
3. Install and start:

```
pnpm install
pnpm dev
```

| Command | What it does |
|---|---|
| `pnpm dev` | API with reload, reads `api/.env.development` |
| `pnpm test` | Unit tests (no network, no database) |
| `pnpm test:integration` | Repository tests against `TEST_DATABASE_URL`; refuses to run without it |
| `pnpm lint` | ESLint and Prettier check |
| `pnpm build` / `pnpm start` | Compile and run the API (variables come from the environment) |
| `pnpm migrate` | Run migrations on the branch in `DATABASE_URL`. Reads `api/.env.development` if it exists; a value set in the shell wins, so `DATABASE_URL=<branch url> pnpm migrate` targets any branch. Run it once per Neon branch |

Check it works: `GET http://localhost:3000/api/health` returns `{ "status": "ok", "db": "ok" }`. Swagger UI is at `/api/docs`.

## Deploying the API (Render)

Render builds from the repo root so it finds the pnpm workspace:

- Region: Singapore. Build command: `pnpm install --frozen-lockfile && pnpm --filter api build`. If the build says `tsc` is not found, Render skipped dev dependencies: use `pnpm install --frozen-lockfile --prod=false`. Start command: `pnpm --filter api start`.
- Build filter: `api/**`, `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, so web-only changes do not redeploy the API.
- `WEB_ORIGIN` is the bare origin, for example `https://acme-pay.vercel.app`, with no trailing slash (the API refuses to start otherwise).
- Environment variables (set in the dashboard, there is no local production file): `DATABASE_URL` (Neon `main` branch), `WEB_ORIGIN`, `PORT` if Render does not set it.
- **Cold start:** the free tier sleeps after 15 minutes idle and takes about a minute to wake, and Neon also scales to zero. The first request after a pause is slow.
