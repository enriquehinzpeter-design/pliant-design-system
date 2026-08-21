# DialogTitle

**Group:** Overlays · **Kind:** MUI re-export (`@mui/material/DialogTitle`)

> Synced from `infinnity-frontend` `packages/ui/src/components/DialogTitle/index.tsx`.

24px padding, dropping to 16px horizontally below `sm`.

## Import

```tsx
import { DialogTitle } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/DialogTitle`. Props are MUI's `DialogTitleProps` — this library adds no props of its own.

## Pliant restyling

`MuiDialogTitleOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiDialogTitleOverrides: Components<Theme> = {
  MuiDialogTitle: {
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
