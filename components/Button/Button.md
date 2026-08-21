# Button

**Group:** Core · **Kind:** MUI re-export (`@mui/material/Button`)

> Synced from `infinnity-frontend` `packages/ui/src/components/Button/index.tsx`.

MUI Button, re-exported. Every visual decision lives in the theme: `variant="contained"` is the default (MUI's is `text`), elevation is off, corners are 8px, and labels are sentence case.

## Import

```tsx
import { Button } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/Button`. Props are MUI's `ButtonProps`, widened by the augmentations below.

Extends MUI's prop unions (via `declare module`) — these values are Pliant-only and will not appear in MUI's own docs:

- `@mui/material/Button`: `neutral`

Adds a `neutral` colour. Sizes map to the `button-small` / `button-medium` / `button-large` type tokens, so size changes type as well as padding.

## Pliant restyling

`MuiButtonOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiButtonOverrides: Components<Theme> = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
      variant: 'contained',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.variables.button.shape.borderRadius,
        textTransform: 'none',
      }),
      sizeSmall: ({ theme }) => ({
        ...theme.variables.components['button-small'],
      }),
      sizeMedium: ({ theme }) => ({
        ...theme.variables.components['button-medium'],
      }),
      sizeLarge: ({ theme }) => ({
        ...theme.variables.components['button-large'],
      }),
      containedPrimary: ({ theme }) => ({
        background: theme.variables.button.filled.default,
        color: theme.variables.button.filled.text,
        '&:hover': {
          background: theme.variables.button.filled.hover,
        },
      }),
      outlinedPrimary: ({ theme }) => ({
        borderColor: theme.variables.button.textOutlined.border,
        color: theme.variables.button.textOutlined.text,
        '&:hover': {
          background: theme.variables.button.textOutlined.hover,
          borderColor: theme.variables.button.textOutlined.border,
        },
      }),
      textPrimary: ({ theme }) => ({
        color: theme.variables.button.textOutlined.text,
        '&:hover': {
          background: theme.variables.button.textOutlined.hover,
        },
      }),
    },
    variants: [
      {
        props: { variant: 'contained', color: 'neutral' },
        style: ({ theme }) => ({
          color: theme.variables.button.filled.text,
        }),
      },
    ],
  },
};
```

## Rules

- Contained near-black is the primary action — **one per view**. Outlined is secondary, text is tertiary (docs/03).
- Sentence case, never uppercase (`textTransform: 'none'` is set in the theme; do not override it).
- `variant` may be omitted for a primary button since contained is the default.
- Only `primary` gets the near-black treatment from the override; semantic colours use the MUI palette.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Button/index.stories.tsx` (28 stories):

`PrimaryLarge` · `PrimaryMedium` · `PrimarySmall` · `PrimaryDisabled` · `NeutralLarge` · `NeutralMedium` · `NeutralSmall` · `ErrorLarge` · `ErrorMedium` · `ErrorSmall` · `SuccessLarge` · `SuccessMedium` · `SuccessSmall` · `PrimaryOutlineLarge` · `PrimaryOutlineMedium` · `PrimaryOutlineSmall` · `PrimaryOutlineDisabled` · `NeutralOutlineLarge` · `NeutralOutlineMedium` · `NeutralOutlineSmall` · `PrimaryTextLarge` · `PrimaryTextMedium` · `PrimaryTextSmall` · `PrimaryTextDisabled` · `NeutralTextLarge` · `NeutralTextMedium` · `NeutralTextSmall` · `LinkAsButton`
