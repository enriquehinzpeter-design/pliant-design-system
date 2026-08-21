# RecordDrawer / RecordTitle / ContactRow / TagChip / RecordSectionLabel / RecordRow

```jsx
<RecordDrawer onClose={close} actions={<IconButton size="small"><Icon name="FadersHorizontal" size={20} /></IconButton>}>
  <div style={{ padding: '4px 22px 32px' }}>
    <RecordSectionLabel>Transaction details</RecordSectionLabel>
    <div style={{ display: 'grid', gap: 8 }}>
      <RecordRow label="Merchant" value="MOCO" />
    </div>
  </div>
</RecordDrawer>
```

**600px, no scrim** (code: `DetailsDrawer` paper `width: 100%`, `maxWidth: 600`. The 524px this note
originally carried was a ×0.873 screenshot-capture artifact — `SYNC-FINDINGS.md` §5) — mount it
inside the `position: relative` main column and
collapse the table's middle columns while it is open. Scrim belongs to `FilterDrawer` only.

`RecordTitle` carries the status badge. Placement varies in the product and both forms ship:
`inline` (card drawer, A7) and `below` (member drawer, B1) — pick the one your surface shows.
`ContactRow` is the icon + label-above-value row of a CONTACT DETAILS block; `TagChip` the grey
team tag.
