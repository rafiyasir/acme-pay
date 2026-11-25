# ADR-006: No authentication in v1

- Status: accepted
- Date: 2026-11-25

## Context
The assessment defines a single persona (HR manager). Salary data is sensitive in real life.

## Decision
No authentication in this version. All API routes sit behind one `/api` router, so a `requireAuth` middleware can be added in one place.

## Consequences
- Time goes to the core problem instead of generic plumbing.
- The public demo is editable by anyone; data can be restored with `pnpm seed:reset`.
- Production path: single-role login with an httpOnly session cookie, then roles (admin, viewer) and an audit log of salary changes.
