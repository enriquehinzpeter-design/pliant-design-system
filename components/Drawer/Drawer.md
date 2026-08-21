# Drawer

**Group:** Overlays · **Kind:** MUI re-export (`@mui/material/Drawer`)

> Synced from `infinnity-frontend` `packages/ui/src/components/Drawer/index.tsx`.

Unstyled MUI Drawer. The product's record and filter drawers are app-level wrappers (`src/layout/Drawer`) — `DetailsDrawer` opens right, `maxWidth: 600`, elevation 8, **no backdrop**; `FilterDrawer` is 320px wide and keeps its scrim.

## Import

```tsx
import { Drawer } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/Drawer`. Props are MUI's `DrawerProps` — this library adds no props of its own.

## Pliant restyling

None. This component inherits the theme (palette, typography, `shape.borderRadius`) but has no component-level override module, so its MUI defaults stand.

## Rules

- See `docs/04-patterns.md` for which drawer to use. Note the width there (524px) does not match the current `DetailsDrawer` code — raised in SYNC-FINDINGS.md.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Drawer/index.stories.tsx` (2 stories):

`Right` · `Left`
