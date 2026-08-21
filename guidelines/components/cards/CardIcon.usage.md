The only correct way to show a Pliant card.

**Cards render as parametric vector components at every colourway — including the black physical card and metal. Never upscale a card asset and never use a PNG slice.**

The six flat in-app colourways are drawn from tokens — rounded rect + colourway fill, the Pliant wordmark, and the scheme mark, 1× single-use mark and ShieldCheck mark as inline vectors traced from the Figma vector bundle, plus text slots for label / cardholder / masked number / EXP / CVV. Nothing is sliced or upscaled, so every size class is crisp and a new colourway costs one palette entry.

**The default card is: `size="icon"` · cream · unbranded (`scheme="none"`) · no badge.** Reach for it whenever a design needs a card visual but does not say which. Every other variant is an explicit request.

```jsx
<CardIcon />                                                  // table cell, the default card
<CardIcon colourway="lime" scheme="visa" />                   // org on Visa
<CardIcon colourway="coral" singleUse />                        // 1× single-use mark
<CardIcon colourway="sage" shield />                           // ShieldCheck mark
<CardRender colourway="sage" scheme="mastercard" size="tile" cardholder="Ada Lovelace"
  maskedNumber="**** **** **** 9508" expiry="09/28" cvv="***" />
<CardRender colourway="lime" scheme="visa" label="Enter card label here" singleUse />
<CardRender colourway="black" scheme="visa" size="art" type="physical" />   // vector too
<CardRender colourway="black" face="back" cardholder="Ada Lovelace"        // reveal flow
  company="Analytical Engines Inc." number="4810 6321 1856 1782" expiry="05/29" cvv="820" />
```

### Size classes — one geometry per class, never scaled across them

| `size` | Native | Use |
|---|---|---|
| `"icon"` | **26×40** | table cells and lists |
| `"tile"` | 200×316 | wallet grid, card tiles |
| `"art"` | 320×506 | the card detail drawer |

Pass `height` to fine-tune within a class; the width derives from the class ratio. Do **not** render an `icon` at tile size or a `tile` at icon size.

- Colourways: `cream` (default — `gray`/`grey` alias to it), `lime`, `coral`, `orange`, `sage`, `taupe`, plus the physical `black` and `metal`. All eight are vector — the standard physical card is a fully vector Figma component (node `4935:3695`) and its detail art is node `4935:2813`. `black` and `metal` carry the contact chip; the flat colourways do not. The standard black physical card contains **no texture at all** in its source, so it is pure vector. **Metal** alone carries a brushed finish, and that JPEG rides as a **fill layer inside the vector geometry** — edges, text and marks stay crisp at every size while the finish survives. Pass `texture` (`true` for the standard `assets/cards/metal-brushed.jpg`, or an explicit URL) to switch it on. It is **opt-in** because that asset has not been supplied yet: without it metal renders its flat tone pair rather than requesting a file that isn't there. Adding a colourway means adding a `{ base, panel }` tone pair to `CARD_PALETTE` — no new assets. The two tones are per-colourway (the lower panel is its own sampled colour, not a translucent white wash), so both must come from the art.
- Schemes: `none` (default), `visa`, `mastercard`, `mastercard-commercial`. Scheme is set **per organization**, so never assume Visa. Note the direction: plain **`mastercard` is the monochrome mark** captioned with the lowercase "mastercard" wordmark; **`mastercard-commercial` is the full-colour red/orange mark** and prints "commercial" at the bottom-left instead.
- The security-code label is scheme-driven — **CVV on Visa, CVC on Mastercard** — and the Visa caption is "Platinum Business", or "Infinite Business" on metal. All three come free from `scheme`; only override via `schemeCaption` when a design shows something else.
- `face` is `"front"` (default) or `"back"`. The **back is the card-details / reveal face**, composed from the canonical detail-art parts: cardholder, `company`, the full `number`, expiry, security code, the traced lime "P" mark and `getpliant.com`. The product line stays on the front under the scheme mark. There is no magnetic stripe or signature panel in Pliant's art — do not draw one.
- `type` (`physical` | `virtual`) prints as the small uppercase label top-right — or bottom-left when a badge takes that corner. `singleUse` draws the 1× mark, `shield` the ShieldCheck mark; on `black`/`metal`, `shield` selects the `-detail-shield` raster.
- **Front face** (canonical order): `label` (or the wordmark) top-left → `cardholder` beneath → `maskedNumber` with the visible last four → the `Exp` + security-code row → scheme mark plus `schemeCaption` bottom-right.
- **Where the card type prints is variant-dependent**, per the detail-art matrix: **top-right** on the plain front, **bottom-left** when a `label` or a `singleUse`/`shield` badge takes that corner, and **nowhere** on the physical faces, where the chip owns the corner.
- The two-tone background is traced from the canonical detail-art SVG (asset 02) rather than approximated, so the S-curve boundary is exact at any size.
- Recreating a real screen? Match what the screen shows, not the default.
