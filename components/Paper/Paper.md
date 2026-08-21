# Paper

**Group:** Core · **Kind:** MUI re-export (`@mui/material/Paper`)

> Synced from `infinnity-frontend` `packages/ui/src/components/Paper/index.tsx`.

MUI Paper plus a Pliant-only `tinted` variant that fills with the warm contrast surface — the standard way to set a panel apart without elevation.

## Import

```tsx
import { Paper } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/Paper`. Props are MUI's `PaperProps`, widened by the augmentations below.

Extends MUI's prop unions (via `declare module`) — these values are Pliant-only and will not appear in MUI's own docs:

- `@mui/material/Paper`: `tinted`

Adds `variant="tinted"`.

## Pliant restyling

`MuiPaperOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiPaperOverrides: Components<Theme> = {
  MuiPaper: {
    variants: [
      {
        props: { variant: 'tinted' },
        style: ({ theme }) => ({
          backgroundColor: theme.variables.background.contrast,
        }),
      },
    ],
  },
};
```

## Rules

- Prefer `variant="outlined"` or `tinted` over elevation: borders over shadows (docs/01).

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Paper/index.stories.tsx` (13 stories):

`Outlined` · `Tinted` · `TintedSquare` · `Elevation0` · `Elevation1` · `Elevation2` · `Elevation3` · `Elevation4` · `Elevation6` · `Elevation8` · `Elevation12` · `Elevation16` · `Elevation24`
