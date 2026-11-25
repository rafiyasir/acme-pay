# Requirements: acme-pay

Author: Rafi Uzzaman · Status: draft v1 · Written before any code

## Goal

ACME's HR team manages salaries for 10,000 employees in 6 countries in Excel.
acme-pay replaces the spreadsheet with web software where the HR manager can **manage salary data**
and **get clear answers about how the organisation pays people**.

## User

One persona: the **HR manager**. Comfortable with spreadsheets, not technical. Needs to find any employee fast,
keep records correct, and answer pay questions without building pivot tables.

## Questions the software answers

1. What do we pay in each country? (min, max, average, median, headcount). *Why:* the first thing leadership asks.
2. What does a role earn in a country? (median and middle 50%). *Why:* sets offers and raises.
3. Is this person paid in line with peers? (vs median). *Why:* the fairness check before a review.
4. Who is paid unusually high or low? (outliers, 1.5 × IQR). *Why:* finds data typos and pay gaps to review.
5. What does an employee take home? (gross to net). *Why:* HR explains offers in take-home terms.
6. What does each country cost? (total payroll, local currency). *Why:* budgeting per country.

## Scope

**Must have**
- Employees: create, view, edit, delete; search, filter (country, job title, department), sort, paginate
- Employee detail: gross to net, position against peers
- Pay bands: role × country matrix with median and middle 50%, drill-down, outlier list, headcount by country
- CSV export of the filtered list (HR works in Excel today); ⌘K focuses the search box
- Seed script with 10,000 employees; deployed app with a tested API (Swagger)

**Nice to have** (after the must-haves are done and tested): saved views, full command palette.

## Deliberately left out

| Left out | Why |
|---|---|
| Authentication and roles | Single persona; effort goes to the core problem (ADR-006). |
| Currency conversion | Needs rates and a policy for which rate; comparisons stay within a country (ADR-003). |
| Real tax and payroll engine | Out of scope for an HR record tool; flat illustrative rates instead (ADR-005). |
| Salary history and audit log | Needs change tracking; the natural next step. |
| Pay equity by gender or other attributes | Needs sensitive personal data not in scope. |
| Bulk CSV import | Needs a robust validation and error-report flow. |
| "Ask a question" AI chat | Fixed reports answer the core questions more reliably. |
| Full command palette | Only the shortcut that focuses search is built. |

## Assumptions

Confirmed by the hiring team by email: salaries are in local currency (a common-currency view is optional, left out);
authentication is optional for a single HR manager (skipped); there is no fixed list of HR questions.
My own assumptions: 6 countries, 8 job titles, 5 departments, flat illustrative deduction rates.

## Success criteria

- HR can find any employee in under 3 interactions and edit them safely.
- Every question above is answered on screen, with numbers that match the SQL in tests.
- List and stats endpoints respond quickly on 10,000 rows (`docs/performance.md`).
- A reviewer can run the app and tests from the README alone, which explains how to create a free Postgres
  database (Neon or local) and set `DATABASE_URL` and `TEST_DATABASE_URL`.
