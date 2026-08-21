# 06 — Internal app (ops back-office) — DARK navigation

Load this for internal/ops features. Composes with the external app via Customer View.

- Shell: dark rail `#111111` (selected `#2e2e2e`, white text), left indicator, SANDBOX environment pill, compact top bar (notifications + account only).
- Cross-org nav: Partners & Programs (Partners/Programs/Card Products/Card Variants) · All Organizations (Customers/Non-customers/Groups) · All Members · All Transactions · All Merchants (All/Fraudulent/White-listed) · Settlements (Program Settlements Visa|Mastercard, Settlement Accounts, Settlement Files) · Repayments (Customer, DD Collection, Receivable) · Payouts (Customer, Cashback, Compensation) · Compliance (Repayment Accounts Approval, Coastal Report Templates) · Update Terms or Policies.
- **Customer View**: opening one organization renders a blue banner ("Customer View" + "Back to Organization Overview") over the ENTIRE external app (light nav — reuse 05) plus an `INTERNAL` nav group: Credit & Compliance (Credit|Compliance segmented toggle; Profile/Q&A/Assessment tabs; editable value chips; Export), Organization Settlements (HeaderStat cumulative amount), Processing Account (ledger table), Terms (ToggleCard stacks).
- Ops patterns: batch tables with counted StatusBadges ("PAID (10)"), approval RowActions, account selects with IBAN subtext, file-download lists, cross-org tables with flags + account-group "+N" chips.
- Screens: `ui-kits/internal-app/`.
