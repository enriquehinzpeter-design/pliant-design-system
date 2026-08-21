# Checkbox

**Group:** Forms · **Kind:** Pliant wrapper around `@mui/material/Checkbox`

> Synced from `infinnity-frontend` `packages/ui/src/components/Checkbox/index.tsx`.

MUI Checkbox with the colour choice narrowed to `primary` (default) or `default` — the semantic palette colours are deliberately unavailable.

## Import

```tsx
import { Checkbox } from '@pliant/ui';
```

## API

Exports `Checkbox`, with types `CheckboxProps`.

## Pliant restyling

None. This component inherits the theme (palette, typography, `shape.borderRadius`) but has no component-level override module, so its MUI defaults stand.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Checkbox/index.stories.tsx` (8 stories):

`Small` · `Medium` · `Indeterminate` · `WithLabel` · `WithLabelDisabled` · `WithFormControlAndHelperComponents` · `WithFormControlAndHelperComponentsError` · `RealWorld`
