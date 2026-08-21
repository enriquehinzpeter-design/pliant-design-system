Pliant's canonical way to show record state — transaction status, card status, approval state, export state.

```jsx
<StatusBadge label="Confirmed" color="success" />
<StatusBadge label="Needs review" color="warning" />
<StatusBadge label="Declined" color="error" variant="filled" />
```

- Default `tinted` uses the alert fill/content pairs, so a badge and its matching Alert always agree in colour.
- Type is `overline` (12px / 500 / 1px tracking) with line-height forced to 12px; radius is 8px, not a pill.
- Prefer this over `Chip` whenever the value is a **state**, not a user-removable token.
