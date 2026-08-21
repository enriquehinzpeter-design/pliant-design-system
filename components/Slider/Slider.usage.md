Coarse numeric selection where the exact value matters less than the relative position (limit sliders, thresholds).

```jsx
<Slider defaultValue={2500} min={0} max={10000} step={100} marks valueLabel="€2,500" />
```

For an exact figure a user types, use `MoneyField` instead.
