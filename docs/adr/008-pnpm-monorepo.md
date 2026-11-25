# ADR-008: One repository with pnpm workspaces

- Status: accepted
- Date: 2026-11-25

## Context
The app has an API and a web client. Reviewers need one link, and validation schemas can be shared.

## Decision
One repository with pnpm workspaces: `api/` and `web/`. Each is deployed on its own host, using the host's root directory setting (ADR-009).

## Consequences
- One clone, one README, one commit history for the reviewer.
- Two deploy targets from one repo. A separate repo per app was rejected: it splits the history the assessment asks to see and gains nothing, because both hosts support a root directory.
- pnpm keeps dependencies strict (undeclared imports fail early) and installs fast.
