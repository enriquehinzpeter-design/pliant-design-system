# Switch

**Group:** Forms · **Kind:** Pliant wrapper around `@mui/material/Switch`

> Synced from `infinnity-frontend` `packages/ui/src/components/Switch/index.tsx`.

Colour narrowed to `primary` (default) or `default`.

## Import

```tsx
import { Switch } from '@pliant/ui';
```

## API

Exports `Switch`, with types `SwitchProps`.

## Pliant restyling

None. This component inherits the theme (palette, typography, `shape.borderRadius`) but has no component-level override module, so its MUI defaults stand.

## Rules

- Settings pages: label left, switch right. Dialogs: switch left, label right (docs/03) — set via `FormControlLabel`'s `labelPlacement`.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Switch/index.stories.tsx` (6 stories):

`Small` · `Medium` · `WithLabel` · `WithLabelDisabled` · `WithFormControlAndHelperComponents` · `LabelPlacementStartError`
