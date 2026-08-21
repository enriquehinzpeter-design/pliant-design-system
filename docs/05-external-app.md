# 05 — External app (customer-facing admin) — LIGHT navigation

Load this for customer-facing features. Do not load 06.

- Shell: light rail `#f5f5f0` (selected/hover `#e4e4de`, black text), org avatar+name header, collapse chevron, near-black mark bottom-left. Top bar: assistant, receipt inbox, help, notifications, account. Regulatory footer on dashboard.
- Nav tree: Dashboard · Wallet · Members & Teams (Members, Teams) · Accounts · Cards (Cards, Card Requests) · Transactions (My/All/Needs Review/Flagged) · Accounting Export (Not exported, Export queue, Exported) · Billing (Payments, Statements) · Rewards · Merchants · Settings (Organization, Accounting, Card Templates, Policies, Modules, Integrations). Count badges (lime) on sub-items.
- Screens: reference renders in `ui-kits/web-app/` — dashboard, wallet grid, all tables with drawers, settings pages (tabs + hairline label/value + pencil edits), policies (approval-rule table), modules, integrations, rewards, card requests, receipt inbox, dialogs.
- Conventions: currency per account; dates "17 Jun 2026" in tables; big page title always present; settings content capped at ≈960px (see `docs/01`).
