# 02 — Iconography & assets

## Icons — two sources, one visual language
1. **Phosphor** (~200 imported glyphs, list: `packages/icons/imported-phosphor-icons.txt`). Regular weight default; fill/duotone only where the import list names them.
2. **45 custom fintech SVGs** (`assets/icons/`): card lifecycle (VerticalCards, VerticalCardRequest…), receipts, bank movements, approval guards, file formats (MT940, PAIN, VSS), partner marks. Reach for these before improvising a Phosphor near-match.
- Sizing: 16 inline, 18–20 buttons/lists/menus, 22–24 standalone, 28–32 empty states/tiles. Icons inherit `currentColor`.
- **Nav icon map** (authoritative, from `useOrgTabs.tsx`): Dashboard=SquaresFour, Wallet=Wallet, Members&Teams=Users, Accounts=Bank, Cards=VerticalCards, Transactions=ListBullets, Accounting Export=BookOpen, Billing=Files, Rewards=Star, Merchants=Storefront, Settings=Gear(inferred).
- Alerts icon mapping fixed via MuiAlertOverrides: neutral→Question, error→WarningCircle, warning→Warning, info→Info, success→CheckCircle.

## Logos (`assets/logos/`)
Three marks, two colour behaviours:
- **`pliantLogo.svg`** (64×24 wordmark) and **`pliantIconLogo.svg`** — inherit `currentColor`: white on the dark sidebar, near-black on light. Path count is irrelevant; what matters is that they inherit.
- **`pliantRoundLogo.svg`** — **intentionally full-colour** (the lime app-icon, e.g. login). Do not describe or treat it as recolouring; its fixed colours are correct. Use it in circular app-icon and avatar slots.

No lockups, no drop shadow. See `SYNC-FINDINGS.md` §11 for the decision behind the two behaviours.

## Card artwork (`assets/cards/`) — see also 08-decisions-log
- **Everything renders as parametric vector components** (`CardRender` faces front/back, `CardIcon` 25×39 table icons): rounded rect + colourway fill (lime, coral, orange, sage, taupe, cream, black, metal) + Pliant mark + scheme mark + 1×/shield badges + text slots. Physical black is pure vector (node 4935:3695); only metal textures are raster (per-size 2×, never upscaled).
- Card cells in tables use **in-app icons at 26×40 (`background-size: contain`)** — never scaled full renders, never drawn rects.
- Default when unspecified: **gray unbranded in-app icon** (no scheme/label/badge).

## Country flags (`assets/flags/`)
SVG only, ISO-code keyed, 16×22 (circular variants in selectors). Source: Figma flag library node `6436:37649` (every flag a named child `Country=<ISO> <Name>`). `Country=X Generic` is the official unknown-code fallback. Used in: currency/account selectors, bank/address country fields, member nationality, card country restrictions, merchant country columns, phone prefixes, legal-doc language tabs.
