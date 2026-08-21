# BottomNavigationAction

**Group:** Navigation · **Kind:** MUI re-export (`@mui/material/BottomNavigationAction`)

> Synced from `infinnity-frontend` `packages/ui/src/components/BottomNavigationAction/index.tsx`.

Tightened for narrow bars: 8px horizontal padding, MUI's 80px minimum width removed, and labels truncate with an ellipsis instead of wrapping.

## Import

```tsx
import { BottomNavigationAction } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/BottomNavigationAction`. Props are MUI's `BottomNavigationActionProps` — this library adds no props of its own.

## Pliant restyling

`MuiBottomNavigationActionOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiBottomNavigationActionOverrides: Components<Theme> = {
  MuiBottomNavigationAction: {
    styleOverrides: {
      root: {
        padding: '0 8px',
        // Allow actions to shrink below MUI's default minWidth: 80 so labels can truncate
        minWidth: 0,
      },
      label: {
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
  },
};
```

## Usage

No Storybook story. Usage is not captured here — read the component source, or the call sites in `infinnity-frontend`, before assuming behaviour.
