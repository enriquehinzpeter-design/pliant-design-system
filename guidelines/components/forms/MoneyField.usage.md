Amount entry — card limits, reimbursement amounts, budget caps. Right-aligns the figure with the currency symbol in a leading adornment.

```jsx
<MoneyField label="Monthly limit" currency="EUR" value="2500.00" />
<PercentField label="VAT rate" value="19" />
```

Pliant's real implementation is locale-sensitive (`useLanguageSensitiveProps`); this recreation keeps the visual contract only.
