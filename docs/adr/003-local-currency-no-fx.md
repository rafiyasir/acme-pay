# ADR-003: Salaries in local currency, no conversion

- Status: accepted
- Date: 2026-11-25

## Context
Employees are paid in six currencies. Averaging INR and USD together is meaningless.

## Options considered
1. Convert everything to USD with live rates: needs an external service and a policy for which rate and date.
2. Convert with a fixed rate table: simple, but numbers look precise while being arbitrary.
3. Keep local currency and only compare within a country.

## Decision
Option 3. Currency is derived from country. Statistics are grouped by country (and job title within it).

The hiring team confirmed by email that a common-currency comparison is optional and that documented fixed rates would be acceptable.

## Consequences
- Every number shown is honest and exact.
- No cross-country comparison in one currency. Listed as left out in the requirements; revisit if HR asks for it.
