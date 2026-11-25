# ADR-005: Flat deduction rates as a lookup table

- Status: accepted
- Date: 2026-11-25

## Context
HR wants to see gross versus take-home pay. Real tax rules are complex and out of scope.

## Options considered
1. Strategy pattern with a `DeductionPolicy` class per country.
2. A lookup table of flat rates and one function.

## Decision
Option 2: `{ IN: 0.10, US: 0.12 }`, other countries 0. The rates are illustrative, not real tax.

## Consequences
- Simplest code that meets the need; one function to test.
- When a country needs real slabs or several components, introduce a `DeductionPolicy` interface. Not before.
