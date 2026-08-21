A settled value in a bordered box with a trailing pencil — the INT-18 page-header controls.

```jsx
<InlineEditableValueChip label="Account type" value="Prefund"
  editIcon={<Icon name="PencilSimple" size={16} />} onEdit={openEditor} />
<MetaValueRow items={[{ label: 'MCA', value: 'POy, BC (USD)' }, { label: 'Bank account product', value: 'MDESD' }]} />
```

- The colon is part of the component — pass `label="Account type"`, not `"Account type:"`.
- Use it where a value is **displayed and editable in place**: page headers, summary rows. Inside a form, use a real field.
- `MetaValueRow` is the quiet pair line that sits beneath the chips; same label/value contrast, no box, no pencil.
