# FormControlLabel

**Group:** Forms · **Kind:** MUI re-export (`@mui/material/FormControlLabel`)

> Synced from `infinnity-frontend` `packages/ui/src/components/FormControlLabel/index.tsx`.

With `labelPlacement="start"` the theme spreads label and control apart (`space-between`, no left margin) — this is what produces the settings-page row with the label left and the switch hard right.

## Import

```tsx
import { FormControlLabel } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/FormControlLabel`. Props are MUI's `FormControlLabelProps` — this library adds no props of its own.

## Pliant restyling

`MuiFormControlLabelOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiFormControlLabelOverrides: Components<Theme> = {
  MuiFormControlLabel: {
    styleOverrides: {
      labelPlacementStart: {
        justifyContent: 'space-between',
        marginLeft: 0,
      },
    },
  },
};
```

## Rules

- Settings pages: label left, control right (`labelPlacement="start"`). Dialogs: control left, label right — the default (docs/03).

## Usage

No Storybook story. Usage is not captured here — read the component source, or the call sites in `infinnity-frontend`, before assuming behaviour.
