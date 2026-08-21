# Guidelines

Imported from the **Pliant Design System** Claude Design project (`8f7377b8`). Two kinds of file:

| | What |
|---|---|
| `*.card.html` (24) | Foundation specimen cards — colour, type, spacing, shape, elevation, brand. Each renders a live swatch/spec sheet and carries a `@dsCard` header naming its group. |
| `components/**/*.usage.md` (37) | Per-component usage notes for components that have **no folder in `components/`** — see the split below. |

## Where the usage notes went

The Claude Design project documents 69 components; this repo's `components/` holds the 88 exported by
`@pliant/ui`. The two sets overlap but are not the same, so the notes were split by whether a matching
folder already exists:

- **32 notes** landed beside their generated doc as `components/<Name>/<Name>.usage.md` — Button,
  TextField, Table, StatusBadge and the rest of the `@pliant/ui` overlap. Read them together: the
  generated `<Name>.md` is the API and the theme override, the `.usage.md` is when and how to reach
  for it.
- **37 notes** live here under `components/<group>/`, keeping the project's own grouping, because
  they document things `@pliant/ui` does not export:
  - `patterns/` (28) — the composed patterns: RecordDrawer, FormDialog, WizardDialog, FilterDrawer,
    SummaryPanel, StateBadge, the ledger cells and the rest. These are the highest-value notes in the
    import; most of `docs/04-patterns.md` is described here in build-ready terms.
  - `navigation/` — Sidebar (with the verified 264px metrics and the group-click rule), Tabs.
  - `forms/` — MoneyField, DateField, VerificationCodeField.
  - `icons/` — Icon (the Phosphor + custom-SVG wrapper), Flag.
  - `cards/` — CardIcon / CardRender, the parametric card artwork.
  - `feedback/` — Snackbar.

`components/README.md` lists where each app-level component actually lives in `infinnity-frontend`.

## Reading these honestly

**They describe the Claude Design project's own component set, not `@pliant/ui`.** That set was built
from 35 + 27 reference screenshots of the live product, and several components in it (`RecordDrawer`,
`SummaryPanel`, `Icon`, `Flag`, `CardIcon`) are deliberate additions that have no counterpart in the
package. Treat them as design intent and prototyping vocabulary; treat `components/<Name>/<Name>.md`
as the shipped API.

The cards `@import "../styles.css"` and some load `../_ds_bundle.js`. Neither exists in this repo —
they are project-root files that were not part of this import — so the cards will not render as-is
here. They are imported as **reference source**: the specimen values, the notes and the `@dsCard`
metadata are the content. Restoring live rendering would mean also importing the project's `styles.css`,
its `tokens/*.css` (a different naming scheme from this repo's `--pliant-*` tokens) and the compiled
bundle.

## Two cards were corrected after import

Everything else is verbatim. These two carried claims this repo has since revised, and were edited
to match:

- **`brand-logo.card.html`** — was "all three marks are currentColor SVG". Now states that the
  wordmark and icon mark inherit `currentColor` while the **round mark is intentionally full-colour**
  (the lime app-icon), per **`SYNC-FINDINGS.md` §11**, resolved 2026-08-21.
  Still uncorrected: the card loads `../assets/logo.svg` / `logo-icon.svg` / `logo-round.svg`, which
  are named `pliantLogo.svg` / `pliantIconLogo.svg` / `pliantRoundLogo.svg` in this repo's
  `assets/logos/`. Left alone because the card cannot render here anyway (see above) — fix the paths
  if it is ever wired up.
- **`spacing-layout.card.html`** — was a flat **524px** for the record drawer. Now reads
  "maxWidth: 600; ~524px at desktop widths; no scrim", reconciling the measured figure with the code.
  **`SYNC-FINDINGS.md` §5 stays open**: `docs/04-patterns.md` and the `docs/08` canonical table still
  say 524px flat, and which is authoritative is a design call. Worth knowing that 524px was an
  independent measurement — the web-app kit README states overlay geometry was measured off the
  reference screenshots at a 1530px viewport, 1:1.
