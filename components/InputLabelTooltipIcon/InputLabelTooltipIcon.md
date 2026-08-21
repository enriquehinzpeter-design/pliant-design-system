# InputLabelTooltipIcon

**Group:** Forms · **Kind:** Pliant component (no MUI base)

> Synced from `infinnity-frontend` `packages/ui/src/components/InputLabelTooltipIcon/index.tsx`.

16px info icon in a tooltip for a field label. Absolutely positioned, so it can sit next to the label without affecting field layout.

## Import

```tsx
import { InputLabelTooltipIcon } from '@pliant/ui';
```

## API

Exports `InputLabelTooltipIcon`, with types `InputLabelTooltipIconProps`.

## Pliant restyling

No override module — this component is not a MUI component, so it reads tokens directly in its own source (see the source path above).

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/InputLabelTooltipIcon/index.stories.tsx` (2 stories):

`Default` · `WithSelect`

Sibling of the field's `InputLabel`. For checkbox/switch rows use `FormControlLabelTooltipIcon` instead.
