Inline banner at the top of a page, panel or dialog.

```jsx
<Alert severity="warning" title="12 transactions need review">Add a receipt or a note before the month closes.</Alert>
<Alert severity="neutral" icon={false}>Exports run at 02:00 CET.</Alert>
```

- Five severities: `error`, `warning`, `info`, `success` and Pliant's added `neutral`.
- Icons come from `@pliant/icons` (WarningCircle, Warning, Info, CheckCircle, Question) — the Phosphor set.
- Standard (tinted) is the default and the right choice in-page; `filled` is reserved for Snackbars.
