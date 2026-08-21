# FilterDrawer

```jsx
<FilterDrawer onClose={close} onApply={apply} sections={[
  { title: 'Status', type: 'checkbox', options: ['PENDING', 'DECLINED', 'REVERSED', 'BOOKED'] },
  { title: 'Type', type: 'checkbox', options: ['PURCHASE', 'REFUND', 'CHARGEBACK', 'RECHARGE', 'CASH WITHDRAWAL', 'CARD CHECK'] },
  { title: 'Export status', type: 'select' },
  { title: 'Dates', type: 'field' },
]} />
```

283px, right, **with a scrim** — it is the one scrimmed drawer in the system; record drawers
have none. Sections collapse; the caret points up when open. Checkbox labels are `StatusToken`s,
never plain text. Footer sticks to the bottom: "Reset all" stays disabled until something is
picked, Apply is the contained action.

### The active-filter state (both apps)

Once filters are applied the toolbar changes, not just the drawer — see the `FilterBar` notes. The Filter control becomes a **solid dark button carrying the count of applied GROUPS** ("Filter (1)"), and a row of **dismissible pills** appears beneath the toolbar, one per group, each summarising its values ("DRAFT +2"). Removing a pill clears that whole group; removing individual values happens back in the drawer. Observed on INT-24, and it applies to every table toolbar in both apps — the shared `Toolbar` takes `filterCount`, `filterPills` and `onRemoveFilter`.
