# Requirements: acme-pay

Author: Rafi Uzzaman · Status: draft v1 · Written before any code

## Goal

ACME's HR team manages salaries for 10,000 employees in 6 countries using Excel.
acme-pay replaces the spreadsheet with web software where the HR manager can **manage salary data**
and **get clear answers about how the organisation pays people**.

## User

One persona: the **HR manager**. Comfortable with spreadsheets, not technical.
Needs to find any employee fast, keep records correct, and answer pay questions without building pivot tables.

## Questions the software answers

1. What do we pay in each country? (min, max, average, median, headcount). *Why:* the first thing leadership asks.
2. What does a given role earn in a given country? (median and middle 50%). *Why:* sets offers and raises.
3. Is this person paid in line with peers? (vs median for the same role and country). *Why:* the fairness check before a review.
4. Who is paid unusually high or low? (outliers, 1.5 × IQR rule). *Why:* finds data typos and pay gaps to review.
5. What does an employee actually take home? (gross to net). *Why:* HR explains offers in take-home terms.
6. What does each country cost? (total payroll, local currency). *Why:* budgeting per country.

## Scope

**Must have**
- Employees: create, view, edit, delete; search, filter (country, job title, department), sort, paginate
- Employee detail: gross to net, position against peers
- Pay bands: role × country matrix with median and middle 50%, drill-down per cell
- Outlier list per role and country (question 4), headcount by country bar
- CSV export of the filtered employee list (HR works in Excel today)
- ⌘K pill and shortcut focus the People search box (the full palette is a stretch goal)
- Seed script with 10,000 realistic employees
- Deployed app, tested API (Swagger)
- Build order: API first (deployed, Swagger), then the web app

**Nice to have** (only after must-haves are done and tested)
- Saved views (URL filter presets)
- Full command palette (⌘K)

## Deliberately left out

| Left out | Why |
|---|---|
| Authentication and roles | Single persona; effort goes to the core problem. First production addition (ADR-006). |
| Currency conversion | Needs exchange rates and a policy for which rate; comparisons stay within a country (ADR-003). |
| Real tax and payroll engine | Out of scope for an HR record tool; flat illustrative deduction rates instead (ADR-005). |
| Salary history and audit log | Needs change tracking; strong next step for trends over time. |
| Pay equity by gender or other attributes | Needs sensitive personal data not in scope. |
| Bulk CSV import | Valuable for migrating from Excel, but needs a robust validation and error-report flow. |
| "Ask a question" AI chat | Fixed reports answer the core questions more reliably; possible later. |
| Command palette (⌘K) | Designed, built only if time remains. |

## Assumptions (open questions sent to the hiring team)

Confirmed by the hiring team by email:
- Salaries are stored in local currency. A common-currency view is optional (fixed documented rates would be fine); left out of v1.
- Authentication is optional with a single HR manager; skipped, ADR-006 says how to add it.
- There is no fixed list of HR questions; choosing them and explaining why is part of the assessment.

My own assumptions: 6 countries, 8 job titles, 5 departments, flat illustrative deduction rates.

## Success criteria

- HR can find any employee in under 3 interactions and edit them safely.
- Every question above is answered on screen, with numbers that match the SQL in tests.
- List and stats endpoints respond quickly on 10,000 rows (see `docs/performance.md`).
- A reviewer can run the app and tests by following the README alone.
