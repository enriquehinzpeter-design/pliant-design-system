# FormHelperText

**Group:** Forms · **Kind:** MUI re-export (`@mui/material/FormHelperText`)

> Synced from `infinnity-frontend` `packages/ui/src/components/FormHelperText/index.tsx`.

Uses the `helper-text` token (12px). Error text and hint text share this style — colour is what distinguishes them.

## Import

```tsx
import { FormHelperText } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/FormHelperText`. Props are MUI's `FormHelperTextProps` — this library adds no props of its own.

## Pliant restyling

`MuiFormHelperTextOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiFormHelperTextOverrides: Components<Theme> = {
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.variables.components['helper-text'],
      }),
      contained: {
        marginLeft: 4,
      },
    },
  },
};
```

## Usage

No Storybook story. Usage is not captured here — read the component source, or the call sites in `infinnity-frontend`, before assuming behaviour.
