# StepLabel

**Group:** Navigation · **Kind:** MUI re-export (`@mui/material/StepLabel`)

> Synced from `infinnity-frontend` `packages/ui/src/components/StepLabel/index.tsx`.

Active and completed step labels switch to `subtitle2` (14px/500); upcoming steps stay at the default weight.

## Import

```tsx
import { StepLabel } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/StepLabel`. Props are MUI's `StepLabelProps` — this library adds no props of its own.

## Pliant restyling

`MuiStepLabelOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiStepLabelOverrides: Components<Theme> = {
  MuiStepLabel: {
    styleOverrides: {
      label: ({ theme }) => ({
        '&.Mui-active, &.Mui-completed': {
          ...theme.variables.typography.subtitle2,
        },
      }),
    },
  },
};
```

## Usage

No Storybook story. Usage is not captured here — read the component source, or the call sites in `infinnity-frontend`, before assuming behaviour.
