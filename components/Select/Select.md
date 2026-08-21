# Select

**Group:** Forms · **Kind:** Pliant wrapper around `@mui/material/Select`

> Synced from `infinnity-frontend` `packages/ui/src/components/Select/index.tsx`.

Outlined select, full-width and small by default, on a white fill. `variant`, `label`, `fullWidth` and `notched` are removed from the prop type because the theme fixes them.

## Import

```tsx
import { Select } from '@pliant/ui';
```

## API

Exports `Select`, with types `SelectProps`, `SelectChangeEvent`.

Labelling is required in one of three ways: `labelId` pointing at an `InputLabel`, `aria-label`, or `aria-labelledby`. Re-exports `SelectChangeEvent` for typing handlers.

## Pliant restyling

`MuiSelectOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiSelectOverrides: Components<Theme> = {
  MuiSelect: {
    defaultProps: {
      fullWidth: true,
      notched: false,
      size: 'small',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        background: theme.variables.input.background,
      }),
    },
  },
};
```

## Rules

- Replaces the deprecated `ChipSelect` (docs/03).
- Pair with `InputLabel` + `FormControl` for a labelled field; the label sits above, never in the notch.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Select/index.stories.tsx` (9 stories):

`Small` · `Medium` · `WithFormControlAndHelperComponents` · `WithFormControlAndHelperComponentsDisabled` · `WithFormControlAndHelperComponentsError` · `WithFormControlAndIconComponents` · `WithLongOptionText` · `WithInputLabelTooltipIcon` · `WithMultipleValues`
