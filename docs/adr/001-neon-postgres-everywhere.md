# ADR-001: Neon Postgres for all environments

- Status: accepted
- Date: 2026-11-25

## Context
The assessment asks for a relational database. Reviewers should be able to run the app, and tests must be fast and deterministic. Docker is not used on the development machine.

## Options considered
1. SQLite: zero setup, but needs a persistent volume when deployed and has no `percentile_cont`.
2. Local Postgres: real Postgres, but every reviewer needs to install or run it.
3. Neon Postgres with branches (dev, test, prod): one engine everywhere, managed hosting, free tier.

## Decision
Neon Postgres, with separate branches for dev, test and prod. One driver, one SQL dialect.

## Consequences
- Real Postgres features (`percentile_cont`) for pay statistics.
- Integration tests need network access and are slower, so business logic is unit-tested against in-memory fakes and only repositories hit the database.
- Free tier scales to zero when idle, so the first request after a pause is slower.
- Running locally needs a connection URL (any Postgres works).
