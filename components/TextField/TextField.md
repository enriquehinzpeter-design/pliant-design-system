# TextField

**Group:** Forms · **Kind:** Pliant wrapper around `@mui/material/TextField`

> Synced from `infinnity-frontend` `packages/ui/src/components/TextField/index.tsx`.

Outlined text field, full-width and small by default. `variant`, `color` and `fullWidth` are removed from the prop type — outlined is the only form.

## Import

```tsx
import { TextField } from '@pliant/ui';
```

## API

Exports `TextField`, with types `TextFieldProps`.

Labelling is enforced by the type: pass `label`, `aria-label`, or `aria-labelledby`. The label is always shrunk and the border notch always closed.

## Pliant restyling

`MuiTextFieldOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material/styles';

export const MuiTextFieldOverrides: Components<Theme> = {
  MuiTextField: {
    defaultProps: {
      fullWidth: true,
      size: 'small',
    },
  },
};
```

## Rules

- 16px input text (`input-text` token) on a white fill with a 16%-black border; the disabled border drops to 12%.
- For a field with an explainer icon, add `InputLabelTooltipIcon`.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/TextField/index.stories.tsx` (8 stories):

`Small` · `Medium` · `Disabled` · `Error` · `Textarea` · `TextareaAutosize` · `WithIcon` · `WithInputLabelTooltipIcon`
