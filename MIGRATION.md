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
- [ ] `assets/cards/` — vector card library (139 assets). Figma 💳 Card Library
      `p2bdSeFycWMli0K1wUdnnG`: nodes `5461:68990` (renders), `5461:73221` (in-app icons),
      `4935:3695` (physical), `4935:2813` (detail art). Not in the codebase — pull via the Figma
      pipeline.
- [ ] `assets/flags/` — Figma flag library `g1YQZdrVs2KJtFwfxgtTmD`, node `6436:37649`
      (each flag a named child `Country=<ISO> <Name>`, `Country=X Generic` as the fallback).
      **Read `SYNC-FINDINGS.md` §4 first:** the app renders flags from the `flag-icon-css`
      library, not SVG exports, so decide whether this layer is still wanted before exporting.
- [ ] Resolve `SYNC-FINDINGS.md` — 11 code-vs-docs deltas found by the sync; 10 still need a
      design-team call, then a line in `docs/08-decisions-log.md` (§11 is resolved and applied)
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
