# Autocomplete

**Group:** Forms · **Kind:** Pliant wrapper around `@mui/material/Autocomplete`

> Synced from `infinnity-frontend` `packages/ui/src/components/Autocomplete/index.tsx`.

Wraps MUI Autocomplete and supplies the input for you: a Pliant `TextField`, `size="small"`, with a magnifying-glass adornment.

## Import

```tsx
import { Autocomplete } from '@pliant/ui';
```

## API

Exports `Autocomplete`, with types `AutocompleteProps`.

`searchIcon` (default `true`) toggles the adornment. `error`, `helperText`, `label` and `placeholder` are forwarded to the inner TextField. `renderInput` is optional here (MUI requires it) — override it only when the default input is genuinely wrong.

## Pliant restyling

`MuiAutocompleteOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiAutocompleteOverrides: Components<Theme> = {
  MuiAutocomplete: {
    styleOverrides: {
      paper: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[8],
      }),
    },
  },
};
```

## Rules

- Replaces the deprecated `ChipAutocomplete` (docs/03).
- Label rules follow TextField: pass `label`, or an `aria-label`/`aria-labelledby`.
- The dropdown paper gets a divider border and elevation 8 from the theme.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Autocomplete/index.stories.tsx` (5 stories):

`ComboBox` · `NonClearableComboBoxWithCustomMenuItems` · `AsyncWithLimitedOptions` · `AsyncWithUnlimitedOptions` · `Grouped`
