# InputLabel

**Group:** Forms · **Kind:** MUI re-export (`@mui/material/InputLabel`)

> Synced from `infinnity-frontend` `packages/ui/src/components/InputLabel/index.tsx`.

Always shrunk and positioned above the field: `shrink` is a theme default and MUI's floating-label transform is disabled outright. The label sits 4px in from the top-left, and the input below it is pushed down 24px.

## Import

```tsx
import { InputLabel } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/InputLabel`. Props are MUI's `InputLabelProps` — this library adds no props of its own.

## Pliant restyling

`MuiInputLabelOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiInputLabelOverrides: Components<Theme> = {
  MuiInputLabel: {
    defaultProps: {
      shrink: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.variables.components['input-label'],
        overflow: 'visible',
        transform: 'none !important', // TODO: overwrite MUI4 injected styles (TEMPORARY)
        top: theme.spacing(0.5),
        left: theme.spacing(0.5),
        '& + .MuiInputBase-root': {
          marginTop: theme.spacing(3),
        },
      }),
    },
  },
};
```

## Rules

- Pliant fields do not animate a label into the border notch — labels always sit above. The `transform: none !important` in the override is flagged TEMPORARY in the source (MUI 4 legacy).

## Usage

No Storybook story. Usage is not captured here — read the component source, or the call sites in `infinnity-frontend`, before assuming behaviour.
