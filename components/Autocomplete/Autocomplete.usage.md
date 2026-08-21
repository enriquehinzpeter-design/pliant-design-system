Type-to-filter picker for long lists — merchants, employees, GL accounts, cost centres. Replaces the deprecated `ChipAutocomplete`.

```jsx
<Autocomplete label="Assign to" options={employees} onChange={setAssignee} />
```

The dropdown paper carries a `--divider` border **and** `--shadow-8`, and its list is capped at 40vh — the same cap Menu uses.
