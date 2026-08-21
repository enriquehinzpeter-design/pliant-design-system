Mutually exclusive choice with 2–5 visible options. Use `Select` beyond that.

```jsx
<RadioGroup name="card-type" value={type} onChange={setType}
  options={[{ value: 'physical', label: 'Physical card' }, { value: 'virtual', label: 'Virtual card' }]} />
```
