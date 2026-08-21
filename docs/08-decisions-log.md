# 08 — Decisions log

## Canonical decisions (resolve conflicts in favor of these)
| Decision | Value |
|---|---|
| Type family | Geist only (400/500) |
| Icons | Phosphor (200 glyphs) + 45 custom fintech SVGs; PNG never used for icons |
| Buttons | Sentence case |
| Default radius | 8px |
| Nav scoping | External = light; Internal = dark (internalTheme); partner overlays out of scope |
| Default card asset | In-app icon, Gray, no scheme, no label, no badge — all else explicit |
| Card rendering | Parametric vector components; per-size 2× raster only for genuine textures; never upscale |
| Card artwork source | Figma 💳 Card Library `p2bdSeFycWMli0K1wUdnnG` (nodes 5461:68990 renders, 5461:73221 in-app icons, 4935:3695 physical, 4935:2813 detail art) |
| Flags | SVG from Figma flag lib `g1YQZdrVs2KJtFwfxgtTmD` node `6436:37649`, ISO-keyed, 16×22; `Country=X Generic` as fallback; never emoji |
| Card scheme | Per-organization (Visa or Mastercard) — never assume |
| Record drawer | 524px, no scrim |
| Content max width | 840px on settings/detail (observed — pending engineering confirmation) |

## Open questions (design team)
1. Status-label color tokens for PENDING/DECLINED etc. — same styles reused in filter checkbox labels, so they are a token set; formalize values.
2. Category→icon map: Advertising & Marketing and Services have no confident icon match.
3. Product inconsistencies reproduced as-is: REQUESTED tint differs by surface (red/pink Wallet vs grey Cards); ACTIVE has two badge forms; StatusBadge placement differs between card drawer (inline) and member drawer (below title).
4. Four integration logos missing (Agicap, BAS Fadiro, bookman, BuchhaltungsButler).
5. Full 240-flag export pending (per-ISO fetch pipeline proven).
