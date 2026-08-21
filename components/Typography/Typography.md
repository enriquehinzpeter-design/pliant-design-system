# Typography

**Group:** Core · **Kind:** MUI re-export (`@mui/material/Typography`)

> Synced from `infinnity-frontend` `packages/ui/src/components/Typography/index.tsx`.

MUI Typography with two extra Pliant variants: `caption2` (10px) and `overline2` (10px, auto-uppercase).

## Import

```tsx
import { Typography } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/Typography`. Props are MUI's `TypographyProps`, widened by the augmentations below.

Extends MUI's prop unions (via `declare module`) — these values are Pliant-only and will not appear in MUI's own docs:

- `@mui/material/styles`: `caption2`, `overline2`, `caption2`, `overline2`
- `@mui/material/Typography`: `caption2`, `overline2`

Adds `caption2` and `overline2` to the variant union.

## Pliant restyling

None. This component inherits the theme (palette, typography, `shape.borderRadius`) but has no component-level override module, so its MUI defaults stand.

## Rules

- `overline2` uppercases itself via the token. Plain `overline` inherits uppercasing from MUI's default instead.
- Uppercase is reserved for table headers, overlines and micro-labels (docs/01).

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Typography/index.stories.tsx` (16 stories):

`Body1` · `Body1Secondary` · `Body1Gutter` · `Body2` · `Subtitle1` · `Subtitle2` · `Overline` · `Overline2` · `Caption` · `Caption2` · `H6` · `H5` · `H4` · `H3` · `H2` · `H1`
