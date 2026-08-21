# PreviewTooltip

**Group:** Feedback · **Kind:** Pliant component (no MUI base)

> Synced from `infinnity-frontend` `packages/ui/src/components/PreviewTooltip/index.tsx`.

Tooltip that shows an image instead of text — white surface, elevation 4, 192px tall, capped at 40vw. Used for receipt and document thumbnails.

## Import

```tsx
import { PreviewTooltip } from '@pliant/ui';
```

## API

Exports `PreviewTooltip`, with types `PreviewTooltipProps`.

`src` may be null/undefined, in which case no tooltip content renders.

## Pliant restyling

No override module — this component is not a MUI component, so it reads tokens directly in its own source (see the source path above).

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/PreviewTooltip/index.stories.tsx` (1 story):

`Default`
