Explains a field whose label alone is not enough — pass it to TextField's `tooltip` prop (or a FormControlLabel).

```jsx
<TextField label="Merchant category code" tooltip={<InputLabelTooltipIcon title="MCC is set by the card scheme and cannot be edited." />} />
```

16px glyph, 4px left margin, `text.secondary` — the same treatment as `FormControlLabelTooltipIcon` in the source.
