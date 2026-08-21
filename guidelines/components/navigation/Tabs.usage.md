Switches between views of the same object — a card's Overview / Transactions / Settings, or transaction statuses.

```jsx
<Tabs value={tab} onChange={setTab} tabs={[
  { value: 'all', label: 'All', count: 248 },
  { value: 'review', label: 'Needs review', count: 12 },
]} />
```

Row min-height is 42px (`spacing(5.25)`), label type is `button-medium`, ripple is disabled, and the active indicator is a 2px near-black rule.
