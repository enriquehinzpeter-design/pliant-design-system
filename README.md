# Pliant Design System Reference

The version-controlled home of Pliant's design system reference — the single place any AI
agent or human looks up how Pliant products should look, behave, and speak. Owned by the
**design team**; consumed by Claude Design, Claude Code/Cowork (as a plugin), Cursor, and
the specification/development harnesses.

- **Agents start at [`CLAUDE.md`](CLAUDE.md)** (or `AGENTS.md`) — the stable entry point.
- **Humans start at [`docs/00-overview.md`](docs/00-overview.md)**.
- How updates flow: [`docs/09-sync-workflow.md`](docs/09-sync-workflow.md).
- Migration status (what's synced vs pending): [`MIGRATION.md`](MIGRATION.md).
- Open code-vs-docs deltas awaiting a design call: [`SYNC-FINDINGS.md`](SYNC-FINDINGS.md).

## Structure
```
CLAUDE.md / AGENTS.md   stable agent entry points (routing + non-negotiables)
docs/                   modular reference (foundations, assets, components, patterns,
                        external app, internal app, content, decisions, sync workflow)
tokens/                 design tokens as CSS custom properties + JSON (generated)
components/             per-component docs for @pliant/ui's 88 components (generated)
templates/              page scaffolds (app shell, data-table page, settings page)
ui-kits/                reference renders: web-app/ and internal-app/
assets/                 logos, cards (vector library), flags, custom icons
skills/                 the pliant-design-reference skill
scripts/sync/           the extractors that generate tokens/ and components/
.claude-plugin/         plugin manifest (install via the org plugin catalog)
```

`tokens/` and `components/` are generated from the `infinnity-frontend` codebase — edit the
extractors or the codebase, never the output. See [`MIGRATION.md`](MIGRATION.md#re-syncing-tokens-and-components).
