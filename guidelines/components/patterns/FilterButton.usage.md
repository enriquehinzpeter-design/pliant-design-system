The toolbar filter control. **Idle and active are different controls, not a tint**: with nothing applied it is a plain text button; once filters are applied it becomes a **solid dark button carrying the count** — "Filter (1)".

```jsx
<FilterButton count={applied.length} onClick={openDrawer} icon={<Icon name="FadersHorizontal" size={18} />} />
```

**The count is the number of filter GROUPS**, not values: INT-24 shows "Filter (1)" alongside a single pill reading "DRAFT +2", i.e. one group holding three values. Pair it with `FilterPills`; the shared `Toolbar` wires both from `filterCount` / `filterPills`.
