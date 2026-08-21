# Card artwork — traced source vectors

**These are provenance, not the thing to use.** Pliant card artwork is rendered by the parametric
`CardIcon` / `CardRender` components, which are canonical: every colourway, both physical faces and
all badge marks are drawn from token palettes and inline vectors at any size. Never slice a card out
of these files, never upscale a card asset, and never reintroduce PNG card art — the 140 sliced PNGs
that used to live under `assets/cards/` were deleted upstream for exactly that reason.

The files here are the raw Figma exports those components were **traced from**, archived so a future
change to the artwork has something to diff against.

| File | Figma node | Contents |
|---|---|---|
| `card-library-vector-assets.txt` | `5461:73221` (in-app card icons) | 20 SVGs — Visa wordmarks at two sizes, the Mastercard circles (mono + full colour, with the metal gradient stack), the 1× single-use strokes, ShieldCheck, and the category badge glyphs |
| `physical-card-vectors.txt` | `4935:3695` (standard physical card) | 4 SVGs — the Visa wordmark at two sizes and the `1` / `×` strokes. Header notes "fully vector, no raster" |

Export order is the Figma layer order and the assets are **unlabelled**; identify each by viewBox and
fill against the labelled PNG sheet `22-card-inapp-table-icons-1801px.png` in the Claude Design
project's `uploads/`. `guidelines/components/cards/CardIcon.usage.md` carries the mapping that was
worked out from that sheet.

## Not archived here

**`card-detail-art-vectors.txt` (node `4935:2813`, the detail-view art).** It is 259.6 KB and the
DesignSync `get_file` read caps at 256 KiB, so the pull came back with `truncated: true` — 11 of the
20+ assets, the last one severed mid-path. A silently-truncated provenance file is worse than none,
so it was not committed. **Export it from Figma node `4935:2813` directly** if you want it archived.

Its part-by-part mapping is not lost — `guidelines/components/cards/CardIcon.usage.md` and the
web-app kit README both record what each numbered asset is (02 the stepped panel path, 09 the lime
"P" badge, 18 the `pliant` wordmark, 01 the cardholder line, 10 the number fragment, 15 the expiry,
04/05 the contactless glyph, 11 the engraved bird, and so on).

**The two metal rasters.** `metal-brushed.jpg` (the brushed fill layer) and the engraved bird were
never supplied to the design system at all — see `SYNC-FINDINGS.md`. `CardRender`'s `texture` prop is
wired but opt-in, so metal renders its flat tone pair rather than requesting a file that does not
exist.

## Related

- `docs/02-iconography-and-assets.md` — the canonical Figma node references
- `docs/08-decisions-log.md` — "Card rendering: parametric vector components; never upscale"
- `guidelines/components/cards/CardIcon.usage.md` — the component API, size classes and colourways
- `guidelines/brand-cards.card.html`, `guidelines/brand-cards-virtual.card.html` — specimen cards
