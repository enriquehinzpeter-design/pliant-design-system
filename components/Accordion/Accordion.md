# Accordion

**Group:** Navigation · **Kind:** MUI re-export (`@mui/material/Accordion`)

> Synced from `infinnity-frontend` `packages/ui/src/components/Accordion/index.tsx`.

Flat accordion: no elevation, no gutters, a hairline bottom border instead of a card edge.

## Import

```tsx
import { Accordion } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/Accordion`. Props are MUI's `AccordionProps` — this library adds no props of its own.

## Pliant restyling

`MuiAccordionOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiAccordionOverrides: Components<Theme> = {
  MuiAccordion: {
    defaultProps: {
      elevation: 0,
      disableGutters: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&:last-of-type': {
          borderRadius: 0,
        },

        '&:before': { display: 'none' },

        '& .MuiAccordionDetails-root': {
          paddingBottom: theme.spacing(4),
        },
      }),
    },
  },
};
```

## Rules

- `elevation={0}` and `disableGutters` are theme defaults — do not re-add elevation to make a panel stand out; use Paper for that.
- The last panel deliberately squares off (`&:last-of-type { borderRadius: 0 }`) so a stack of panels reads as one list.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Accordion/index.stories.tsx` (2 stories):

`DefaultAccordion` · `ExpandedAccordion`
