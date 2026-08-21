# Pliant Design System Reference

The version-controlled home of Pliant's design system reference — the single place any AI
agent or human looks up how Pliant products should look, behave, and speak. Owned by the
**design team**; consumed by Claude Design, Claude Code/Cowork (as a plugin), Cursor, and
the specification/development harnesses.

- **Agents start at [`CLAUDE.md`](CLAUDE.md)** (or `AGENTS.md`) — the stable entry point.
- **Humans start at [`docs/00-overview.md`](docs/00-overview.md)**.
- How updates flow: [`docs/09-sync-workflow.md`](docs/09-sync-workflow.md).
- Migration status (what's synced vs pending): [`MIGRATION.md`](MIGRATION.md).

## Structure
```
CLAUDE.md / AGENTS.md   stable agent entry points (routing + non-negotiables)
docs/                   modular reference (foundations, assets, components, patterns,
                        external app, internal app, content, decisions, sync workflow)
tokens/                 design tokens (synced from Claude Design / codebase)
components/             component library docs + code (synced)
templates/              page scaffolds (app shell, data-table page, settings page)
ui-kits/                reference renders: web-app/ and internal-app/
assets/                 logos, cards (vector library), flags, custom icons
skills/                 the pliant-design-reference skill
.claude-plugin/         plugin manifest (install via the org plugin catalog)
```
