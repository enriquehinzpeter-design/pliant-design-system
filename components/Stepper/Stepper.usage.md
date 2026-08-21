Sequential progress through a flow the user cannot skip around in — KYC onboarding, bulk card request, accounting export run.

```jsx
<Stepper activeStep={1} steps={['Company details', 'Beneficial owners', 'Verification']} />
```

Active and completed labels switch to `subtitle2` (14px / 500) per the `MuiStepLabel` override; upcoming labels stay `body2` and disabled-grey.
