# Migration status — filling this scaffold

The `docs/` layer is complete (decomposed from the validated Claude Design system).
Binary/content layers are pending export:

- [ ] `tokens/` — pull `tokens/colors.css`, `tokens/fonts.css` via `/design-sync` from Claude Code
- [ ] `components/` — 92 component folders from the design system
- [ ] `templates/` — app-shell, data-table-page, settings-form-page
- [ ] `ui-kits/web-app/` and `ui-kits/internal-app/` — screen renders + READMEs (incl. known gaps)
- [ ] `assets/cards/` — vector card library (139 assets) · `assets/flags/` (8 named + pipeline) · `assets/logos/` (3 SVGs) · `assets/icons/` (45 custom)
- [ ] `docs/legacy-DESIGN-SYSTEM.md` — delete after confirming all content migrated to modular docs
- [ ] Add CODEOWNERS (design team) + branch protection
- [ ] Re-point Claude Design to import from this repo; register plugin in the org catalog

Export command: open this repo in Claude Code → `/design-sync` → review diff → commit.
