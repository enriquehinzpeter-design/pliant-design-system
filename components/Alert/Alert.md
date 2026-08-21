# Alert

**Group:** Feedback · **Kind:** Pliant wrapper around `@mui/material/Alert`

> Synced from `infinnity-frontend` `packages/ui/src/components/Alert/index.tsx`.

Pliant wrapper that adds a footer action slot. Passing `action` renders it on its own row below the message, right-aligned — not inline in MUI's top-right corner.

## Import

```tsx
import { Alert } from '@pliant/ui';
```

## API

Exports `Alert`, with types `AlertProps`.

Extends MUI's prop unions (via `declare module`) — these values are Pliant-only and will not appear in MUI's own docs:

- `@mui/material/Alert`: `neutral`

Adds a `neutral` severity on top of MUI's four. `neutral` only has a `standard` (tinted) form; there is no filled or outlined neutral.

## Pliant restyling

`MuiAlertOverrides.tsx`:

```tsx
import { Components, Theme } from '@mui/material';
import {
  CheckCircleIcon,
  InfoIcon,
  QuestionIcon,
  WarningCircleIcon,
  WarningIcon,
} from '@pliant/icons';

export const MuiAlertOverrides: Components<Theme> = {
  MuiAlert: {
    defaultProps: {
      iconMapping: {
        neutral: <QuestionIcon />,
        error: <WarningCircleIcon />,
        warning: <WarningIcon />,
        info: <InfoIcon />,
        success: <CheckCircleIcon />,
      },
    },
    styleOverrides: {
      root: {
        '.MuiAlert-action': {
          flexShrink: 0,
        },
      },
      standardError: ({ theme }) => ({
        background: theme.variables.alert.errorFill,
        color: theme.variables.alert.errorContent,
      }),
      standardWarning: ({ theme }) => ({
        background: theme.variables.alert.warningFill,
        color: theme.variables.alert.warningContent,
      }),
      standardInfo: ({ theme }) => ({
        background: theme.variables.alert.infoFill,
        color: theme.variables.alert.infoContent,
      }),
      standardSuccess: ({ theme }) => ({
        background: theme.variables.alert.successFill,
        color: theme.variables.alert.successContent,
      }),
      outlinedError: ({ theme }) => ({
        color: theme.variables.alert.errorContent,
      }),
      outlinedWarning: ({ theme }) => ({
        color: theme.variables.alert.warningContent,
      }),
      outlinedInfo: ({ theme }) => ({
        color: theme.variables.alert.infoContent,
      }),
      outlinedSuccess: ({ theme }) => ({
        color: theme.variables.alert.successContent,
      }),
    },
    variants: [
      {
        props: { severity: 'neutral', variant: 'standard' },
        style: ({ theme }) => ({
          background: theme.variables.alert.neutralFill,
          color: theme.variables.alert.neutralContent,
        }),
      },
    ],
  },
  MuiAlertTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.variables.components['alert-title'],
      }),
    },
  },
};
```

## Rules

- Severity fills come from the `alert.*` tokens. `standard` sets both fill and content colour; `outlined` recolours text only.
- Icons are fixed by the theme — neutral→Question, error→WarningCircle, warning→Warning, info→Info, success→CheckCircle. Do not pass a custom icon to make an alert look different.

## Usage

Canonical usage is the Storybook story set — `packages/ui/src/components/Alert/index.stories.tsx` (19 stories):

`StandardError` · `StandardWarning` · `StandardInfo` · `StandardSuccess` · `FilledError` · `FilledWarning` · `FilledInfo` · `FilledSuccess` · `OutlinedError` · `OutlinedWarning` · `OutlinedInfo` · `OutlinedSuccess` · `WithTitle` · `StandardNeutralWithActions` · `StandardErrorWithActions` · `StandardWarningWithActions` · `StandardInfoWithActions` · `StandardSuccessWithActions` · `StandardNeutralWithClose`
