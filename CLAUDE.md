# Pliant Design System Reference — Agent Entry Point

This repository is the **single source of reference for anything design at Pliant**: how our
products look, behave, and speak. Point any harness (specification, development, prototyping)
at this file. This entry point is a stable interface — the structure behind it will grow, but
consumers never need to re-point.

## How to use this repo (context-efficient routing)

Load ONLY what the task needs. Do not read the whole repo.

| Your task | Read |
|---|---|
| Any task (always start here) | `docs/00-overview.md` |
| Anything visual: colors, type, spacing, radius, elevation | `docs/01-foundations.md`; exact values in `tokens/` (`tokens/README.md` first) |
| Icons, logos, card artwork, country flags | `docs/02-iconography-and-assets.md` |
| Which component to use and how | `docs/03-components.md`, then `components/README.md` and the component's own folder |
| Dialogs, drawers, wizards, tables, filters, approvals | `docs/04-patterns.md` |
| Building/prototyping a **customer-facing (external app)** feature | `docs/05-external-app.md` — do NOT load 06 |
| Building/prototyping an **internal ops (back-office)** feature | `docs/06-internal-app.md` — do NOT load 05 unless composing Customer View |
| Writing UI copy, labels, empty states, formats | `docs/07-content-and-voice.md` |
| Resolving a conflict between sources, or checking an open question | `docs/08-decisions-log.md`, then `SYNC-FINDINGS.md` for unresolved code-vs-docs deltas |
| Page scaffolding for a new screen | `templates/` |
| Reference renders of real screens | `ui-kits/web-app/` or `ui-kits/internal-app/` |

## Non-negotiable rules (apply to every task)

1. **Sources of truth, in order:** this repo → the `infinnity-frontend` codebase (tokens/components
   code) → real product screenshots. The Figma file "Design System" is DEPRECATED (exceptions:
   the 💳 Card Library and the flag library nodes — see `docs/02`).
2. **Never invent.** If a component, asset, or rule is missing here, say so and flag it —
   do not approximate. Placeholders are rendered honestly (e.g., the generic flag, "Not captured").
3. **Fix at the source.** Corrections go into tokens/components/docs so they propagate — never
   patch a single screen.
4. **App scoping:** external app = light navigation; internal app = dark navigation wrapping
   the external app via Customer View. Never mix partner white-label styling into either.

## Maintenance

Owned by the Pliant design team. Update flow: `docs/09-sync-workflow.md`.
Consumed by: Claude Design (prototyping), Claude Code / Cowork (via the plugin in this repo),
Cursor, and the specification/development harnesses.
