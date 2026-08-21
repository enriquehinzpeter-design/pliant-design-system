Compact token — active filters, category tags, selected accounting codes.

```jsx
<Chip label="Travel" variant="tinted" />
<Chip label="Needs review" variant="tinted" color="warning" size="small" />
<Chip label="Marketing" variant="outlined" onDelete={remove} />
```

- `tinted` is the house default look in Pliant surfaces; `filled` is high-emphasis and rare.
- Label padding is exactly 3px/10px (small) and 7px/10px (medium); box-shadow is always suppressed.
