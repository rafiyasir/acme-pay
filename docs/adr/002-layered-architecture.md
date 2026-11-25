# ADR-002: Layered architecture with a pure domain

- Status: accepted
- Date: 2026-11-25

## Context
The code must be easy to read, easy to test, and easy to change. Business rules (salary, deductions, statistics) are the core of the product.

## Options considered
1. Express routes calling TypeORM directly: least code, but rules end up scattered and tests need a database.
2. NestJS: structure and DI built in, but more framework surface than this app needs.
3. Express with hand-wired layers (domain, application, infrastructure, http) and TypeORM in Data Mapper style.

## Decision
Option 3. The domain has no framework imports. Use cases receive repositories through constructor interfaces. Wiring happens in one file (`container.ts`).

## Consequences
- Domain and use cases are tested in milliseconds with in-memory fakes.
- Swapping the ORM or database touches only infrastructure.
- A mapper between domain and persistence entities adds a little code; accepted for the separation.
