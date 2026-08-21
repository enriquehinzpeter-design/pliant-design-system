# LoaderWithOverlay

**Group:** Feedback · **Kind:** Pliant component (no MUI base)

> Synced from `infinnity-frontend` `packages/ui/src/components/LoaderWithOverlay/index.tsx`.

Section-level loading state: a translucent white backdrop (absolutely positioned, so it covers its nearest positioned ancestor rather than the page) with a centred spinner.

## Import

```tsx
import { LoaderWithOverlay } from '@pliant/ui';
```

## API

Exports `LoaderWithOverlay`.

`loading` drives it. `aria-label` defaults to `"Loading"`; remaining props go to the inner CircularProgress.

## Pliant restyling

No override module — this component is not a MUI component, so it reads tokens directly in its own source (see the source path above).

## Rules

- The container must be `position: relative` or the overlay escapes to the wrong ancestor.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/LoaderWithOverlay/index.stories.tsx` (1 story):

`Default`
