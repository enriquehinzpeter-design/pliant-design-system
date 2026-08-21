`Tooltip` explains a truncated value or an icon-only control. `PreviewTooltip` is Pliant-specific: a white, shadowed panel showing a 192px-tall receipt image.

```jsx
<Tooltip title="Exported to DATEV on 03 Apr"><Icon name="CloudCheck" /></Tooltip>
<PreviewTooltip src={receipt.thumbnailUrl}><Icon name="Receipt" /></PreviewTooltip>
```

Arrows are on by default. Dark fill is `rgba(0,0,0,0.75)`; label is 13px / 500 / 120%.
