Renders any icon in the Pliant set — one API over Phosphor (200 imported glyphs) and the 45 custom fintech SVGs.

```jsx
<Icon name="MagnifyingGlass" size={20} />
<Icon name="ThumbsUp" weight="fill" />
<Icon name="ReceiptAdd" assetBase="../../assets" />
```

- Phosphor glyphs are a webfont — they inherit `currentColor` and `font-size`. The stylesheet is injected on first use.
- Custom Pliant icons render as `<img>`; set `assetBase` (or `window.__PLIANT_ASSET_BASE__`) to the relative path of `assets/`.
- Because they are images, custom icons **do not inherit `currentColor`**. On a filled/contained button (white label) pass `tint` to recolour the glyph white: `<Icon name="VerticalCards" size={18} tint />`. Add `color` (anything other than white) to get near-black instead. Only those two inks are supported — the recolour is a filter, because CSS masking of an external SVG is silently dropped in some embedding contexts and paints a solid block. Never `tint` the multicolour marks (Copilot, partner logos) — it flattens them to one colour.
- **Intentional addition** — the source ships `@pliant/icons` as 244 generated React components; this is one wrapper over the same glyph set.
