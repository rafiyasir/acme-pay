# Design

Designed before implementation. Rules for building the UI: [design-system.md](design-system.md).

| Mockup | Implemented in |
|---|---|
| [people.html](mockups/people.html) | Specs 09, 10 |
| [pay-bands.html](mockups/pay-bands.html) | Spec 11 |
| [people-mobile.html](mockups/people-mobile.html) | Specs 09, 10 (responsive) |
| [pay-bands-mobile.html](mockups/pay-bands-mobile.html) | Spec 11 (responsive) |
| [employee-form.html](mockups/employee-form.html) | Spec 10 |
| [employee-form-mobile.html](mockups/employee-form-mobile.html) | Spec 10 (responsive) |
| [filter-menu.html](mockups/filter-menu.html) | Spec 09 |
| [states.html](mockups/states.html) | Specs 09 to 11 (every screen) |
| [command-palette.html](mockups/command-palette.html) | Stretch goal |

The mockups use a template runtime (`support.js`) that is not included, so they do not open on their own. Use them as a visual and markup reference only (see `design-system.md`). Numbers and logic inside them are illustrative: `docs/business-rules.md` is the source of truth (for example P4 includes exactly ±2%).

## Shown in mockups but not in v1
- Row checkboxes and select all (no bulk action in scope).
- Columns picker and Group by.
- "All people" view menu, and the mobile view pills (All, India engineering, Outliers): both are saved views, a nice-to-have. In v1 the country, job title and department filters do this job.
- Pay bands "Gross salary" and department dropdowns.
- The full command palette: the ⌘K pill only focuses the People search box in v1.
- Advanced filters (sliders) button: hidden; the filter pills cover v1.

## Export and ⌘K
- Export downloads a CSV of the current filtered list (spec 07b, button in spec 09).
- ⌘K (or clicking the pill) focuses the People search box. On Pay bands it goes to People first.

## Change to the mockups
- In the employee form, Department is read-only and follows the selected job title (rule E4).

## What the ↗ buttons do
There is no separate record page.
- Detail card ↗ opens the edit form.
- Pay bands drill-down card ↗ opens People filtered to that job title and country.
- Pay bands outliers card ↗ opens People filtered to that job title and country, outliers only (P5).

## Decisions
- Amounts always in local currency with the code shown (business rule DP2).
- Pay bands matrix uses a separate scale per country column, because currencies differ.
- Outliers follow the 1.5 × IQR rule and are presented as "review", not as a verdict.
- Visual style inspired by the Crextio HR dashboard concept by Nixtio (Dribbble), with a mint and lime palette.

## What the design needs from the API
- Each employee in list and detail responses includes the median of their role and country (vs median, band bar).
- Each employee row also includes net salary and pay position (above, at, below).
- Per role and country: headcount, min, max, average, median, 25th and 75th percentile, whisker low and high, outlier count.
- Outlier list per role and country.
- Headcount per country (segmented bar).
- Filter option counts (headcount per country, title and department under the other active filters).
- Reference lists for dropdowns (job titles with their department, countries with currency).
- Validation errors with field names, so the form can show them inline; 409 for duplicate email.
