# Breadcrumbs

**Group:** Navigation · **Kind:** MUI re-export (`@mui/material/Breadcrumbs`)

> Synced from `infinnity-frontend` `packages/ui/src/components/Breadcrumbs/index.tsx`.

Page headers pair a small breadcrumb line with a large title, always both (docs/01).

## Import

```tsx
import { Breadcrumbs } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/Breadcrumbs`. Props are MUI's `BreadcrumbsProps` — this library adds no props of its own.

## Pliant restyling

None. This component inherits the theme (palette, typography, `shape.borderRadius`) but has no component-level override module, so its MUI defaults stand.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Breadcrumbs/index.stories.tsx` (4 stories):

`Default` · `WithHover` · `Collapsed` · `CustomSeparator`
