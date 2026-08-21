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
- [ ] `assets/` — `logos/` (3 SVGs exist as `pliantLogo.svg`, `pliantIconLogo.svg`,
      `pliantRoundLogo.svg` in `src/assets/svg/`) · `icons/` (45 custom SVGs exist in
      `packages/icons/src/assets`) · `cards/` (vector library — Figma-sourced) ·
      `flags/` (the app uses the `flag-icon-css` library, not SVG exports — see
      `SYNC-FINDINGS.md` §4 before exporting anything)
- [ ] Resolve `SYNC-FINDINGS.md` — 10 code-vs-docs deltas found by the first sync, each needing a
      design-team call, then a line in `docs/08-decisions-log.md`
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
