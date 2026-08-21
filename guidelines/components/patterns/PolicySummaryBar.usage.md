# PolicySummaryBar / InlineChip / OptionCard

```jsx
<PolicySummaryBar action={<Button>Edit Timeframe</Button>}>
  <InlineChip label="7 days" /> after transaction date OR <InlineChip label="3 days" /> after end of month
</PolicySummaryBar>
```

Reads a configured policy back as a sentence on the warm `#f5f5f0` surface, values as grey chips —
never a form. `OptionCard` is the paired exemption card: title plus an editable value (pencil,
hairline underline) or body copy with a text action.
