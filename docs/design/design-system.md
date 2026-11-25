# Design system

Rules for all UI work. Match `mockups/` and do not invent new colours, radii or components.
Where `README.md` lists something as "not in v1", do not build it, even if a mockup shows it.
Mockups are visual reference only: they use a canvas template syntax (`<sc-for>`, `{{ }}`).
Rebuild them as React components; do not copy their markup.

## Tokens

### Colour
| Token | Value | Use |
|---|---|---|
| `ink` | `#2B2B2B` | Text, primary dark buttons, active nav pill, dark cards |
| `lime` | `#D4F36B` | Primary accent: main actions, "above median", highlights on dark |
| `mint` | `#A8E6C9` | Secondary accent (segmented bar, avatars) |
| `sky` | `#D6ECFF` | "Below median" pill background; text `#12406B` |
| `amber-soft` | `#FFE2B8` | Outlier count pill; text `#6B3800` |
| `card` | `#F6F8F5` | Notched panels |
| `surface` | `#FFFFFF` | Tables, tiles, inner cards |
| `muted` | `#6F7571` | Secondary text (passes 4.5:1 on white) |
| `line` | `#C6CBC7` | Dotted table header rule |
| `page` | `#D9E1DD` | Outside the frame |
| `frame` | `linear-gradient(115deg, #E9ECEA 0%, #EEF1EE 42%, #E8F5DD 78%, #DCF3C8 100%)` | App frame |
| On dark cards | text `#F3F5F3`, muted `#AEB4B0`, danger `#FFB4A8` | |

"Above median" text on lime uses `#2E4A06`. Never signal meaning with colour alone: always show `+8%` / `−9%` / `At median`.

### Type
- Font: **Outfit** (Google Fonts), weights 300, 400, 500.
- Page title: 40 to 58px, weight 300, letter-spacing −0.02em (`clamp(40px, 5vw, 58px)`).
- Big numbers (median, delta): 56 to 62px, weight 300.
- Body: 14.5px. Small labels: 12.5 to 13.5px.
- Numbers use `font-variant-numeric: tabular-nums`.

### Shape and spacing
- Radius: frame 40, notched panel 32, cards 26 to 28, tiles 18, table rows 14, buttons and pills fully round.
- Spacing steps: 4, 6, 8, 12, 16, 20, 24, 28.
- Touch targets at least 44px.

## Components

| Component | Notes | Seen in |
|---|---|---|
| `AppFrame` | Rounded frame on the page background; holds header and content | all |
| `TopBar` | Outlined logo pill, nav pill group (active item ink), search pill with ⌘K, profile circle | all |
| `PillButton` / `PillSelect` | White translucent pill; dark variant for primary-on-light, lime for main action | all |
| `SegmentedBar` | Labelled pills sized by share: ink, lime, mint, striped, outlined, dashed | people |
| `NotchedPanel` | Raised left tab (filters) + stepped-down right area for actions, joined by a concave curve | people, pay-bands |
| `CornerNotchCard` | Card with a round notch in the top-right corner holding a ↗ button | people (detail), pay-bands |
| `DeltaPill` | Above: lime, Below: sky, At median: grey. Text always included | people, pay-bands |
| `BandBar` | Track + fill/box for middle 50% + median tick + marker dot | people (detail), pay-bands |
| `BandTile` | Matrix cell: median, outlier count pill, mini band, headcount; selected state ink border | pay-bands |
| `Avatar` | Initials in a coloured circle (lime, mint, sky, sand, lavender) | people |
| `FormField` (dark) | Label above, 48px input, radius 14, translucent fill; error: border and message `#FFB4A8`, `aria-invalid` + `aria-describedby` | employee-form, states |
| `SegmentedChoice` | Radio group as pills; selected is lime | employee-form |
| `MoneyInput` | Locked currency prefix (from country) + amount; helper text explains rule S5 | employee-form |
| `FilterMenu` | Pill opens a white radius-24 menu: search, multi-select checkboxes with counts, Clear + "Show N people" | filter-menu |
| `Skeleton` | Grey rounded bars matching the row layout | states |
| `EmptyState` | Icon circle, one-line message, active filters echoed, "Clear filters" | states |
| `ErrorBanner` | Soft red `#FDE7E3`, text `#7A1F12`, "Try again"; replaces the table, keeps filters | states |
| `ConfirmDialog` | White dialog, names the employee, destructive button `#B3261E` | states |
| `Toast` | Dark pill for success (lime check), soft red for failure with Retry | states |

### Notch CSS (reuse, do not reinvent)

Stepped notch (concave fillet where the raised tab meets the lower panel):
```css
.notch-fillet {
  position: absolute; left: 0; bottom: 0; width: 32px; height: 32px;
  background: radial-gradient(circle at 100% 0%, transparent 31.5px, var(--card) 32px);
}
/* tab: border-radius 32px 32px 0 0; body: border-radius 0 32px 32px 32px */
```

Corner notch (card with a round bite in its top-right corner):
```css
.corner-notch {
  mask: radial-gradient(circle 36px at calc(100% - 24px) 24px, transparent 35.5px, #000 36px);
}
/* the 48px ↗ button sits outside the masked element, absolutely positioned at top: 0; right: 0 */
```

## Screens

### People (`mockups/people.html`)
Frame > TopBar > title > SegmentedBar (headcount by country) + view/group pills > NotchedPanel
(filter pills + search in tab, add / filters / export in the notch) > white table card + dark
detail card (CornerNotchCard). Clicking a row opens the detail card. Table columns: select,
name with avatar, job title, department, country, gross, net, vs median.

### Pay bands (`mockups/pay-bands.html`)
Frame > TopBar > title + explanation > NotchedPanel with the role × country matrix of BandTiles >
dark drill-down card (median, percentiles, box plot) + outliers card, both CornerNotchCards.
Each country column has its own scale (currencies differ).

### Mobile (`mockups/people-mobile.html`, `mockups/pay-bands-mobile.html`)
- No frame; full-height gradient.
- People: view pills, compact list with DeltaPill, details in a dark bottom sheet.
- Pay bands: country pills replace the matrix; one row per role with a BandBar.

### Add / edit employee (`mockups/employee-form.html`, `mockups/employee-form-mobile.html`)
- Desktop: dark card in the same place as the detail card (side of the table). Mobile: full-height dark bottom sheet with a sticky Save bar.
- Fields follow business rules E1 to E7: name, email, job title, department, country, hire date, employment type, gross annual salary.
- Currency is locked to the country. A live preview shows deduction, net annual and vs median before saving.
- Same form for add (empty, title "Add employee") and edit (prefilled, shows the employee code).

### Filters (`mockups/filter-menu.html`)
Multi-select menus with counts. The active pill turns ink and shows how many options are selected.

### States (`mockups/states.html`)
Every screen must handle: loading (skeleton), no results, load error, form validation errors,
country changed (S5), delete confirmation, success and failure toasts, saving button,
too few people for a band (P6), and an employee that no longer exists (404).

### Command palette (`mockups/command-palette.html`)
Stretch goal. Build only if time remains.

## Responsive rules
- Breakpoints: mobile < 640px, tablet 640 to 1024px, desktop > 1024px.
- Below 1024px the detail card moves under the table; below 640px it becomes a bottom sheet (shadcn `Sheet`, side `bottom`).
- Below 640px the notch actions become icon-only; the pay bands matrix is replaced by the mobile list.
- Wide tables scroll horizontally inside their card, never the page.

## Implementation in our stack
- Tokens live as CSS variables in `web/src/styles/tokens.css` and are mapped into the Tailwind theme,
  so shadcn/ui components use them.
- Shared components live in `web/src/components/ui/` (shadcn) and `web/src/components/` (ours).
- Real `<button>`, `<a>`, `<label>` and `<input>` elements; `aria-label` on icon-only buttons.
