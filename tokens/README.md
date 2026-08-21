# Tokens

Every Pliant design token, as CSS custom properties. Import one file:

```css
@import url('tokens/tokens.css');
```

`tokens.json` is the same data as a machine-readable mirror, shaped exactly like the
`designTokens` object in code — for harnesses that would rather read JSON than parse CSS.

## Provenance

| File | Generated? | Source |
|---|---|---|
| `colors.css` | yes | `designTokens` in `infinnity-frontend` `src/components/App/style/themeMui5/variables.ts` |
| `typography.css` | yes | same |
| `shape.css` | yes | same |
| `elevation.css` | yes | same |
| `tokens.json` | yes | same |
| `fonts.css` | **no** | transcribed from `https://assets.getpliant.com/fonts/geist.css` (the stylesheet the product loads); the token source only names the family |
| `tokens.css` | no | hand-written index of the above |

Regenerate the generated files after a design-system release:

```sh
node scripts/sync/extract-tokens.mjs <path-to-infinnity-frontend>
```

The extractor reads the token object as data and refuses to run if that file stops being a
plain literal, so a value here is never a transcription — it is the value the product ships.
Review the diff, then commit.

## Naming

`--pliant-<path>`, kebab-cased from the token's path in the source object:

| Source | Custom property |
|---|---|
| `primary.main` | `--pliant-primary-main` |
| `alert.errorFill` | `--pliant-alert-error-fill` |
| `navigation.dark.text.secondary` | `--pliant-navigation-dark-text-secondary` |
| `typography.h4.fontSize` | `--pliant-type-h4-font-size` |
| `components['menu-item-dense'].fontSize` | `--pliant-type-menu-item-dense-font-size` |
| `shadows[8]` | `--pliant-elevation-8` |

Typography is the one place the path is rewritten: both `typography.*` (MUI variants) and
`components.*` (component roles) are emitted under a single `--pliant-type-*` prefix, because
they are one family of decisions in practice.

## How tokens reach components

`createTheme(tokens)` in `@pliant/ui` puts the whole object on the MUI theme as `theme.tokens`,
maps the palette groups into `theme.palette`, spreads `typography`, `shadows` and `shape`, and
then applies 25 component override modules. The override modules are where the tokens actually
turn into styling — see `components/README.md`.

`theme.variables` is a deprecated alias for `theme.tokens`. Most override modules still read
`theme.variables`; both point at the same object.

## Things worth knowing before you use these

- **There are no spacing tokens.** The token object defines none, and `createTheme` does not
  override MUI's spacing, so the product runs on MUI's default 8px scale — `theme.spacing(n)`
  is `8n` px. Pixel values in `docs/01-foundations.md` are that scale, not tokens.
- **Two token groups are optional and Pliant does not define them.** The `DesignTokens` type
  declares `badge` and `link` as optional; Pliant's own `designTokens` omits both. The Badge
  override checks for `badge` and no-ops without it, and Link falls back to `primary.main`.
  Partner themes are what supply them.
- **Six groups are app-level, not part of the package's token contract.** `navigation`, `tile`,
  `pliantearth`, `grey`, `warmGrey` and `basic` come from a `DesignTokensOverrides` module
  augmentation in the app (`themeMui5/index.tsx`). They are real tokens and are emitted here,
  but `@pliant/ui` alone does not require them.
- **`chip.defaultCloseFill` is defined and never read.** No component or override module
  references it — see `SYNC-FINDINGS.md`.
- **MUI defaults survive where a token is silent.** A token that sets no `text-transform`
  does not clear MUI's. That is why `StatusBadge` renders uppercase although the `overline`
  token says nothing about case, and why table headers get their uppercasing from an app-level
  override rather than the `table-header` token.
- **Partner themes replace token values wholesale** (a different primary, a 30px pill radius).
  Nothing partner-specific is in this directory, and per `docs/00-overview.md` partner styling
  is out of scope for this reference.

## Surfaces named in docs/01

`docs/01-foundations.md` lists warm-neutral surfaces without saying which token each is. They
map like this:

| Colour | Token |
|---|---|
| `#f5f5f0` | `--pliant-background-contrast` (also `--pliant-navigation-light-background`) |
| `#f3f4f6` | `--pliant-alert-neutral-fill` |
| `#fafafa` | `--pliant-grey-50` |
| `#e4e4de` | `--pliant-navigation-light-selected` (the hairline divider family) |
