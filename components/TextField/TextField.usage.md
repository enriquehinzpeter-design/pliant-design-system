The standard Pliant text input. Note two house deviations from stock MUI: `size="small"` and `fullWidth` are the defaults, and the label sits **above** the field (12px caption, 4px left inset) instead of notching the outline.

```jsx
<TextField label="Legal company name" placeholder="Acme GmbH" />
<TextField label="VAT ID" error helperText="Enter a valid EU VAT identifier" />
<TextField label="Note" multiline rows={4} />
```

- Input text is 16px/24px — never shrink it; the compact feel comes from the 40px height, not smaller type.
- Enabled border is `rgba(0,0,0,0.16)`, disabled `rgba(0,0,0,0.12)`; helper text is 12px with a 4px left inset.
