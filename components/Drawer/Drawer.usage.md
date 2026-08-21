Right-hand details panel — the Pliant pattern for inspecting a transaction or card without leaving the list.

```jsx
<Drawer open={!!selected} onClose={clear}>
  <TransactionDetails tx={selected} />
</Drawer>
```

Width is 524px (`--record-drawer-width`) and there is **no scrim** — list tables collapse their middle columns so the row stays visible behind it. For a record panel prefer `RecordDrawer`, which ships this geometry plus the header, section labels and hairline rows; for the scrimmed filter panel use `FilterDrawer`.
