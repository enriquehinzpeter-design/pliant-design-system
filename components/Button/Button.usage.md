Pliant's action control — use for any user-triggered action; the default `contained` primary is near-black (#111111), not a hue.

```jsx
<Button onClick={save}>Save changes</Button>
<Button variant="outlined" color="neutral" size="small">Cancel</Button>
<Button variant="text" startIcon={<Icon name="Plus" />}>Add member</Button>
```

- Variants: `contained` (default), `outlined`, `text`. Colors: `primary`, `neutral`, `error`, `success`, `secondary` (brand lime).
- Sizes map to the `button-large/medium/small` type tokens (15/14/13px, weight 500).
- Labels are **sentence case** — never ALL CAPS. Elevation is disabled by default.
