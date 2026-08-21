# MenuContainer

**Group:** Overlays · **Kind:** Pliant component (no MUI base)

> Synced from `infinnity-frontend` `packages/ui/src/components/MenuContainer/index.tsx`.

Owns menu open/close state so callers do not have to. Give it a trigger and children; it wires up the anchor, marks the trigger `selected` while open, and closes the menu after a child's `onClick` runs.

> Handy wrapper component that takes care of menu state in most cases.

## Import

```tsx
import { MenuContainer } from '@pliant/ui';
```

## API

Exports `MenuContainer`, with types `MenuContainerProps`.

`button` is either an element or a function receiving the open handler. `buttonSelectedClass` defaults to `"selected"`, which the IconButton override styles.

## Pliant restyling

No override module — this component is not a MUI component, so it reads tokens directly in its own source (see the source path above).

## Rules

- Children must be elements that accept `onClick` — it is cloned onto each one.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/MenuContainer/index.stories.tsx` (3 stories):

`Basic` · `OpenAbove` · `RenderFunction`
