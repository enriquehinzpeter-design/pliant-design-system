# Menu

**Group:** Overlays · **Kind:** MUI re-export (`@mui/material/Menu`)

> Synced from `infinnity-frontend` `packages/ui/src/components/Menu/index.tsx`.

Dense by default, anchored bottom-right to top-right, and capped at 40vh so long menus scroll rather than run off screen.

## Import

```tsx
import { Menu } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/Menu`. Props are MUI's `MenuProps` — this library adds no props of its own.

## Pliant restyling

`MuiMenuOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiMenuOverrides: Components<Theme> = {
  MuiMenu: {
    defaultProps: {
      MenuListProps: { dense: true },
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
      list: {
        maxHeight: '40vh', // same as the default height in MUI Autocomplete dropdown menus
      },
    },
  },
};
```

## Rules

- Menu items pick up the `menu-item-dense` token because of the dense default — the denser 14px type is the norm, not an exception.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Menu/index.stories.tsx` (4 stories):

`Default` · `OpensAbove` · `WithSubheaderAndIcons` · `WithMenuList`
