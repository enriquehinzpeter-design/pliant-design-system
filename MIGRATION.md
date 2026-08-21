# Migration status — filling this scaffold

The `docs/` layer is complete (decomposed from the validated Claude Design system).
Remaining layers:

- [x] `tokens/` — synced 2026-08-21 from `themeMui5/variables.ts`. Colours, typography, shape
      and elevation as CSS custom properties, plus a JSON mirror. See `tokens/README.md`.
      `fonts.css` is transcribed from the CDN stylesheet, not generated — the token source only
      names the family.
- [x] `components/` — synced 2026-08-21 from `packages/ui/src`. **88** component folders (not 92
      — see `SYNC-FINDINGS.md` §1), each with its group, export surface, the theme override
      module that restyles it, and its Storybook story set. Inventory: `components/README.md`.
      Not yet included: generated prop tables (needs the package's own `.d.ts` build).
- [ ] `templates/` — app-shell, data-table-page, settings-form-page
- [ ] `ui-kits/web-app/` and `ui-kits/internal-app/` — screen renders + READMEs (incl. known gaps).
      Needs the app running; no sync can produce these from source alone.
- [x] `assets/logos/` — synced 2026-08-21. The 3 Pliant marks. Two colour behaviours: wordmark
      and icon mark inherit `currentColor`, the round mark is intentionally full-colour
      (`SYNC-FINDINGS.md` §11).
- [x] `assets/icons/` — synced 2026-08-21. The 45 custom fintech SVGs, plus
      `imported-phosphor-icons.txt` (the 201-glyph Phosphor allowlist).
- [x] `assets/integrations/` — synced 2026-08-21. Agicap, bookman, BuchhaltungsButler — three of
      the four logos `docs/08` open question 4 records as missing. **BAS Fadiro is not in the
      codebase and remains open.**
- [x] `assets/cards/` — **resolved.** Parametric `CardIcon` / `CardRender` components are canonical;
      there is no per-colourway asset layer to export and the old sliced PNGs were deleted upstream.
      The traced source vectors are archived under `assets/cards/source/` (nodes `5461:73221`,
      `4935:3695`); the detail-art bundle (`4935:2813`) exceeds the sync read cap and must be
      exported from Figma directly if wanted. Node references live in `docs/02-iconography-and-assets.md`.
      Still outstanding: the metal brushed texture (`SYNC-FINDINGS.md`).
- [x] `assets/flags/` — **resolved.** No file export needed: production (`flag-icon-css`) and the
      design system's `Flag` component agree on ISO-keyed rendering in a 16×22 slot, so a country is
      added by code, not by shipping an SVG. Figma node `g1YQZdrVs2KJtFwfxgtTmD` `6436:37649` is
      recorded in `docs/02-iconography-and-assets.md` as the artwork reference. See
      `SYNC-FINDINGS.md` §4.
- [ ] Resolve `SYNC-FINDINGS.md` — 13 entries; **2 resolved and applied** (§4 flags, §11 logo
      colour), 11 open. Two of the open ones are supply gaps rather than decisions: §12 the metal
      texture JPEGs, §13 the BAS Fadiro logo. §5 (record drawer) still needs a call — the
      guidelines card now carries reconciled wording, but `docs/04` and the `docs/08` canonical
      table still say 524px flat.
- [ ] `docs/legacy-DESIGN-SYSTEM.md` — delete after confirming all content migrated to modular docs
- [ ] Add CODEOWNERS (design team) + branch protection
- [ ] Re-point Claude Design to import from this repo; register plugin in the org catalog

## Re-syncing tokens and components

Both layers are generated, so a design-system release is a re-run and a diff review — never a
hand edit. From a checkout of `infinnity-frontend`:

```sh
node scripts/sync/extract-tokens.mjs     <path-to-infinnity-frontend>
node scripts/sync/extract-components.mjs <path-to-infinnity-frontend>
```

`components/` is rebuilt from scratch each run, so a component removed upstream disappears here.
Guidance that should survive a re-run lives in `scripts/sync/component-notes.json`, not in the
generated files. Then: review diff → PR → design-team review → merge (`docs/09-sync-workflow.md`).
