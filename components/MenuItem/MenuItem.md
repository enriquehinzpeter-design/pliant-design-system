# MenuItem

**Group:** Overlays · **Kind:** MUI re-export (`@mui/material/MenuItem`)

> Synced from `infinnity-frontend` `packages/ui/src/components/MenuItem/index.tsx`.

Typography comes from the `menu-item` token, or `menu-item-dense` when dense — which is the default inside `Menu`.

## Import

```tsx
import { MenuItem } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/MenuItem`. Props are MUI's `MenuItemProps` — this library adds no props of its own.

## Pliant restyling

`MuiMenuItemOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiMenuItemOverrides: Components<Theme> = {
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.variables.components['menu-item'],
      }),
      dense: ({ theme }) => ({
        ...theme.variables.components['menu-item-dense'],
      }),
    },
  },
};
```

## Usage

No Storybook story. Usage is not captured here — read the component source, or the call sites in `infinnity-frontend`, before assuming behaviour.
