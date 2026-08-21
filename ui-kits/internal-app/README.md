# Internal app (Pliant ops) — UI kit

The second app in the design system. It **reuses every component, pattern and token** from the design system and the external kit: nothing about the design language is forked. Only two things are specific to it — the **dark ops shell** and the internal-only screens.

Reference: `INT-01` … `INT-27`, real staging with demo data.

**Internal-app coverage: COMPLETE.** Every captured screen, tab, dialog and popover is wired. `INT-06` … `INT-17` (the Settlements / Repayments / Payouts / Compliance group sub-pages) are in hand and wired as routes with their real titles and breadcrumbs, and are the one remaining build — tranche 2, deferred by agreement, not a gap in the reference material.

## Architecture

```
InternalAppShell (dark rail)          cross-organisation ops pages
   └── open an organisation  ──►  CustomerView
                                    ├── CustomerViewBanner (blue, full width)
                                    └── the ENTIRE external app, unchanged
                                        ├── a greyed "Onboarding" item above Dashboard
                                        └── an "INTERNAL" nav section at the rail's end:
                                            Credit & Compliance · Organization Settlements
                                            Processing Account · Terms
```

Route map behind the INTERNAL section: `/credit-and-compliance/credit|compliance` (tabs Profile / Q&A / Assessment), `/settlements`, `/processing-account`, `/terms/general`.

The Customer View top bar is **narrower than the external app's**: receipt inbox, notifications and account only — Copilot and the info icon drop, because the ops user is looking at someone else's workspace rather than working in their own.

Customer View is not a rebuild. `ui_kits/internal_app/index.html` loads the external kit's own screen files (`../web_app/*.jsx`) and renders them through `CustomerViewContext`, which supplies the banner, the extra nav section and the org name. The external `AppShell` reads that context; **no external screen was changed** apart from the dashboard, which shows the coverage block only when the context is present.

## Files

| File | What it holds |
| --- | --- |
| `InternalAppShell.jsx` | Dark `Sidebar mode="dark"`, the internal nav tree, the SANDBOX environment pill, the compact top bar |
| `Screens.jsx` | Organizations (Customers / Non-customers), Members, Transactions, Partners & Programs |
| `CustomerView.jsx` | `CustomerViewBanner`, the INTERNAL nav section, and the wrapper that renders the external app |
| `OrgDetailScreens.jsx` | The four Customer View INTERNAL screens |
| `InternalOverlays.jsx` | Add Card Variant wizard, Add-organization dialog, account popover |
| `data.jsx` | Demo records transcribed from the captures |

## What differs from the external shell — and only this

- **Rail tone**: `mode="dark"` (near-black ground, light text, active = lighter fill + left indicator). Every metric — 264px, 24px rail, item padding, indicator bar, group-navigates-to-first-child — is the same `Sidebar`.
- **No org header** in the rail: the internal rail starts at its first nav item.
- **SANDBOX environment pill** above the mark, bottom-left. Staging is the only environment captured, so no other tone is defined. The pill and the mark share the rail's `logo` slot; the mark is inlined as SVG so it inherits the rail's light ink through `currentColor`.
- **Compact top bar**: notifications + account only. No Copilot, receipt inbox, info icon, or page-level invite / request-card actions.
- Page header, breadcrumb rule, toolbar, tabs, tables, row heights, chips and badges are all the shared components.

## New shared patterns extracted here

These live in `components/patterns/`, not in this kit — both apps can use them.

- **`StateBadge`** — two families: solid for organisation lifecycle (ACTIVE / ONBOARDING / DRAFT), tinted for batch state (SETTLED / PAID / FAILED / WAITING / AUTHORIZED), with an optional `count` for "PAID (2)".
- **`ChipGroup`** — account-group chips with a dark "+N" overflow token.
- **`TwoLineCell`** — primary over a quieter second line: program name + code, bank + IBAN.
- **`RoleTag`** — the typographic OWNER tag after a member name.
- **`SummaryCoverage` / `SummaryCoverageNote`** and `SummaryPanel`'s `note` prop — the coverage bar, "Coverage N%", the "expected to last N days" sentence and the editable expected-spend line that the org-detail Financial Overview adds (INT-04).
- **`SegmentedToggle`** — the Credit / Compliance pill pair (INT-18). Switches the *subject* of the page, so it sits above the tab row, not instead of it.
- **`InlineEditableValueChip`** / **`MetaValueRow`** — a settled value in a bordered box with a trailing pencil, and the quiet label/value line beneath (INT-18).
- **`HeaderStat`** / **`HeaderMeta`** — a large figure in the page header's action slot (INT-20 "Cumulative Amount"), and "Activated at: …" plus a trailing Export (INT-18).
- **`ToggleCard`** / **`ToggleCardStack`** — the outlined one-row-per-module switch list (INT-22), deliberately not the external app's illustrated module cards.
- **`LedgerCell`**, **`PaymentTypeCell`**, **`LedgerLink`**, **`SignedAmount`** — bank-ledger table cells (INT-21, INT-07).
- **`Sidebar`** gained a per-item `disabled` flag for the greyed Onboarding row.
- **`FilterButton` / `FilterPills`** — the ACTIVE filter state (INT-24), wired into the shared `Toolbar` so **both apps** get it: the Filter control becomes a solid dark button carrying the count, and dismissible value pills appear on their own row beneath.
- **`FieldWithAction` / `InlineEscapeLink`** — a field with an adjacent action button ("Fetch") and the quiet "Organisation not listed? Add manually" escape link (INT-26).
- **`CardThumb`** now passes `singleUse` / `shield` / `type` through to `CardIcon`, so the 1× mark shows on single-use card products.

## Screens

| Screen | Reference | Notes |
| --- | --- | --- |
| Organizations — Customers | INT-01 | Country flag, currency chip, account-group chips with +N, solid status badges, right-aligned figures, row chevron opens Customer View |
| Organizations — Non-customers | INT-17 | Organisation + country only, "Add NCO" action |
| Organizations — Groups | — | Not captured |
| Members | INT-02 | OWNER role tag inline after the name, sortable Status |
| Transactions | INT-03 | Global list: country flag column, per-row decline mark, 72px rows (card thumbnails) — now the standard full-page row height |
| Partners & Programs — Programs | INT-05 | Two-line PROGRAM / NAME header and cells, scope values Fully Embedded / Whitelabel / Logo Card, +N chips, solid status |
| Customer View | INT-04 | The whole external app under the banner, plus the greyed Onboarding item and the four INTERNAL destinations |
| Credit & Compliance — Profile | INT-18 | Header meta + Export, Credit/Compliance toggle, two editable value chips over a meta line, tabs, Summary + Customer summary sections |
| Credit & Compliance — Assessment | INT-19 | Same anatomy, Summary + UW case |
| Credit & Compliance — Q&A | — | Not captured |
| Organization Settlements | INT-20 | Cumulative-amount header stat, EANSS service chip, SETTLED / RESOLVE badges |
| Processing Account | INT-21 | Two-line ledger cells, signed amounts, running balance, payment type + id, statement-id links, account select with IBAN subtext |
| Terms → General | INT-22 | Breadcrumb Terms + title General, Internal Modules toggle-card stack |
| Partners & Programs — Card Products | INT-23 | Vector `CardIcon` thumbnails (1× mark on single-use), partner + program grey chips, variants count, type, ACTIVE badge, "View inactive" switch |
| Partners & Programs — Card Variants | INT-24 | Active-filter toolbar ("Filter (1)" + dismissible "DRAFT +2" pill), card-product chip with thumbnail and +N, SVG country flags, processor id |
| Add Card Variant | INT-25 | The existing `WizardDialog` — step rail Basic Info / Attributes / Summary, name field with character helper, four selects |
| Add new customer organization | INT-26 | The existing `FormDialog` — search-selects with info icons, HubSpot ID + Fetch, "Add manually" escape link, onboarding switch, confirm disabled until valid |
| Account popover | INT-27 | Signed-in email header line + Sign Out, elevation 8, anchored under the account icon |

## Ambiguities — flagged, not invented

- **Nav icons.** Only three are certain because they match the external map: All Members `Users`, All Transactions `ListBullets`, and the two directional group glyphs (Repayments `DownloadSimple`, Payouts `UploadSimple`). **Unconfirmed**, taken as nearest match from the rail at capture resolution: Partners & Programs `Handshake`, All Organizations `Buildings`, All Merchants `CreditCard` (the external app uses `Storefront` for its own Merchants — the internal glyph is a card shape, not a shopfront), Settlements `Sliders`, Compliance `ArrowsClockwise`, Update Terms or Policies `Export`. An internal equivalent of `useOrgTabs.tsx` would close all six in one pass.
- **Decline mark on transactions.** INT-03 shows an outlined square-with-x on every row; rendered as `XSquare` in error tone. Whether it is a state or an always-present action is not resolvable from one capture.
- **Currency "…" affordance.** INT-01 shows an ellipsis after the currency chip on some rows and not others; read as "this org holds more than one currency". Unverified.
- **Customer View org identity.** The rail shows a "1" avatar and the truncated org name; whether the avatar is an initial, an index or the org logo is not resolvable.
- **INTERNAL nav section** has only one captured destination (Credit & Compliance). Rendered as a placeholder — its own screen has not been captured.
- **Groups tab, Partners / Card Products / Card Variants tabs**: no reference screenshot; honest empty states rather than invented tables.
- **Tranche 3 specifics.**
  - The four INTERNAL nav icons are **unconfirmed** — the section is scrolled or cropped in every capture, so only Credit & Compliance's glyph is partly visible. Taken as nearest match: Credit & Compliance `ChartLineUp`, Organization Settlements `Sliders`, Processing Account `Bank`, Terms `FileText`. Same for the greyed **Onboarding** item, rendered `RocketLaunch`.
  - **`RESOLVE`** (INT-20) is warning-tinted and reads as an *action* the ops user must take, unlike the other states which report a fact. Added to `STATE_BADGE_TONES` as a tinted warning; whether it is clickable is not resolvable from the capture.
  - The **EANSS service chip** is warning-tinted rather than neutral, so it is its own `ServiceChip` treatment in the kit and not `ChipGroup`. Whether every service value shares that tone is unknown — EANSS is the only one captured.
  - **Greyed values** in the Credit & Compliance sections are read as *derived* (the \$3,000,000 organisation limit follows from the assessment) rather than disabled. `FieldRow`'s `derived` flag encodes that reading; worth confirming.
  - **"Custom Cardholder Names"** is greyed in INT-22 — read as disabled for this organisation rather than merely off, so both its label and switch are disabled.
  - Both captures of Credit & Compliance show **Compliance** selected in the toggle, so the Credit subject's content is unseen; the toggle switches state but the sections do not change yet.
  - The Q&A tab, the Terms sub-pages beyond General, and whatever sits below Accounting Features in the module list are **not captured**.
- **Tranche 4 specifics.**
  - **The filter count counts GROUPS, not values.** INT-24 shows "Filter (1)" beside a single pill reading "DRAFT +2" — one group holding three values. Whether a second applied group would add a second pill or extend the first is inferred (one pill per group), since only one is captured.
  - **Card-product colourways are read from the thumbnails**, which are 26×40 at capture resolution: the premium rows read as metal, the "Physical Blue" rows as the black physical face, the virtual rows as cream. Plausible but not certain — a product-to-colourway map from code would settle it.
  - **"View inactive" is label-right** (switch first), unlike the settings rows. It sits in the toolbar, not a settings list, so it follows the toolbar's reading order; worth confirming against the code.
  - The **Add Card Variant** wizard was captured on step 1 only; Attributes and Summary are unseen, so the rail advances but the panes are not built.
  - **Add new customer organization** extends below the fold: "Transaction Link Record ID" is the last visible field and there are more beneath. Built to the fold, with the confirm button disabled as captured.
  - The account popover's email is **truncated in the capture** (`…@infinnity.c…`), so the full address is unknown and rendered as captured.
  - **Still not captured — flagged, not invented:** the Add Card Product, Add Payment Program, Add Partner, Block Merchant and Add NCO dialogs; the Block / Authorize confirmation dialogs; the Groups tab; Coastal Report Templates; the Update Terms or Policies page; and the notifications popover in its populated state.
