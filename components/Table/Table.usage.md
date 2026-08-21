Every list surface in Pliant — transactions, cards, employees, exports. Visually matches the restyled MUI X Data Grid Pro.

```jsx
<Table onRowClick={openDrawer} columns={[
  { field: 'merchant', headerName: 'Merchant' },
  { field: 'amount', headerName: 'Amount', align: 'right' },
  { field: 'status', headerName: 'Status', renderCell: (r) => <StatusBadge label={r.status} color={r.tone} /> },
]} rows={transactions} />
```

Exact geometry from `MuiDataGridOverrides`: no outer border, column separators hidden, uppercase 12px/500 headers, first cell padded 16px left, last cell 20px right (scrollbar clearance). Rows only get a hover tint when `onRowClick` is set.

### Row-height scale — pick per screen, do not eyeball

| `density` | Header | Row | Use |
|---|---|---|---|
| `"default"` | **56px** | **72px** | every full-page data table — Members is the reference row (Transactions, Cards, Card requests, Merchants, Accounting export, all internal lists) |
| `"dense"` | **36px** | **32px** | tables inside dialogs, drawers and dashboard summaries only |
| `"media"` | **56px** | **72px** | alias of default, kept for rows carrying a card-thumbnail or avatar **stack** |

`dense` remains as shorthand for `density="dense"`. Tokens: `--datagrid-row-height`, `--datagrid-row-height-small`, `--datagrid-row-height-media`, `--datagrid-header-height`, `--datagrid-header-height-small`.
