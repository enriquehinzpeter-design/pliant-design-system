# 09 — Sync workflow (how this repo stays current)

Upstream truths: `infinnity-frontend` (tokens, component code, behavior) and the two canonical Figma libraries (cards, flags). This repo is the distribution layer.

1. **Design-system release in code** → run `/design-sync` from Claude Code in this repo to pull the updated design system → PR → design-team review → merge.
2. **Merge** → consumers update: Claude Design re-syncs from this repo; the plugin auto-updates for Claude Code/Cowork users; Cursor and harnesses read the repo directly.
3. **New assets/decisions** → edit the relevant `docs/` file + `08-decisions-log.md` in the same PR.
4. Rollback = git revert. Ownership: design team (CODEOWNERS to be added).

Wiring consumers: specification & development harnesses reference `CLAUDE.md` at repo root as "where to look up anything design" — never a deeper path.
