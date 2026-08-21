Toggles a setting that takes effect immediately — receipt requirements, notification preferences, integration on/off.

```jsx
<Switch label="Require receipts over €25" labelPlacement="start" defaultChecked />   // settings row
<Switch label={<span>Transaction review <InfoIcon /></span>} defaultChecked />        // in a dialog
```

**Placement is a context rule, not a preference.** On a **settings page** the label sits left and the
switch flush right (`labelPlacement="start"`, via Pliant's `labelPlacementStart` override:
`justify-content: space-between; margin-left: 0`). **Inside a dialog** the switch leads and the label
follows it (the default `labelPlacement="end"`), as in "Create a new team" (B2) — where the label
also carries a trailing info icon.
