# Specs

One spec per slice of work. Written (and reviewed by me) before implementation.
Status is `todo` (no spec file yet), `draft`, `approved` or `done`. Update it when a spec changes state, so a new session knows where the project stands.
Backend first: specs 00 to 07b finish the API (deployed, with Swagger), then 08 to 11 build the web app on it.

| # | Spec | Area | Status |
|---|---|---|---|
| 00 | API setup and deployed walking skeleton | setup | approved |
| 01 | Money and Employee domain | domain | todo |
| 02 | Create and get employee (persistence) | api | todo |
| 03 | Seed 10,000 employees | data | todo |
| 04 | List employees: search, filters, sort, pagination | api | todo |
| 05 | Update and delete employee | api | todo |
| 06 | Gross to net | domain, api | todo |
| 07 | Pay band statistics | api, sql | todo |
| 07b | CSV export of the filtered employee list (streamed, same filters as spec 04) | api | todo |
| 08 | Frontend shell, design tokens, health check page, Vercel deploy | web | todo |
| 09 | People screen | web | todo |
| 10 | Employee detail card and forms | web | todo |
| 11 | Pay bands screen | web | todo |
| 12 | Polish and README | docs | todo |

Every spec lists a "Read first" set of files. Nice to have (after 12): saved views.

## What the design needs from the specs

- **Spec 04** includes the pay position filter (P8), the outliers-only filter, filter option counts
  (headcount per option under the other active filters), the reference lists (job titles, departments,
  countries with currency, and each job title with its department), and each row's net salary and group median.
- **Spec 07** returns per group the P2 statistics including whiskers, plus the outlier lists.
- **Spec 04** also applies the search rule (L1) and the page size rule (L2).
- **Spec 07b** exports the rows matching the same filters as spec 04 (L3, L4), streamed from SQL.
- **Spec 09** wires the Export button to spec 07b, and makes the ⌘K pill and shortcut focus the People search box.
- **Specs 09 to 11** implement the mockups listed in `docs/design/README.md`.
