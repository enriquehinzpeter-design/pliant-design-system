# Assets — seed extraction from infinnity-frontend

- `logos/` — the three Pliant marks, from `src/assets/svg/`. `pliantLogo.svg` (wordmark) and `pliantIconLogo.svg` inherit `currentColor` — white on dark nav, near-black on light; path count is irrelevant. `pliantRoundLogo.svg` is intentionally full-colour (the lime app-icon, e.g. login) and must not be described as recolouring. See `docs/02` and `SYNC-FINDINGS.md` §11.
- `icons/` — the 45 custom fintech SVGs from `packages/icons/src/assets/` + `imported-phosphor-icons.txt` (the authoritative Phosphor allowlist).
- `integrations/` — the previously missing marketplace logos found in source: Agicap, bookman, BuchhaltungsButler (BAS Fadiro not present in the codebase — remains open, see docs/08).
- Still pending: `cards/` (Figma 💳 Card Library vectors — node refs in docs/02) and `flags/` (Figma flag library) — pull via the Claude Design sync or the Figma pipeline.
