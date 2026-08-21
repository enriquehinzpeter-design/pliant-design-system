# Table

**Group:** Data · **Kind:** MUI re-export (`@mui/material/Table`)

> Synced from `infinnity-frontend` `packages/ui/src/components/Table/index.tsx`.

MUI's table primitive, exported unrestyled. **The product's data tables are MUI X DataGrid**, restyled app-side; these primitives are for small static tables inside dialogs and panels.

## Import

```tsx
import { Table } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/Table`. Props are MUI's `TableProps` — this library adds no props of its own.

## Pliant restyling

None. This component inherits the theme (palette, typography, `shape.borderRadius`) but has no component-level override module, so its MUI defaults stand.

## Rules

- Cell typography (`body2`), divider borders and uppercase headers come from the app-level `MuiTableOverrides`, which is not part of this package — a prototype importing only `@pliant/ui` will not get them.
- The table geometry in `docs/01-foundations.md` (56px header, 52px rows, 72px media rows) describes DataGrid, not these components.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Table/index.stories.tsx` (4 stories):

`SimpleTable` · `DenseTable` · `WithTableContainer` · `TableWithSort`
