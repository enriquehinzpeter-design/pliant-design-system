# Link

**Group:** Core · **Kind:** MUI re-export (`@mui/material/Link`)

> Synced from `infinnity-frontend` `packages/ui/src/components/Link/index.tsx`.

MUI Link with a Pliant focus ring (2px outline, 2px offset) and no outline on mouse focus.

## Import

```tsx
import { Link } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/Link`. Props are MUI's `LinkProps` — this library adds no props of its own.

## Pliant restyling

`MuiLinkOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiLinkOverrides: Components<Theme> = {
  MuiLink: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        ...(ownerState.color === 'primary' && {
          color: theme.tokens.link?.color ?? theme.palette.primary.main,
        }),
        '&:focus:not(:focus-visible)': {
          outline: 'none',
        },
        '&:focus-visible, &.Mui-focusVisible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
          borderRadius: 2,
        },
      }),
      button: {
        verticalAlign: 'inherit',
      },
    },
  },
};
```

## Rules

- `color="primary"` resolves to the `link` token when a theme defines one; Pliant's own token set does not, so it falls back to near-black `primary.main`.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Link/index.stories.tsx` (5 stories):

`Inherit` · `InheritSecondary` · `H6` · `TargetBlank` · `ButtonAsLink`
