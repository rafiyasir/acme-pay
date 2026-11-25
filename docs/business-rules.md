# Business rules

Single source of truth for domain behaviour. Specs and tests reference these rule IDs.

## Employees

| ID | Rule |
|---|---|
| E1 | Full name is required, 2 to 100 characters, trimmed. |
| E2 | Work email is required, valid, and unique (case-insensitive). A duplicate returns 409 `CONFLICT`. |
| E3 | Job title comes from a fixed list (8 titles). Free text is not allowed, so pay bands stay clean. |
| E4 | Department is derived from the job title and never entered separately (like currency, S2). There are 5 departments: Engineering (Engineering Manager, Senior Software Engineer, Software Engineer, QA Engineer), Product (Product Manager), Data (Data Analyst), Sales (Sales Executive), People (HR Business Partner). |
| E5 | Country is one of: IN, US, GB, DE, CA, SG. |
| E6 | Employment type is one of: full-time, part-time, contractor. |
| E7 | Hire date is required and cannot be in the future. Stored as a calendar date. |
| E8 | Internal ID is a UUID. A readable code (`EMP-00412`) is shown in the UI. |
| E9 | Delete is a hard delete, after a confirmation step in the UI. No history is kept (see requirements). |

## Salary and currency

| ID | Rule |
|---|---|
| S1 | Salary is the **gross annual** amount. |
| S2 | Currency is set by country: IN=INR, US=USD, GB=GBP, DE=EUR, CA=CAD, SG=SGD. It is never edited separately. |
| S3 | Stored as an **integer in whole currency units** (no decimals). See ADR-004. |
| S4 | Salary must be greater than 0 and below a sanity cap per currency (catches typos like an extra zero). |
| S5 | Changing an employee's country requires a new salary in the new currency. Never convert silently. |
| S6 | Amounts are never added or compared across currencies (ADR-003). |

## Deductions (gross to net)

| ID | Rule |
|---|---|
| D1 | India: TDS 10% of gross. |
| D2 | United States: withholding 12% of gross. |
| D3 | Other countries: no deduction rule (net equals gross). Shown as "No deduction rule". |
| D4 | Net monthly = net annual / 12. |
| D5 | Results are rounded half up to whole currency units. |

These are illustrative flat rates, not real tax calculations (ADR-005).

## Pay statistics

| ID | Rule |
|---|---|
| P1 | Statistics are grouped by **job title within a country**, in that country's currency. |
| P2 | Per group: headcount, min, max, average, median, 25th and 75th percentile, computed in SQL. Also `whiskerLow` and `whiskerHigh`: the min and max salary among non-outliers (Tukey box plot). The box plot draws P25, median, P75, the whiskers, and the outliers as points. |
| P3 | "vs median" compares an employee with the median of their own group. |
| P4 | Within ±2% of the median, boundaries included, counts as "at median". |
| P5 | Outliers: salary below P25 − 1.5 × IQR or above P75 + 1.5 × IQR, where IQR = P75 − P25. |
| P6 | Median is shown for any group with at least 1 person. Band and outliers only when the group has **5 or more** people; otherwise show "too few people". |
| P7 | Country totals (headcount, total payroll) are per country, in local currency. |
| P8 | Pay position of an employee is `above`, `at` or `below` the median of their group (uses P3 and P4). The people list can filter by it. It can also filter to outliers only (P5). |

## List and export

| ID | Rule |
|---|---|
| L1 | Search is case-insensitive "contains" on full name, work email and employee code (`EMP-00412`). |
| L2 | Lists are paginated on the server: default page size 10, maximum 100. |
| L3 | CSV export has one row per employee matching the current search, filters and sort, with no pagination. Columns: name, email, job title, department, country, currency, gross annual, net annual, vs median (%), hire date. |
| L4 | In the CSV, amounts are plain integers (no digit grouping, no currency symbol). Text values that start with `=`, `+`, `-` or `@` are prefixed with `'` so Excel does not run them as formulas. |

## Seed data

| ID | Rule |
|---|---|
| SD1 | Exactly 10,000 employees, generated with a fixed random seed (same data every run). |
| SD2 | Realistic spread: base salary per country and role, with variation, plus a small share of outliers. |
| SD3 | Names from per-country name lists; emails unique. |
| SD4 | Re-runnable: `pnpm seed:reset` clears and reseeds. |

## Display

| ID | Rule |
|---|---|
| DP1 | INR uses Indian digit grouping (18,40,000). Other currencies use standard grouping (142,000). |
| DP2 | Currency code is always shown next to an amount. |
| DP3 | Compact amounts only in pay-band matrix tiles: INR in lakhs with one decimal (`17.0L`), other currencies in thousands, rounded (`135k`). Full amounts everywhere else, and in the tile's `aria-label`. |
