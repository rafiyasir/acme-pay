# Architecture

> Living document. Updated whenever the structure changes.

## Overview

```
Browser (React + Vite)
   │  HTTP JSON, cross-origin (CORS allows only the web origin)
   ▼
Express app ──► http (routes, Zod, errors, OpenAPI)
                  │
                  ▼
               application (use cases)
                  │ depends on interfaces
                  ▼
               domain (Employee, Money, rules)  ◄── infrastructure implements application interfaces
                                                     (TypeORM repositories, SQL queries)
                                                          │
                                                          ▼
                                                    Neon Postgres
```

The web stack is in ADR-010.
The web app and the API are deployed separately (ADR-009): web on Vercel, API on Render. The API allows only the web origin through CORS.
Build order: the API is built and deployed first (specs 00 to 07b); the web app and its Vercel deploy arrive in spec 08.

## Layers and rules

| Layer | Contains | May import |
|---|---|---|
| domain | Entities, value objects, business rules, domain errors | nothing outside domain |
| application | Use cases (`CreateEmployee`, `ListEmployees`, `GetPayBands`) and the interfaces they need (repositories, health check) | domain |
| infrastructure | TypeORM entities, mappers, repositories, SQL queries, migrations, seed | domain, application (to implement its interfaces) |
| http | Routes, Zod schemas, middleware, OpenAPI | application |
| container.ts | Wires everything together | all |

## Request flow (example: create employee)

1. `POST /api/employees` hits the route; Zod validates the body.
2. Controller calls `CreateEmployee.execute(input)`.
3. Use case builds an `Employee` (domain enforces invariants) and calls `employeeRepository.save()`.
4. TypeORM repository maps domain to persistence entity and inserts.
5. Errors bubble to the error middleware, which maps them to the standard error shape.

## Environments

| Env | Database | Used by |
|---|---|---|
| dev | Neon `dev` branch | local development, seeded |
| test | Neon `test` branch | integration tests only |
| prod | Neon `main` branch | API on Render (Singapore), web on Vercel; seeded once |
