# ADR-010: Web stack: Tailwind, shadcn/ui, TanStack Query, React Router

- Status: accepted
- Date: 2026-11-25

## Context
The design has custom shapes (pills, notched panels) and needs accessible menus, dialogs and a bottom sheet. The code must stay readable and small, and the brief allows any component library.

## Options considered
1. MUI or Chakra: complete components, but their look fights this design and overriding it costs more than it saves.
2. Plain CSS and hand-built components: full control, but accessible menus, dialogs and sheets built by hand are slow and easy to get wrong.
3. Tailwind with shadcn/ui: the components are copied into the repo on top of Radix primitives, so we own and can restyle them; design tokens map to CSS variables.

## Decision
Option 3, on React, Vite and TypeScript, with these pieces and nothing else:
- Tailwind and shadcn/ui for Dialog, Sheet, Popover, Select, Checkbox and Sonner toasts. Add components only when a screen needs them.
- TanStack Query for server data (caching, loading and error states).
- React Router, with filters, search and page kept in the URL. This makes the ↗ links, back button and shared links work.
- React Hook Form with Zod for the employee form.
- `@fontsource/outfit` for the font (no runtime call to Google Fonts) and `lucide-react` for icons.
- Vitest with React Testing Library for tests.

Not used: a chart library (bands and box plots are drawn with CSS, as in the mockups), a table library (a plain table with server-side paging is enough), global state libraries (server state lives in TanStack Query, view state in the URL), CSS-in-JS.

## Consequences
- The notch shapes live in one small stylesheet next to `tokens.css`, not as long utility strings.
- shadcn components are our code once copied, so we maintain them.
- More packages than a bare React app; each one has a single clear job, and extra UI libraries need a new ADR.
