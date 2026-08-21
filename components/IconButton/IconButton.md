# IconButton

**Group:** Core · **Kind:** Pliant wrapper around `@mui/material/ButtonBase`

> Synced from `infinnity-frontend` `packages/ui/src/components/IconButton/index.tsx`.

MUI IconButton with two Pliant additions: **`aria-label` is required by the type**, and a `primary-contained` colour gives the filled near-black circular button.

## Import

```tsx
import { IconButton } from '@pliant/ui';
```

## API

Exports `IconButton`, with types `IconButtonProps`.

Extends MUI's prop unions (via `declare module`) — these values are Pliant-only and will not appear in MUI's own docs:

- `@mui/material/IconButton`: `primary-contained`

`color="primary-contained"` is a Pliant colour, not a MUI one — MUI IconButton has no variant system, so a colour carries the filled look. A `selected` class applies the theme's selected background (this is how `MenuContainer` marks an open trigger).

## Pliant restyling

`MuiIconButtonOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiIconButtonOverrides: Components<Theme> = {
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        '&.selected': { background: theme.palette.action.selected },

        // MUI icon buttons don't support variants (see https://github.com/mui/material-ui/issues/35456)
        ...(ownerState.color === 'primary-contained' && {
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            background: theme.palette.primary.main,
          },
        }),
      }),
    },
  },
};
```

## Rules

- Every icon button needs a real `aria-label`; the build fails without one.
- The bordered circular collapse control on the sidebar is an IconButton (docs/01).

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/IconButton/index.stories.tsx` (10 stories):

`Default` · `Small` · `Large` · `DefaultWithIconInherit` · `SmallWithIconInherit` · `LargeWithIconInherit` · `PrimaryContained` · `SemanticError` · `Success` · `Disabled`
