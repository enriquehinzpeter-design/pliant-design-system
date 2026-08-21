# 01 — Foundations (colors, type, spacing, shape)

Verified against `themeMui5/variables.ts` — the token source of truth.

## Color
- **Primary (interactive): `#111111`** near-black (light `#424242`, contrast `#ffffff`) — a neutral, not a hue.
- **Brand lime accent: `#e7ff53`** — reserved accent (brand marks, count badges, virtual card art); black text on lime; never body text.
- **Semantic:** secondary/error `#e53948` · warning `#e84d00` · info `#3073e8` · success `#0d9488` (teal) · neutral `#4b5563`.
- **Surfaces:** warm neutrals `#f5f5f0`, `#f3f4f6`, `#fafafa`, `#e4e4de`. Ink as alphas: text primary `rgba(0,0,0,.87)`, secondary `.6`, disabled `.38`.
- Alert fills / content pairs: see `tokens/colors.css` (synced).

## Typography
- **Single family: Geist** (weights 400, 500 only). Loaded from Google Fonts; the product loads it from a CDN (`fonts/geist.css`).
- Component roles are tokens (`alert-title`, `button-*`, `input-label`, `input-text`, `helper-text`, `chip-label`, `menu-item`, `menu-item-dense`, `table-header`, `tooltip-label`, `overline2` auto-uppercase) — exact sizes/line-heights/letter-spacing in `tokens/`.
- **Buttons are sentence case** (`textTransform: none`). Uppercase appears only in table headers, overlines, and micro-labels.

## Shape & spacing
- **Default border radius 8px** (nav items, cards, inputs). Pill radius 30 belongs to partner themes — do not use.
- Settings/detail pages cap content at **`--content-max-width: 840px`** (observed; engineering to confirm). Data-table pages run full width.
- Elevation: borders over shadows; hairline dividers `#e4e4de`-family.

## Navigation & layout metrics (verified in `src/components/Sidebar/`)
- Sidebar **264px** (collapsed rail 24px); collapse control = bordered circular IconButton at top 29 / right −14 with Phosphor CaretLeft/Right.
- Nav item: padding 6px 16px, margin-bottom 8, radius 8, icon slot 36, `menu-item-dense`; active = selected bg + **3×28px indicator bar** (radius 2) at left 4px. Sub-item: 2px 16px, mb 4, no icon, text indent 36.
- Group chevron: Phosphor **CaretDown/CaretUp**. **Group click navigates to its first available child route**; group is disabled while expanded and never takes active state.
- Page header: small breadcrumb line + **large title, always both**; actions top-right.
- Tables (MUI X DataGrid): header **56px** (36 small), rows **52px** default, **32px** dense, **72px** media rows (card-thumbnail stacks); uppercase 12/500 headers.
- Record drawers **524px, no scrim**; Filter drawer has a scrim. (See 04-patterns.)
