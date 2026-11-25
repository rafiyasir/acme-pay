# ADR-004: Store salary as an integer in whole currency units

- Status: accepted
- Date: 2026-11-25

## Context
Floating point numbers cause rounding bugs with money. Annual salaries do not need paise or cents.

## Options considered
1. `float`: simple, but inexact.
2. `numeric(12,2)`: exact, but the driver returns strings, which adds parsing everywhere.
3. `integer` / `bigint` in whole units: exact and simple.

## Decision
Store salary as an integer in whole currency units. Rounding (half up) happens in one place, in the `Money` value object.

## Consequences
- No float errors, no string parsing.
- Monthly figures are rounded to whole units. If sub-unit precision is ever needed, move to minor units (multiply by 100).
