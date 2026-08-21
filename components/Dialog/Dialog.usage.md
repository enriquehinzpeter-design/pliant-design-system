Modal for a short focused task (issue a card, confirm a termination) — not for a whole workflow; that gets its own page.

```jsx
<Dialog title="Terminate card" onClose={close}
  actions={<><Button variant="text" color="neutral" onClick={close}>Cancel</Button><Button color="error">Terminate</Button></>}>
  <Typography variant="body2">This cannot be undone. Pending transactions will still settle.</Typography>
</Dialog>
```

- Padding is exactly 24px on title, content and actions (16px left/right below the `sm` breakpoint).
- `fullWidth` is on by default; title type is `h6` (20px / 500).
