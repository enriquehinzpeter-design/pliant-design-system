# MiniCardTile

```jsx
<MiniCardTile name="Test" masked="****" available={0} limit={1} currency="GBP"
  leading={<CardIcon colourway="gray" scheme="visa" />} />
```

The CARDS block inside a member detail drawer (B1) — three per row in a 600px drawer
(originally noted as 524px; see `SYNC-FINDINGS.md` §5).
Zero available is error red. Bar is 2px, same ramp as `LimitMeter`; use that component
instead when the meter stands alone in a table cell.
