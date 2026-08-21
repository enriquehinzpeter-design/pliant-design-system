# AlertTitle

**Group:** Feedback · **Kind:** MUI re-export (`@mui/material/AlertTitle`)

> Synced from `infinnity-frontend` `packages/ui/src/components/AlertTitle/index.tsx`.

Title row of an Alert. Uses the `alert-title` type token (16px/500), which is why it does not match `subtitle1`.

## Import

```tsx
import { AlertTitle } from '@pliant/ui';
```

## API

Re-exported from `@mui/material/AlertTitle`. Props are MUI's `AlertTitleProps` — this library adds no props of its own.

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

## Usage

No Storybook story. Usage is not captured here — read the component source, or the call sites in `infinnity-frontend`, before assuming behaviour.
