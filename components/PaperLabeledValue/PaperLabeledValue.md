# PaperLabeledValue

**Group:** Data · **Kind:** Pliant component (no MUI base)

> Synced from `infinnity-frontend` `packages/ui/src/components/PaperLabeledValue/index.tsx`.

Outlined Paper row with a caption label on the left and a value on the right — the read-only detail row used across record views.

## Import

```tsx
import { PaperLabeledValue } from '@pliant/ui';
```

## API

Exports `PaperLabeledValue`.

`label` is a string, `value` is any node. Ships with its own 16px padding and 16px bottom margin, so stack them directly.

## Pliant restyling

No override module — this component is not a MUI component, so it reads tokens directly in its own source (see the source path above).

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/PaperLabeledValue/index.stories.tsx` (4 stories):

`Default` · `NumericValue` · `ValueAsNode` · `CustomSx`
