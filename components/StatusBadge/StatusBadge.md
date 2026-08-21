# StatusBadge

**Group:** Data · **Kind:** Pliant component (no MUI base)

> Synced from `infinnity-frontend` `packages/ui/src/components/StatusBadge/index.tsx`.

The product's status pill: an uppercase micro-label on a tinted or solid fill, 8px radius, ellipsised. Not a MUI component — a Box with token-driven colours.

## Import

```tsx
import { StatusBadge } from '@pliant/ui';
```

## API

Exports `StatusBadge`, with types `StatusBadgeVariant`, `StatusBadgeColor`, `StatusBadgeProps`.

`label` (string, required), `variant` — `tinted` (default) or `filled` — and `color` (`default` | `primary` | `secondary` | `success` | `error` | `info` | `warning`). Tinted colours reuse the `alert.*` fill/content pairs; filled uses the palette. Memoised and forwards a ref.

## Pliant restyling

No override module — this component is not a MUI component, so it reads tokens directly in its own source (see the source path above).

## Rules

- Uppercasing comes from MUI's `overline` variant default, not from the token — the `overline` token itself sets no `text-transform`.
- Count suffixes ("PAID (10)") are part of the `label` string; there is no count prop.
- Status→colour mapping is not encoded here. `docs/08-decisions-log.md` open question 1 tracks formalising it, and the product is known to be inconsistent (REQUESTED renders differently between Wallet and Cards).

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/StatusBadge/index.stories.tsx` (14 stories):

`TintedDefault` · `TintedPrimary` · `TintedSecondary` · `TintedSuccess` · `TintedError` · `TintedInfo` · `TintedWarning` · `FilledDefault` · `FilledPrimary` · `FilledSecondary` · `FilledSuccess` · `FilledError` · `FilledInfo` · `FilledWarning`
