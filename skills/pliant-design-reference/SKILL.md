---
name: pliant-design-reference
description: The authoritative reference for anything Pliant design — tokens, components, interaction patterns, the external (customer) app and internal (ops) app, card artwork, flags, content rules. Use this skill whenever a task involves designing, prototyping, specifying, reviewing, or implementing ANY Pliant user interface or screen, mentions the Pliant design system, components, brand, or visual style, or produces UI code/mockups/prototypes for Pliant — even if the user doesn't say "design system".
---

# Pliant Design Reference

This skill routes you through the Pliant design-system repository. The repo root is this
plugin's parent repository; its stable entry point is `CLAUDE.md`.

## Workflow

1. Read `docs/00-overview.md` (always — it establishes the two-app architecture and sources of truth).
2. Route by task using the table in `CLAUDE.md`. Load ONLY what the task needs:
   customer-facing work → `docs/05-external-app.md`; internal ops work → `docs/06-internal-app.md`;
   never both unless composing the Customer View.
3. Apply the non-negotiables: never invent missing components/assets (flag them);
   fix at token/component/doc level, never per-screen; sentence case; Geist; vector cards;
   SVG flags; app-scoped navigation.
4. When sources conflict, `docs/08-decisions-log.md` wins; below it, the frontend codebase;
   the old "Design System" Figma file is deprecated.

## Quick facts (full detail in the docs)

Primary `#111111`, lime `#e7ff53`, Geist 400/500, radius 8, sidebar 264px, record drawers
524px no scrim, table rows 32/52/72 + 56 header, content cap 840px on settings pages,
default card = gray unbranded in-app icon.
