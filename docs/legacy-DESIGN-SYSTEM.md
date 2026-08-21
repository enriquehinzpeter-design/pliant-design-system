# Pliant Design System — Source of Truth

> **Purpose of this file:** extraction anchor for AI tooling (Claude Design, Claude Code, Cursor).
> It states the canonical design decisions and where they live in this repo, so automated
> design-system extraction resolves ambiguity correctly. **This repo — not Figma — is the
> source of truth.** The Figma file "Design System" is outdated and must not be used as a
> reference for tokens, type, or component behavior.

## Canonical decisions (resolve all conflicts in favor of these)

| Decision | Canonical value | Defined in |
|---|---|---|
| Type family | **Geist** (`Geist, sans-serif`) — the only product font | `src/components/App/style/themeMui5/variables.ts` |
| Design tokens | `designTokens` object (palette, typography roles, navigation, misc) | `src/components/App/style/themeMui5/variables.ts` |
| Theme factory | `createTheme(tokens)` from `@pliant/ui` | `packages/ui/src/theme/createTheme.ts` |
| Component restyling | 24 MUI override modules (Button, Chip, TextField, Dialog…) | `packages/ui/src/theme/overrides/` |
| App-level overrides | DataGrid, Table, Tabs, DateRangePicker, CssBaseline | `src/components/App/style/themeMui5/*.tsx` |
| Default theme | `createPartnerTheme` defaults to `navigationMode: 'light'` (External app); `internalTheme` (`PLIANT_INTERNAL_APP`) flips to dark nav (Internal app) | `src/components/App/style/themeMui5/index.tsx` |
| Component library | `@pliant/ui` — 92 exported, typed components | `packages/ui/src/index.ts` |
| Icons | `@pliant/icons` — 244 custom icon components | `packages/icons/src/` |
| Base framework | MUI v5 (`@mui/material` ^5.17.1) + `@mui/x-data-grid-pro`, `@mui/x-date-pickers-pro` v6 | `package.json` |
| Storybook theme | Wraps every story in the same `internalTheme` | `.storybook/decorators/withMuiTheme.tsx` |

## Core palette (from `variables.ts` — do not source colors from Figma)

- **Primary:** `#111111` main / `#424242` light / `#111111` dark, contrast `#ffffff` — near-black is the primary interactive color, not a hue.
- **Brand accent (lime):** `#e7ff53`
- **Secondary:** `#e53948` (warm red-coral)
- **Warning:** `#e84d00` · **Info:** `#3073e8` · **Success:** `#0d9488` (teal) · **Neutral:** `#4b5563`
- **Text:** `rgba(0,0,0,0.87)` primary / `rgba(0,0,0,0.6)` secondary / `rgba(0,0,0,0.38)` disabled
- Neutral surfaces include `#f5f5f0`, `#f3f4f6`, `#fafafa`, `#e4e4de`.
- Full values, alert tints, and dark-navigation tokens: see `variables.ts`.

## Typography

Single family: **Geist** (weights 400/500 in use). Component-level roles are defined as
tokens — `alert-title`, `button-large/medium/small`, `input-label`, `input-text`,
`helper-text`, `chip-label`, `menu-item`, `menu-item-dense`, `table-header`,
`tooltip-label` — each with explicit size, line-height, and letter-spacing in `variables.ts`.
Button labels are sentence case (`textTransform: none` via overrides), not ALL CAPS.

## Shape

Default `borderRadius: 8`. Pill radius (`30`) reserved for designated components — check
the relevant override before applying.

## Navigation modes — app-scoped rule

- **External app (customer-facing admin)** — light rail: background `#f5f5f0`, selected/hover `#e4e4de`, black text. This is the customer-visible surface and the default for PM prototypes.
- **Internal app (Pliant ops)** — dark rail: background `#111111`, selected/hover `#2e2e2e`, white text. This is `internalTheme`.
- Storybook wraps stories in `internalTheme`; do not infer from this that dark navigation is the product default. Everything except navigation mode and logo variants is shared between the two apps.

## Navigation & layout metrics (verified in code — `src/components/Sidebar/`)

- **Sidebar width: 264px** (`drawerWidth = 264`); collapsed rail 24px. Collapse control = bordered circular IconButton at top 29px / right −14px with Phosphor CaretLeft/CaretRight.
- **Nav item** (`StyledListItemButton`): padding 6px 16px, margin-bottom 8px, border-radius 8px, icon `minWidth: 36`, typography token `menu-item-dense`. Active: navigation `selected` background + a 3×28px indicator bar (radius 2) at left 4px.
- **Sub-item** (`StyledSubListItemButton`): padding 2px 16px, margin-bottom 4px, no icon, text indented 36px.
- **Group chevron: Phosphor `CaretDown` / `CaretUp`** (small), inline at row end.
- **Group click behavior** (`TabWithChildren`): the group row is a link that resolves to the group's **first available child route**; while expanded the group row is **disabled** and never takes the active state — selection lives on the sub-item only.
- **Page header rule:** every page renders the small breadcrumb line AND the large page title (e.g. "Transactions / My transactions") — the big title is never omitted.
- **Table heights** (MUI X DataGrid): column header **56px** (36 in small variant); default row **52px**; dense variant **32px**; media rows with card-thumbnail stacks (e.g. Members) **72px** via `rowHeight={72}`.
- **Content max-width:** settings/detail pages cap the content column at **≈840px (observed across Organization, Accounting, Policies, Plan)**; data-table pages run full-width. No single global constant exists in code (internal compliance pages use 1240px) — confirm the exact external-app token with engineering.
- **Wallet card tiles open the card detail view** (`WalletCardTile → showCardDetails → CardDetailsPage`) — the same card-detail drawer as the Cards table.

## Components

`@pliant/ui` exports 92 components (wrapped/restyled MUI plus Pliant-specific ones such as
`StatusBadge`, `PaperLabeledValue`, `LoaderWithOverlay`, `PreviewTooltip`,
`FormControlLabelTooltipIcon`). 49 have Storybook stories (`*.stories.tsx`) demonstrating
variants and states — treat stories as the canonical usage documentation. Data-heavy
surfaces use `@mui/x-data-grid-pro` with app-level restyling in
`src/components/App/style/themeMui5/MuiDataGridOverrides.tsx`.

## Partner white-labeling — OUT OF SCOPE for the core design system

Pliant is white-labeled for partners. Partner theme overlays live in
`src/components/App/style/themeMui5/` (`barclaysStyles.ts`, `capitalBoxStyles.ts`,
`coastalVariables.ts`, `novalifeStyles.ts`, `unzerStyles.ts`), applied by white-label level
(fully white-label / compliance-risk / embedded / logo-only) with per-partner logos and
navigation tokens.

**For design-system extraction: use only the Pliant core `internalTheme`.** Partner overlays
are separate brands and will become separate design systems later. Do not blend partner
colors, logos, or navigation styling into the core system.

## Card artwork — canonical source (Figma Card Library)

Card artwork is the one domain where a Figma file — the **💳 Card Library** (`figma.com/design/p2bdSeFycWMli0K1wUdnnG`), which is current and maintained — is the source of truth, superseding the repo's `src/assets/images/cardDesignBackup`:

- **Full card renders** (node `5461:68990`, "Pliant credit cards — all physical and in-app cards to be used in layouts"): 8 colourways — black, metal/silver, lime, coral, orange, sage, taupe, cream — each as physical and virtual, standard and single-use (1×), in **both Visa and Mastercard** schemes, plus "Enter card label here" template variants.
- **In-app card icons** (node `5461:73221`, "Icons used in the table views"): the small card thumbnails for table cells and lists, in all colourways with scheme and single-use/shield badge variants, plus the tiny card-type glyph row. Use these for card cells — never scaled-down full renders or hand-drawn rects.
- Card scheme is per-organization (Visa or Mastercard); artwork exists for both. Do not assume Visa-only.
- **Default card asset** when a design does not specify: **Type = In-app icon, Colour = Gray, Scheme = none, Label = no, Icon = no.** Any other variant (colourway, scheme mark, label, badge) must be requested explicitly.
- **Rendering rule (anti-pixelation):** cards render as **parametric vector components** — this includes the black physical card, whose canonical component (node `4935:3695`) is fully vector. Card detail-view art comes from node `4935:2813` (vector; only two metal-texture rasters exist). Never upscale any raster; per-size 2× assets only where a texture genuinely requires it (see `src/domains/card/components/CardIcon` for the production size-class model).

## Country flags — canonical source

Country flags are **SVG from the flag library** in the Design System Figma file (`figma.com/design/g1YQZdrVs2KJtFwfxgtTmD`, node `6436:37649`) — used in table cells (e.g. Merchants country column) and currency selectors. **Never use emoji flags.**

## Explicitly deprecated / do not extract from

- The Figma file "Design System" (35 pages) — stale. Wrong type family (claims
  Pangea/Maison Neue; product uses Geist), outdated tokens and states. (This deprecation
  does NOT apply to the 💳 Card Library file above, which is current and canonical for
  card artwork.)
- `Theme.variables` — deprecated alias of `Theme.tokens`; use `tokens`.
- Deprecated components (marked `@deprecated` in source; they still have Storybook
  stories, so do not treat story presence as endorsement):
  `src/elements/ChipAutocomplete` → use `Autocomplete`;
  `src/elements/ChipSelect` → use `Select`;
  `src/elements/Dropzone` → use `FileUploadField`.

## Maintenance

Owned by the Pliant design team. When tokens, overrides, or the component API change,
update this file in the same PR, then re-run `/design-sync` (Claude Code) so the Claude
Design system stays current.
