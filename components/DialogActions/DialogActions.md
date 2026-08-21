# DialogActions

**Group:** Overlays · **Kind:** MUI re-export (`@mui/material/DialogActions`)

> Synced from `infinnity-frontend` `packages/ui/src/components/DialogActions/index.tsx`.

24px padding, dropping to 16px horizontally below `sm` — matching DialogTitle so the three dialog slots line up.

## Import

```tsx
import { DialogActions } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/DialogActions`. Props are MUI's `DialogActionsProps` — this library adds no props of its own.

## Pliant restyling

`MuiDialogActionsOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiDialogActionsOverrides: Components<Theme> = {
  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 24,
        [theme.breakpoints.down('sm')]: {
          paddingRight: 16,
          paddingLeft: 16,
        },
      }),
    },
  },
};
```

## Usage

No Storybook story. Usage is not captured here — read the component source, or the call sites in `infinnity-frontend`, before assuming behaviour.
