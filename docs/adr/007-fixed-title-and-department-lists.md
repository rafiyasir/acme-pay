# ADR-007: Fixed job titles, with the department derived from the title

- Status: accepted
- Date: 2026-11-25

## Context
Pay statistics group by job title. With free text, "SWE", "Software Engineer" and "software engineer" become three groups and the bands break.

## Decision
Job titles (8) come from a reference table. Each title belongs to one of 5 departments, so the department is derived from the title and not entered separately. The UI offers titles as a dropdown and shows the department read-only.

## Consequences
- Clean, reliable grouping for statistics.
- A department and a title can never disagree, so department filters and labels are always consistent.
- A title that spans departments (for example a Data Analyst inside Sales) needs a new title, not a different department.
- Adding a title is a data change (migration or admin action), not free typing. Managing the lists in the UI is left out of v1.
