# Badge

**Group:** Core · **Kind:** MUI re-export (`@mui/material/Badge`)

> Synced from `infinnity-frontend` `packages/ui/src/components/Badge/index.tsx`.

Numeric/dot badge. The theme's `colorSecondary` override reads a `badge` token group that **Pliant's own token set does not define** — so `color="secondary"` falls back to MUI's default styling here, and only partner themes change it.

## Import

```tsx
import { Badge } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/Badge`. Props are MUI's `BadgeProps` — this library adds no props of its own.

## Pliant restyling

`MuiBadgeOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material';

export const MuiBadgeOverrides: Components<Theme> = {
  MuiBadge: {
    styleOverrides: {
      colorSecondary: ({ theme }) => {
        const { badge } = theme.tokens;
        if (!badge) return {};
        return {
          backgroundColor: badge.secondaryFill,
          color: badge.secondaryContent,
        };
      },
    },
  },
};
```

## Rules

- The lime accent count badge described in `docs/01-foundations.md` is not produced by `color="secondary"` alone — check the call site before assuming.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Badge/index.stories.tsx` (7 stories):

`Default` · `Dot` · `Secondary` · `ErrorColor` · `Success` · `MaxOverflow` · `ShowZero`
