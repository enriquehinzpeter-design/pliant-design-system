# Chip

**Group:** Data · **Kind:** MUI re-export (`@mui/material/Chip`)

> Synced from `infinnity-frontend` `packages/ui/src/components/Chip/index.tsx`.

MUI Chip plus a Pliant-only `tinted` variant: the label colour at full strength on a low-alpha wash of the same colour.

## Import

```tsx
import { Chip } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/Chip`. Props are MUI's `ChipProps`, widened by the augmentations below.

Extends MUI's prop unions (via `declare module`) — these values are Pliant-only and will not appear in MUI's own docs:

- `@mui/material/Chip`: `tinted`

Adds `variant="tinted"`. Tinted `default` and tinted `primary` render identically (both are an 8% near-black wash) — primary is not a separate look.

## Pliant restyling

`MuiChipOverrides.tsx`:

```tsx
import {
  alpha,
  Components,
  ComponentsPropsList,
  Theme,
} from '@mui/material/styles';

// ownerState is returned from MUI, but doesn't exist in a type definition
type StyleOverrides = {
  theme: Theme;
} & {
  ownerState: ComponentsPropsList['MuiChip'];
};

export const MuiChipOverrides: Components<Theme> = {
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none !important',
        ...theme.variables.components['chip-label'],
      }),
      labelSmall: { padding: '3px 10px' },
      labelMedium: { padding: '7px 10px' },
      deleteIcon: { margin: '0 4px 0 -4px;' },
      outlined: ({ theme }) => ({
        '&.MuiChip-outlinedDefault': {
          borderColor: theme.variables.chip.defaultEnabledBorder,
        },
      }),
      iconSmall: {
        fontSize: '16px',
      },
    },
    variants: [
      {
        props: { variant: 'tinted' },
        style: (props) => {
          const { theme, ownerState } = props as unknown as StyleOverrides;

          if (ownerState.color === 'default') {
            return {
              color: theme.palette.text.primary,
              background: alpha(theme.palette.primary.main, 0.08),

              '&.MuiChip-clickable:hover, &.MuiChip-clickable.Mui-focusVisible':
                {
                  backgroundColor: theme.variables.chip.defaultHoverFill,
                },
              '.MuiChip-deleteIcon, .MuiChip-icon': {
                color: theme.palette.action.active,
                '&:hover': {
                  color: theme.palette.action.active,
                },
              },
            };
          }

          const colorName = (ownerState.color || 'primary') as
            'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

          return {
            color: theme.palette[colorName].main,
            background: alpha(theme.palette[colorName].main, 0.12),

            '&.MuiChip-clickable:hover, &.MuiChip-clickable.Mui-focusVisible': {
              backgroundColor: alpha(theme.palette[colorName].dark, 0.16),
            },
            '.MuiChip-deleteIcon, .MuiChip-icon': {
              color: theme.palette[colorName].dark,
              opacity: 0.7,
              '&:hover': {
                color: theme.palette[colorName].dark,
              },
            },
          };
        },
      },
      {
        props: { variant: 'tinted', color: 'primary' },
        style: ({ theme }) => ({
          color: theme.palette.text.primary,
          background: alpha(theme.palette.primary.main, 0.08),

          '&.MuiChip-clickable:hover, &.MuiChip-clickable.Mui-focusVisible': {
            backgroundColor: theme.variables.chip.defaultHoverFill,
          },
          '.MuiChip-deleteIcon, .MuiChip-icon': {
            color: theme.palette.action.active,
            '&:hover': {
              color: theme.palette.action.active,
            },
          },
        }),
      },
      {
        props: { variant: 'tinted', color: 'secondary' },
        style: ({ theme }) => ({
          color: theme.palette.secondary.contrastText,
          background: alpha(theme.palette.secondary.main, 0.16),

          '&.MuiChip-clickable:hover, &.MuiChip-clickable.Mui-focusVisible': {
            backgroundColor: alpha(theme.palette.secondary.dark, 0.18),
          },
        }),
      },
    ],
  },
};
```

## Rules

- Label typography comes from the `chip-label` token; shadows are forcibly removed.
- For a read-only status pill, prefer `StatusBadge` — it is the uppercase micro-label used across the product. Chip is for interactive or removable items.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Chip/index.stories.tsx` (26 stories):

`Default` · `Primary` · `Secondary` · `Error` · `Warning` · `Info` · `Success` · `DefaultOutline` · `PrimaryOutline` · `SecondaryOutline` · `ErrorOutline` · `WarningOutline` · `InfoOutline` · `SuccessOutline` · `DefaultTinted` · `PrimaryTinted` · `SecondaryTinted` · `ErrorTinted` · `WarningTinted` · `InfoTinted` · `SuccessTinted` · `DefaultSmall` · `PrimarySmall` · `ChipClickableAndDeletable` · `ChipWithIcon` · `ChipWithAvatar`
