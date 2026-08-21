# CircularProgress

**Group:** Feedback · **Kind:** Pliant wrapper around `@mui/material/CircularProgress`

> Synced from `infinnity-frontend` `packages/ui/src/components/CircularProgress/index.tsx`.

Spinner with named sizes (small 18px, medium 32px, large 64px) and a fixed 3px stroke, so loading states stay consistent.

> The size of the component.
> @default 'medium'

## Import

```tsx
import { CircularProgress } from '@pliant/ui';
```

## API

Exports `CircularProgress`, with types `CircularProgressProps`.

**`aria-label` is required** by the type. In `determinate` mode it renders a grey track behind the value ring; MUI does not.

## Pliant restyling

None. This component inherits the theme (palette, typography, `shape.borderRadius`) but has no component-level override module, so its MUI defaults stand.

## Rules

- Pass one of the named sizes, not a pixel number — the numeric MUI `size` is replaced by this union.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/CircularProgress/index.stories.tsx` (3 stories):

`Small` · `Medium` · `Large`
