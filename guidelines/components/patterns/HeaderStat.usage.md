Two right-aligned page-header treatments from the internal app.

```jsx
<HeaderStat label="Cumulative Amount" value="-$283,313.08" />              // INT-20
<HeaderMeta label="Activated at" value="12.06.2026"
  action={<Button variant="text" startIcon={<Icon name="DownloadSimple" size={18} />}>Export</Button>} />  // INT-18
```

Both sit in the header's **action slot**, so a page shows either one of these or its buttons — no capture shows both. The figure is plain ink at title scale: a negative cumulative amount is **not** tinted red.
