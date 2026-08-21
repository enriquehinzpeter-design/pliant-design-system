# Sync findings — 2026-08-21

What the first `components/` + `tokens/` sync learned by reading `infinnity-frontend` at
`master` (commit as of 2026-08-21). Two lists: things the docs got right, and places where the
docs and the code disagree.

**Nothing in `docs/` was changed on the strength of this.** Per `docs/00-overview.md` the repo
outranks the codebase as a source of truth, and several of these deltas may be deliberate
design decisions the code has not caught up with. They need a design-team call, which is what
this file is for. Resolve each one into `docs/08-decisions-log.md`, then delete the entry here.

## Confirmed by the code

- Every colour in `docs/01-foundations.md` — `#111111` / `#424242` / `#ffffff` primary, `#e7ff53`
  lime, `#e53948` · `#e84d00` · `#3073e8` · `#0d9488` · `#4b5563` semantics, the warm neutrals,
  the ink alphas. All present in `variables.ts` exactly as documented.
- Geist only, weights 400 and 500 in the tokens. 8px default radius. Borders over shadows.
- Buttons sentence case (`textTransform: 'none'` in `MuiButtonOverrides`), contained as the
  theme default variant.
- The 12 component type roles and `overline2` auto-uppercase, exactly as listed.
- Sidebar 264px — `src/components/Sidebar/style.tsx` `drawerWidth = 264`.
- Alert icon mapping (neutral→Question, error→WarningCircle, warning→Warning, info→Info,
  success→CheckCircle) — fixed in `MuiAlertOverrides`, as documented.
- Icon counts: 201 imported Phosphor glyphs (`imported-phosphor-icons.txt`, 201 generated
  components) and 45 custom SVGs under `packages/icons/src/assets`. `docs/02`'s "~200" and "45"
  are right.
- Filter drawer keeps its scrim; the record drawer has none (`hideBackdrop`).
- `internalTheme` exists and forces dark navigation (`INTERNAL_THEME_ID = 'PLIANT_INTERNAL_APP'`).
- The three deprecated components are still in `src/elements/` — ChipAutocomplete, ChipSelect,
  Dropzone — so the "do not use" note in `docs/03` is live guidance, not history.

## Deltas needing a decision

### 1. "92 exported, typed components" is 88 components

`docs/03-components.md`. `packages/ui/src/index.ts` has 92 `export *` statements, but four are
not components: `hoc/withDialogWrapper`, `hooks/useMediaQuery`, `theme/createTheme` and
`theme/types`. The library is **88 components** plus one HOC, one hook and the theme factory.

### 2. "24 override modules" is 25

`docs/03-components.md`. There are 25 files in `packages/ui/src/theme/overrides/`, and
`createTheme.ts` spreads all 25 — none is dead.

### 3. Geist does not come from Google Fonts

`docs/01-foundations.md` says "Loaded from Google Fonts; the product loads it from a CDN
(`fonts/geist.css`)". The product loads it only from Pliant's own asset CDN —
`index.html` links `%REACT_APP_ASSETS_URL%/fonts/geist.css`, which is
`https://assets.getpliant.com/fonts/geist.css` in production. Google Fonts is not involved.

That stylesheet also shows Geist ships as a **variable font covering 100–900**, plus an italic
file. "Weights 400, 500 only" is true of the tokens, not of the font — worth stating that way,
since the extra weights are one CSS declaration away.

### 4. Country flags are a CSS icon library, not Figma SVGs

`docs/02-iconography-and-assets.md` and `docs/08` describe flags as SVGs exported from the
Figma flag library, ISO-keyed, with a pending 240-flag export (open question 5).

In code, `src/components/CountryFlag/index.tsx` renders `flag-icon flag-icon-<iso>` class names
against **`flag-icon-css`**, loaded in `index.html` from
`%REACT_APP_ASSETS_URL%/libs/flag-icon-css/css/flag-icons.min.css`. No flag SVGs ship in the
repo. The documented 16×22 geometry is right (`height: spacing(2)`, `width: spacing(2.75)`).

Consequences worth deciding on: the app already covers every ISO code, so the "full 240-flag
export pending" question may be moot; and a prototype that hand-places Figma flag SVGs will not
match the product, which uses the library.

### 5. Record drawer is `maxWidth: 600`, not 524px

`docs/04-patterns.md` and the canonical-decision table in `docs/08` say 524px, no scrim.
`src/layout/Drawer/DetailsDrawer.tsx` sets `width: '100%'`, `maxWidth: 600`, `elevation={8}`,
`anchor="right"`, `hideBackdrop`, `zIndex: 1300`. The no-scrim half is confirmed; the width is
not. `FilterDrawer` is 320px (not documented) and keeps its backdrop.

Either the code drifted from the decision or the decision was never implemented — a design call,
not something a sync should silently rewrite.

### 6. `--content-max-width: 840px` is not a variable

`docs/01-foundations.md` presents it as a custom property; `docs/08` already marks it "observed
— pending engineering confirmation". Evidence: no such custom property or shared constant
exists. 840 appears twice as a local hard-code —
`src/domains/settings/components/IntegrationImage` (`max-width: 840px`) and
`src/domains/partner/components/PartnerLegalDisclaimer` (`maxWidth={840}`). Nothing caps
settings or detail pages centrally.

### 7. Table geometry is inherited, not set — and one number is unverified

`docs/01-foundations.md` gives DataGrid header 56px (36 small), rows 52px default, 32px dense,
72px media. `MuiDataGridOverrides` sets **no heights at all**, so:

- 56px header and 52px row are MUI X's own defaults — true, but by inheritance, so a MUI X
  version bump changes them.
- 72px media rows are set per page, and consistently: eight transaction/export/account-entry
  tables pass `rowHeight={72}`.
- **32px dense is not evidenced anywhere.** MUI X compact density is 36px. Other pages pass
  40, 60, 64 and 68 — there is no dense standard in code.

### 8. `chip.defaultCloseFill` is a dead token

Defined in `variables.ts` (`#000000`) and in the `DesignTokens` type, overridden by
`barclaysStyles`, and read by nothing — no component, no override module. Either wire it or
drop it.

### 9. The partner list is much longer than five

`docs/00-overview.md` names Barclays, CapitalBox, Coastal, Novalife and Unzer. `createPartnerTheme`
has 35 `PartnerIds` branches — also Billie, BizAway, Bonago, Candis, Circula, Commerzbank,
Deel, DZ Bank, Intertours, Keewe, Mobilexpense/Declaree, Parto, SPS, Wells Fargo and the
Volksbank/VR-Bank family.

Partner styling stays out of scope; the note just needs to describe what is being excluded.
Worth recording that the **30px pill radius** `docs/01` warns about is specifically Commerzbank's.

### 10. `docs/03` groups components that are not in the library

Snackbar, MoneyField, VerificationCodeField, Sidebar, Tabs, CardIcon, Flag and FileUploadField
are all app-level, and no `DateField` or `CardRender` component exists under either name. The
full mapping is in `components/README.md` under "Not in this library". Also worth noting there:
the product's tables are MUI X DataGrid restyled app-side, so the `Table*` primitives this
library exports are not what `docs/01`'s table geometry describes.

## Not captured by this sync

- `templates/`, `ui-kits/` and `assets/` are still empty — see `MIGRATION.md`. Screen renders
  need the app running; nothing in this sync can produce them honestly.
- Component **prop tables** are not extracted. Each doc points at the real source and story
  file instead. Generating them properly means running the package's own `tsc`/`vite-plugin-dts`
  build and reading the emitted `.d.ts`, which the next sync could add.
- App-level components (`src/elements`, `src/layout`, `src/components`) are inventoried but not
  documented. They carry real product patterns — a decision for the design team on whether this
  repo should cover them.
