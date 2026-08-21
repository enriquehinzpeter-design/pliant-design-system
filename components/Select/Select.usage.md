Single-choice picker for a known, short option list. Replaces the deprecated `ChipSelect`.

```jsx
<Select label="Cost centre" options={['Marketing', 'Sales', 'R&D']} />
<Select label="Currency" options={[{ value: 'EUR', label: 'Euro (EUR)' }]} />
```

Matches TextField exactly: small + fullWidth defaults, label above the field, `notched={false}`.
