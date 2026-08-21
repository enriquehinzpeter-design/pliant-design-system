# LinearProgress

**Group:** Feedback · **Kind:** Pliant wrapper around `@mui/material/LinearProgress`

> Synced from `infinnity-frontend` `packages/ui/src/components/LinearProgress/index.tsx`.

Progress bar with named sizes (4/8/12px, radius half the height) on a grey track. Defaults to `determinate` — pass `indeterminate` or `query` when there is no value.

> The size of the component.
> @default 'medium'

> The variant to use.
> Use indeterminate or query when there is no progress value.
> @default 'determinate'

## Import

```tsx
import { LinearProgress } from '@pliant/ui';
```

## API

Exports `LinearProgress`, with types `LinearProgressProps`.

Requires `aria-label` or `aria-labelledby`.

## Pliant restyling

None. This component inherits the theme (palette, typography, `shape.borderRadius`) but has no component-level override module, so its MUI defaults stand.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/LinearProgress/index.stories.tsx` (9 stories):

`Primary` · `Secondary` · `Success` · `ErrorState` · `Info` · `Warning` · `Small` · `Large` · `Loading`
