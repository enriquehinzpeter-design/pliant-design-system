# Dialog

**Group:** Overlays · **Kind:** Pliant wrapper around `@mui/material/Dialog`

> Synced from `infinnity-frontend` `packages/ui/src/components/Dialog/index.tsx`.

Always full-width for its breakpoint: `fullWidth` is forced on and removed from the prop type. Width is controlled with `maxWidth`.

## Import

```tsx
import { Dialog } from '@pliant/ui';
```

## API

Exports `Dialog`, with types `DialogProps`.

## Pliant restyling

`MuiDialogOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiDialogOverrides: Components<Theme> = {
  MuiDialog: {
    defaultProps: {
      fullWidth: true,
    },
    styleOverrides: {
      paper: ({ theme, ownerState }) =>
        ownerState.fullScreen
          ? {}
          : {
              [theme.breakpoints.down('md')]: {
                margin: theme.spacing(1),
                width: `calc(100% - ${theme.spacing(2)})`,
                maxHeight: `calc(100% - ${theme.spacing(2)})`,
              },
            },
    },
  },
};
```

## Rules

- Below `md` the dialog insets itself by 8px on every side unless `fullScreen`.
- Switch rows inside dialogs put the switch first, label second — the reverse of settings pages (docs/03).

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Dialog/index.stories.tsx` (6 stories):

`ExtraSmall` · `Small` · `Medium` · `RealWorldChangeCardLimits` · `RealWorldManageNotifications` · `ImageRight`
