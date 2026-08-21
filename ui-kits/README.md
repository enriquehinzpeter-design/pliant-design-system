# UI kits

Reference renders of the two Pliant apps, imported from the **Pliant Design System** Claude Design
project (`8f7377b8`).

| | Files | Coverage |
|---|---|---|
| [`web-app/`](web-app/README.md) | 26 | **External app** (customer-facing admin), recreated from 35 reference screenshots of the live product. Complete for every captured nav destination, sub-tab, dialog, drawer and popover. |
| [`internal-app/`](internal-app/README.md) | 8 | **Internal app** (Pliant ops), from `INT-01`…`INT-27`. The dark shell, the cross-organisation lists, and Customer View — which renders the entire external app under a banner rather than forking it. |

**Read each kit's README first.** They are the most valuable part of this import: nav trees, the
overlay geometry table, verbatim empty-state copy, card-art rules, the Aug-2026 design-team
corrections, and — most importantly — the *Known gaps and judgement calls* / *Ambiguities* sections,
which record exactly what was inferred, what was measured, and what was deliberately left as an
honest "Not captured" rather than invented.

## These are source, not a runnable app

Each kit's `index.html` loads `../../styles.css` and `../../_ds_bundle.js`, and the screens render
components off `window.PliantDesignSystem_8f7377`. None of those exist in this repo — they are
Claude Design project-root files outside the scope of this import. So:

- The `.jsx` files are **reference implementations**: read them to see how a screen is composed, what
  props a pattern takes, and which token drives which value.
- They will not render by opening `index.html` here. Running them means either opening the project at
  claude.ai/design, or additionally importing `styles.css`, `tokens/*.css` and the compiled
  `_ds_bundle.js`.
- The component vocabulary they use (`RecordDrawer`, `SummaryPanel`, `CardIcon`, `Flag`, `Sidebar`,
  `Table` with its `density` scale) is the Claude Design project's set, documented in
  `guidelines/components/`. It is **not** `@pliant/ui` — see `components/README.md`.

## Still missing

Screen **renders** (PNG captures of real screens) are not here. `MIGRATION.md` lists `ui-kits/*` as
needing "screen renders + READMEs"; this import delivers the recreations and the READMEs, not
captures of the live product. The 62 reference screenshots the kits were built from live in the
Claude Design project's `uploads/` folder.
