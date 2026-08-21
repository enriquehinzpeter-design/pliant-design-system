The dismissible filter-value pills beneath a table toolbar (INT-24). Applies to **both apps**.

```jsx
<FilterPills items={[{ key: 'status', label: 'DRAFT +2' }]} onRemove={clear}
  removeIcon={<Icon name="XCircle" size={16} weight="fill" />} />
```

- **One pill per applied filter group**, summarising its values. Removing a pill clears that whole group; removing individual values happens back in the `FilterDrawer`.
- The row sits **below the toolbar on its own line**, never inline, so a long filter set cannot squeeze the search field.
- Renders `null` when nothing is applied — no reserved empty band.
