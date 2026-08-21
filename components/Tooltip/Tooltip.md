# Tooltip

**Group:** Feedback · **Kind:** Pliant wrapper around `@mui/material/Tooltip`

> Synced from `infinnity-frontend` `packages/ui/src/components/Tooltip/index.tsx`.

Always has an arrow — `arrow` is forced on and removed from the prop type. Dark 75%-black surface with the `tooltip-label` token.

## Import

```tsx
import { Tooltip } from '@pliant/ui';
```

## API

Exports `Tooltip`, with types `TooltipProps`.

## Pliant restyling

`MuiTooltipOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiTooltipOverrides: Components<Theme> = {
  MuiTooltip: {
    defaultProps: { arrow: true },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        padding: theme.spacing(1, 1.5),
        backgroundColor: theme.variables.tooltip.fill,
        ...theme.variables.components['tooltip-label'],
      }),
      arrow: ({ theme }) => ({
        color: theme.variables.tooltip.fill,
      }),
    },
  },
};
```

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Tooltip/index.stories.tsx` (5 stories):

`Default` · `Right` · `Left` · `LongText` · `Hover`

For image previews use `PreviewTooltip`; for a label explainer use one of the TooltipIcon components.
