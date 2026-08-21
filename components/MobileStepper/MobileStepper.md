# MobileStepper

**Group:** Navigation · **Kind:** Pliant wrapper around `@mui/material/MobileStepper`

> Synced from `infinnity-frontend` `packages/ui/src/components/MobileStepper/index.tsx`.

Locked to `variant="progress"` and `position="static"`, with the same named size scale as LinearProgress (4/8/12px).

> The size of the component.
> @default 'medium'

## Import

```tsx
import { MobileStepper } from '@pliant/ui';
```

## API

Exports `MobileStepper`, with types `MobileStepperProps`.

## Pliant restyling

None. This component inherits the theme (palette, typography, `shape.borderRadius`) but has no component-level override module, so its MUI defaults stand.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/MobileStepper/index.stories.tsx` (3 stories):

`Primary` · `Small` · `LargeDynamic`
