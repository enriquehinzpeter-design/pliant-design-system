# Popover

**Group:** Overlays · **Kind:** MUI re-export (`@mui/material/Popover`)

> Synced from `infinnity-frontend` `packages/ui/src/components/Popover/index.tsx`.

Same bottom-right/top-right anchoring as Menu, with a divider border on the paper.

## Import

```tsx
import { Popover } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/Popover`. Props are MUI's `PopoverProps` — this library adds no props of its own.

## Pliant restyling

`MuiPopoverOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiPopoverOverrides: Components<Theme> = {
  MuiPopover: {
    defaultProps: {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    },
    styleOverrides: {
      paper: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
      }),
    },
  },
};
```

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Popover/index.stories.tsx` (2 stories):

`Default` · `CenteredBelow`
