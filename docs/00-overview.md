# 00 — Overview (read first, always)

**Pliant** is a B2B fintech / corporate spend-management platform: company credit cards
(physical + virtual), expense workflows, approvals, receipts, accounting integrations, and
team/role administration. The design language is **MUI v5 restyled with Pliant's brand**:
near-black primary, lime accent, warm neutrals, Geist type, borders-over-shadows, 8px radius.

## The two apps (and how they compose)

1. **External app** (customer-facing admin, `app.*`): **light navigation**. What customers see.
   The default target for product prototypes. → `docs/05-external-app.md`
2. **Internal app** (Pliant ops back-office, `admin.*`): **dark navigation** shell with
   cross-organization lists (Organizations, Members, Transactions, Merchants, Partners,
   Settlements, Repayments, Payouts, Compliance). Drilling into one organization enters
   **Customer View**: a blue banner + the entire external app re-rendered with an extra
   `INTERNAL` nav section (Credit & Compliance, Organization Settlements, Processing Account,
   Terms). → `docs/06-internal-app.md`

Both apps share every token, component, and pattern. Only the shell (nav mode, top bar) and
the app-specific screens differ. **Partner white-labeling exists** (Barclays, CapitalBox,
Coastal, Novalife, Unzer) but is OUT OF SCOPE for this reference — never blend partner
colors, logos, or navigation styling in.

## Sources of truth

- **Tokens & component behavior:** `infinnity-frontend` codebase —
  `src/components/App/style/themeMui5/variables.ts` (tokens),
  `packages/ui/src/theme/createTheme.ts` + `overrides/` (restyling),
  `packages/ui/src/index.ts` (92 exported components), Storybook stories (usage).
- **Card artwork:** Figma 💳 Card Library (`p2bdSeFycWMli0K1wUdnnG`) — vectors. See `docs/02`.
- **Country flags:** Figma flag library (file `g1YQZdrVs2KJtFwfxgtTmD`, node `6436:37649`). See `docs/02`.
- **Deprecated:** the Figma file "Design System" (stale type, tokens, states). Do not extract from it.

## Reading order for a new agent

`00` (this file) → the app doc for your target (`05` or `06`) → `01` foundations →
whatever the routing table in `CLAUDE.md` says your task needs. Nothing else.
