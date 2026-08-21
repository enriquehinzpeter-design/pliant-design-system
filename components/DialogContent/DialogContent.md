# DialogContent

**Group:** Overlays · **Kind:** MUI re-export (`@mui/material/DialogContent`)

> Synced from `infinnity-frontend` `packages/ui/src/components/DialogContent/index.tsx`.

## Import

```tsx
import { DialogContent } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/DialogContent`. Props are MUI's `DialogContentProps` — this library adds no props of its own.

## Pliant restyling

`MuiDialogContentOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiDialogContentOverrides: Components<Theme> = {
  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
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
