# UI kit — Pliant admin web app (External app)

Recreation of the Pliant **External app** — the customer-facing admin (dev environment, demo org "Aetna") — built against 35 reference screenshots of the live product. Where a screenshot contradicted the codebase extraction, the screenshot won.

**External-app coverage is COMPLETE**: every nav destination, sub-tab, dialog, drawer, popover and overlay that was captured is recreated. What is still missing is listed under "Known gaps" — nothing in that list is invented.

The **Internal app** (Pliant ops) shares this system but runs the dark nav rail via `internalTheme` / `PLIANT_INTERNAL_APP`. No internal-app screens exist here: there are no reference screenshots for them yet, so none are invented.

## Nav tree

Dashboard · Wallet · **Members & Teams** (Members, Teams) · Accounts · **Cards** (Cards, Card Requests · 25) · **Transactions** (My Transactions, All Transactions, Needs Review, Flagged Transactions · 1) · **Accounting Export** (Not exported, Export queue, Exported) · **Billing** (Payments, Statements) · Rewards · Merchants · **Settings** (Organization, Accounting, Card Templates, Policies, Modules, Integrations)

## Screens

| File | Surface | Ref |
|---|---|---|
| `AppShell.jsx` | Light rail, top icon bar, breadcrumb + 32px title, actions, toolbar, underline tabs | all |
| `Bits.jsx` | Card thumbs, category icons, merchant cell, status-above-amount, pills, limit meter, sort headers, empty states | all |
| `Patterns.jsx` | Wallet/account/team/module/integration/data-field cards, ghost tile, circled actions, two-line headers, stat tiles, currency select, condition + amount + role + initial chips, approver chains, avatar stacks, letter avatars, country cells | 08–19 |
| `Overlays.jsx` | The interaction layer: Invite-member dialog, Request-card wizard step 1, transactions Filter drawer, card detail drawer, member detail drawer, Create-team dialog, Accounts kebab menu, Top-up dialog, notifications popover, Receipt Inbox workspace modal — each a thin composition over `components/patterns/` | A2–A5, A7, B1–B4, D1, D2 |
| `data.jsx` | Demo data transcribed from the screenshots | — |
| `DashboardScreen.jsx` | Financial Overview, # Members, # Cards, Top Spenders, Last Transactions, regulatory footer; header actions open the invite dialog and the request-card wizard | 01, A1, A2, A3 |
| `TransactionsScreen.jsx` | My / All / Needs Review / Flagged (+ FLAG REASON column), 524px record drawer, Filter drawer | 02, 03, 04, 20, A4, A5, A6 |
| `CardsScreen.jsx` | Card inventory, status pills, limit meters, sortable Status, card detail drawer (columns collapse while it is open) | 05, A7 |
| `CardRequestsScreen.jsx` | Pending requests / Archive (APPROVED badges + REQUEST STATUS column), age subtext, approver chips | 19, C9 |
| `MembersScreen.jsx` | INVITED pills, team pills, card thumbnails, member detail drawer | 06, B1 |
| `TeamsScreen.jsx` | Team cards, Managers/Members avatar stacks, Deactivated-teams switch, Create-team dialog | 18, B2 |
| `WalletScreen.jsx` | Card grid with usage meters and the ghost Request-card tile | 08 |
| `AccountsScreen.jsx` | Account cards, balance, circled actions, kebab menu (Rename) | 09, B3 |
| `AccountingExportScreen.jsx` | Two-line headers, bulk checkbox, Configure columns | 10 |
| `PaymentsScreen.jsx` | Withdraw / Top up account, "No data available yet.", Top-up copy-rows dialog | 11, B4 |
| `RewardsScreen.jsx` | Cashback progress + START EARNING, currency select, stat tiles, footnote; Card Benefits comparison table | 12, C6 |
| `MerchantsScreen.jsx` | Letter avatars, country flag + ISO, volume sort | 13 |
| `SettingsScreen.jsx` | Organization → General, Bank Accounts (empty), Plan (stat columns, add-ons, FX fees); Accounting → General + G/L Accounts list; Card Templates numbered rows | 07, 14, C1–C4 |
| `StatementsScreen.jsx` | Billing → Statements: account select, statement rows with balances and Download | C8 |
| `ErrorScreen.jsx` | The 404 page — no nav rail; reachable as screen `error-404` | C7 |
| `PoliciesScreen.jsx` | Approval-rule table: condition chips, amount thresholds, approver escalation chains, eye toggles; Receipt Policy tab (summary bar, auto-reimbursement, exemption cards) | 15, C5 |
| `ModulesScreen.jsx` | Feature-module cards with mini-UI previews + ACTIVE badges | 16 |
| `IntegrationsScreen.jsx` | Integration marketplace cards with capability chips | 17 |

## Overlay geometry

Measured from the reference screenshots (1530px viewport, 1:1):

| Overlay | Width | Scrim |
|---|---|---|
| Record drawer (transaction A6, card A7, member B1) | 524px | **no** |
| Filter drawer (A4, A5) | 283px | yes |
| Form dialog (A2, B2) | 392px | yes |
| Copy-rows dialog (B4) | 530px | yes |
| Wizard dialog (A3) | 734px, 202px rail | yes |
| Workspace modal (Receipt Inbox, D2) | inset 28px / 84px | yes |
| Notifications popover (D1) | 334px, elevation 8 | no |
| Single-item kebab menu (B3) | ~107px, content width | no |

The record drawer is the only one without a scrim: the row it describes stays visible and the table
collapses its middle columns instead.

## Empty-state copy

Observed variants, used verbatim: **"No transactions available yet."** (transaction lists, accounting export), **"No data available yet."** (Payments), **"No transactions to review."** (Needs Review), **"No Bank accounts connected"** (Organization → Bank Accounts), **"No notifications so far"** (bell popover), **"No unmatched receipts."** (Receipt Inbox).

## Card art

Cards render as **parametric vector components at every colourway**, the physical black and metal faces included. **Never upscale a card asset and never use a PNG slice.**

- `CardIcon` — the `icon` size class (26×40 native), rendered ~30px tall in table cells and list rows.
- `CardRender` — the `tile` (200×316) and `art` (320×506) classes, for wallet grids, card detail and onboarding, with `label` / `maskedNumber` / `expiry` text slots.

Every colourway is drawn from tokens, so all of them are crisp at any size and a new one costs one palette entry. Colourways: `cream` (default; `gray`/`grey` alias to it), `lime`, `coral`, `orange`, `sage`, `taupe`, plus the physical `black` and `metal` — vector as well, per Card Library node `4935:3695`, and the only two that carry the contact chip. Metal's brushed texture ships as a separate JPEG and has not been supplied, so it renders as its flat tone pair. Schemes: `none`, `visa`, `mastercard`, `mastercard-commercial`.

The system default is **in-app icon · gray · unbranded · no label · no badge**, but these screens are recreations: each passes the colourway its reference screenshot shows, with `window.ORG_SCHEME = 'visa'` for the Aetna demo org. Match the screenshot, not the default.

## Authoring rule for kit files

Every `.jsx` in this folder is **also** evaluated inside `_ds_bundle.js` by the compiler, at a point where `window.PliantDesignSystem_8f7377` exists but is not yet populated. So these files must be **side-effect-free at module scope** — never create a React element outside a function body. Element-bearing constants are built lazily instead (`getNav()` in `AppShell.jsx`, `getPreviews()` in `ModulesScreen.jsx`). Breaking this rule produces `React.createElement: type is invalid … got: undefined` console errors on every load that never show up in the rendered output, because the browser re-evaluates the same files correctly afterwards.

## Design-team review corrections (Aug 2026)

Applied at component / token / doc level so future screens inherit them:

- **Sidebar rebuilt to the code metrics** — 264px rail, 24px collapsed rail, item padding 6px 16px / margin-bottom 8px / radius 8px / icon slot 36px / `menu-item-dense` text, active indicator 3×28px radius 2 at left 4px, sub-items 2px 16px with the label indented 36px, Phosphor CaretDown/CaretUp group chevron, bordered circular collapse control at top 29px / right −14px with CaretLeft/CaretRight.
- **Group rows now navigate**: clicking a group opens its first available child route, disables the group row while expanded, and never paints the group as active — selection lives on the sub-item (`Tab.tsx` / `TabWithChildren`).
- **Row-height scale** on `Table` (`density`): **72/56 default** — the Members table is the reference row height, and every full-page list in both the admin and internal apps now matches it. 32/36 `dense` is for dialogs, drawers and dashboard summaries only; `media` is now an alias of default, kept for card-thumbnail / avatar-stack rows.
- **PageHeader**: `title` is required (it warns when missing) and the breadcrumb is now derived from the nav tree when a screen sits under a group, so no sub-page can ship without both lines.
- **Content width**: `--content-max-width: 840px` applied via `AppShell contentWidth="capped"` to Organization / Accounting / Policies / Plan / Rewards-cashback; per-screen `maxWidth: 840` literals removed. **Observed, pending engineering confirmation** — there is no such constant in the external-app source.
- **Wallet tiles open the card detail drawer** (A7 `CardDetailDrawer`), matching `WalletCardTile` → `CardDetailsPage` in code. The tile only carries name / last4 / colourway / state, so the drawer's account chip reads **"Main account (GBP)"** — the org's account name from C8. Confirm the account each wallet tile actually resolves to.
- **Icon audit — closed against `useOrgTabs.tsx`.** The nav map is now taken from code, not inference: Dashboard `SquaresFour`, Wallet `Wallet`, Members & Teams `Users`, Accounts `Bank`, Cards `VerticalCards`, Transactions `ListBullets`, Accounting Export `BookOpen`, **Billing `Files`**, Rewards `Star`, Merchants `Storefront`. Also corrected: top-bar `Sparkle` → custom `Copilot`; Invite-member `UserPlus` → `User`; group chevrons → CaretDown/CaretUp. The **Request card** button keeps `VerticalCards` — confirmed as `WalletPageTitleActions` `startIcon`, not a request-badged variant. Both previously flagged items are now closed; the full map lives in `readme.md` under Iconography.
  - Remaining inference: **Settings = `Gear`**, outside the verified grep range. Nothing in the Phosphor list contradicts it, so it ships — worth a one-line confirmation.
  - Unrelated to the nav map: `StatementRow`'s leading document glyph stays `FileText` (statement rows, not a nav destination).

## Known gaps and judgement calls

- **REQUESTED pill tint is inconsistent across surfaces in the product itself:** red/pink in the Wallet grid (08), neutral grey in the Cards table (05). Both are reproduced as observed via `StatePill tone="requested"` vs `tone="requested-neutral"`. Confirm which is intended.
- **ACTIVE badge has two forms:** a light teal tint in the Wallet grid (08) and a solid dark-teal badge on module / data-field cards (14, 16). Both reproduced (`StatePill tone="active"` vs `SolidBadge`).
- **Module preview headers** (16) are miniature renders of each module's own UI. They are rebuilt from this system's primitives at reduced scale rather than traced as images — close in structure, not pixel-identical.
- **Third-party integration logos** (17): only Bezala and Candis ship as assets in the import. Agicap, BAS Fadiro, bookman and BuchhaltungsButler render a neutral initial tile — their real marks are not approximated. Send the logo files to complete the marketplace.
- **Account-avatar menu** (top-right user icon): did not open on click during capture, so it is **not captured** and not invented — the icon is inert in the kit.
- **Accounting → VAT Rates / Cost Centers & Units / Accounts** have no screenshot. They render the **same `CategoryList` shape as G/L Accounts**, which is an **inference** — confirm before treating them as reference.
- **Accounting Export → Export queue / Exported** are still not captured; they keep the honest "Not captured" state.
- **Matched / Trash tabs** of the Receipt Inbox and the **SWIFT transfers** tab of the top-up dialog are not captured; selecting them says so rather than showing invented rows.
- **Card Templates shows 7 of 15 rows** — the screenshot's visible window; the count reads "15 results" as observed.
- **Status-badge placement varies between record drawers:** the card drawer (A7) sets it INLINE with the title, the member drawer (B1) puts it on a SECOND LINE below the title. Both ship via `RecordTitle badgePlacement`. Confirm which is intended, or what distinguishes the two.
- **Switch placement is contextual, and now documented as such:** dialogs put the switch LEFT of its label (B2, "Transaction review" with a trailing info icon); settings pages put the label left and the switch flush right. Previously the system documented only `labelPlacement="start"`.
- **B4's warning line is not bold in the screenshot** — the only bold run in that dialog is "your company bank account" inside the first bullet. Reproduced as observed (regular weight); confirm if the warning is meant to be emphasised.
- **SWIFT transfers tab** (B4) is not captured; selecting it renders a not-captured line rather than invented bank data.
- **Single-item menus hug their content** (~107px in B3) instead of the 200px `Menu` minimum — `minWidth={0}` is now available for that case.
- **PENDING / DECLINED label colours** are approximated with `--info-main` / `--error-main`; they read slightly desaturated in the screenshots. Open pending dedicated status tokens. **New evidence (A4):** the same coloured uppercase labels are reused as the Filter drawer's checkbox labels — PENDING blue, DECLINED red, REVERSED grey, BOOKED near-black, PURCHASE near-black, REFUND and CHARGEBACK teal, RECHARGE red, CASH WITHDRAWAL and CARD CHECK near-black. Reuse across a table cell and a form control means this is a **token set**, not per-table styling; it now ships as `StatusToken` / `STATUS_TOKENS`. Still open: the exact palette slots (the tones may be dedicated status colours rather than the semantic mains).
- **Resolved:** the single-use "1×" and shield glyphs now come from the Figma vector bundle and are drawn by `CardIcon`/`CardRender` (`singleUse`, `shield`). The former `cards/icons/` PNG export, named by colourway and scheme only, is deleted. Historically the card-type rows used the plain colourway icon; send the badged variants to complete them.
- **Blocked-card overlay** (A7): the dark circle with the prohibit glyph over a pending card's render is drawn here, because no such asset exists in the Card Library export. Confirm it is an app overlay rather than artwork.
- **Card history** (A7) is an accordion whose contents sit below the screenshot fold — rendered collapsed, contents marked not captured.
- **Request card** (A3) shows only step 1; the rail lists one step because the product lists one until a type is chosen. Later steps are not invented.
- **Category→icon map**: Travel and Computing use the repo's custom SVGs; Advertising & Marketing uses Phosphor `PaperPlaneTilt` (**not** in `imported-phosphor-icons.txt`) and Services uses `FirstAid` as the nearest listed match. Open.
- **Resolved (was ambiguity #4, revised Aug 2026):** card art no longer uses sliced PNGs at all. Every colourway is **drawn parametrically as vector** from hexes sampled off the Card Library icon sheet (`figma.com/design/p2bdSeFycWMli0K1wUdnnG`, node `5461-73221`) — `cream #f5f5f0`, `lime #e6ff52`, `coral #ff727e`, `orange #ffa070`, `sage #a5c3c3`, `taupe #e4d7cf` — with the Visa wordmark and Mastercard circle marks traced from the Figma vector bundle. Only `black` and `metal` remain raster, per size class at 2×. This removes the pixelation at every size and makes a new colourway free.
  - **Large-face layout is now matched to the Card Library flat renders** (wordmark or label top-left, card type top-right, cardholder beneath, masked number, labelled EXP/CVV, scheme mark plus "Platinum Business" bottom-right), read off `assets/cards/*-standard.png` and `*-label-single-use.png`. The lighter stepped panel is approximated with a rounded overlay; the flat virtual faces carry **no chip** — the chip belongs to the photographic physical cards.
  - **The "fully vector" physical-card claim — resolved.** `physical-card-vectors.txt` holds only overlay marks (the Visa wordmark at two sizes, the `1`/`×` strokes) with no card body or chip, which is why the first pass kept the raster. The claim was still right about the component: the body is a rounded rect and a tone pair, both now drawn parametrically, so black and metal are vector regardless of what the export contained.
  - **Financial Overview corrected against A1:** the Available and Accounts groups are now separated by a **vertical hairline**, and "Total cashback earned" is a single row with the figure right-aligned on the same line. Both rules live in the new `SummaryPanel` pattern (`SummaryFigures` / `SummaryFigure` / `SummaryTotalRow`) so future dashboard panels inherit them. Note A1 uses a **sentence-case grey** label here ("Available", "Accounts"), not an uppercase overline — `SummaryFigure` matches the screenshot; `StatColumn`'s overline belongs to settings sections.
  - **The physical cards are vector now too.** Card Library node `4935:3695` is a fully vector component and the detail-view art is node `4935:2813`, so `black` and `metal` were **wrong** to sit on the raster path — both now render from the same parametric component (tone pair, chip, masked wordmark, scheme mark, text slots), and the sliced PNGs under `assets/cards/` are no longer read by any screen. Card tones sampled from the detail-art render: black `#201c1c`/`#333333` with white ink, metal `#c6c6c6`/`#d9d9d9`.
  - **Front-face slots: the brief and the canonical art disagree, and the art won.** The Aug-2026 correction asked for the card type at bottom-left and the security code moved to the back face only. Probing `card-detail-art-preview.png` directly (ink density per zone on the lime+Visa faces) shows the opposite for the **standard** front: the type word is **top-right** and the bottom-left is empty (0.0% ink), and the front **does** carry a security code beside the Exp row (3.6%). The bottom-left placement is real but variant-specific — it appears on the label and 1× variants, where the badge takes the top-right corner. So the shipped rule is variant-conditional: type **top-right** on the plain front, **bottom-left** when a label or badge occupies that corner, **absent** on the physical faces where the chip owns it; and `cvv` renders on both faces. **Flagged for the design team** — likely they were comparing a label variant.
  - **Two-tone background traced, not approximated.** The panel boundary is the canonical detail-art path (`card-detail-art-vectors.txt` asset 02, the `Union` path, viewBox 200.002×186) rendered as an inline SVG with `preserveAspectRatio="none"` over the bottom **58.86%** of the face, so the S-curve is exact at every size. The previous rounded-rect approximation read as a square tab notch and is gone.
    - **One ambiguity in that path, resolved by the render.** As exported it rises on its **left** (top edge `y=0`, i.e. 41.1% of the face) and sits lower on its **right** (`y=42`, 54.4%), joined by two 16-radius inner curves at the midpoint. The canonical render in `card-detail-art-preview.png` shows the opposite handedness — higher on the right — and the export carries no transform of its own, so the path is **mirrored** (`scale(-1,1)`) to match the art. Worth confirming whether the Figma component applies that flip, or whether the export was taken from a mirrored instance.
  - **Front-face order** (unchanged and confirmed): label or wordmark top-left, cardholder beneath, masked number with the visible last four, then the Exp + security-code row, with the scheme mark and product line bottom-right.
  - **Physical cards print no type word.** In the detail-art matrix the black and metal faces carry only the wordmark and the chip in the top-right — no VIRTUAL/PHYSICAL label — so the type label is suppressed on physical faces (top-right and bottom-left alike); the flat colourways print it as before.
  - **Physical cards, resolved with the canonical sources.** The standard black physical card (node `4935:3695`) contains **no texture at all**, so it is pure vector — the earlier raster call was wrong. **Metal** alone carries a brushed finish, which now rides as a JPEG **fill layer inside the vector geometry** so edges, text and marks stay crisp at every size. The per-size card PNGs (`assets/cards/`, 140 files) have been **deleted**; the three Brand specimen cards that loaded them were rebuilt on the components.
  - **Still needed:** `assets/cards/metal-brushed.jpg`, the metal fill layer. The plumbing is in but **opt-in** (`texture` on `CardRender`) so nothing requests the missing file; until it lands metal renders its flat tone pair — correct geometry, missing finish. The engraved bird (detail-art asset 11) is the other metal raster and is also unsupplied.
  - **`CardRender` takes `face="front|back"`.** The back is the **card-details / reveal** face, composed from the mapped detail-art parts — cardholder (asset 01), company, the full number (10), expiry (15), security code and the lime "P" mark (**asset 09, traced verbatim** — the path is the rounded square with the P as negative space, so it is not a font glyph). `getpliant.com` closes the face; the product line ("Platinum Business" / "Infinite Business", assets 17 and kin) sits on the **front** under the scheme mark and is no longer duplicated here. **Pliant's art contains no magnetic stripe and no signature panel**, so neither is drawn; an earlier pass invented both and they have been removed.
  - **Outstanding raster:** the metal card's brushed texture and its engraved bird (detail-art assets, shipped as separate JPEGs) have not been supplied, so metal renders as its flat tone pair — correct geometry, missing finish. Send those two JPEGs and it can carry the real texture.
  - **Detail-art parts mapped** from `card-detail-art-vectors.txt` against the labelled render: 02 is the stepped panel shape, 09 the lime "P" badge, 18 the `pliant` wordmark, 06 "world elite business", 17 "Infinite Business", 08/19 the `mastercard` wordmark, 20 the mono Mastercard circle, 16 the orange Mastercard circle, 03/07/12 the large Visa wordmark, 01 the cardholder line, 10 the number fragment, 15 the expiry, 04/05 the contactless glyph, 11 the engraved bird. **No chip vector exists in the export** — the chip is a plain light rounded rect in the art, so it is drawn as one.
  - **Flag API matches production** (`src/components/CountryFlag`): keyed by ISO 3166-1 alpha-2 code in a **16px × 22px** slot, so a new country needs only its asset. **One conflict worth a decision:** production's `flag-icons` pattern is a 16×22 *rectangular* flag, but the Figma library's artwork is a *circle* at 16×16 — and these SVGs carry `preserveAspectRatio="none"`, so stretching one to 22 wide would distort it. The circle therefore renders at 16 and centres in a 22px slot: production's row metrics, Figma's artwork. If the intent is genuinely rectangular flags, that needs a different export.
  - **Flag library wired in.** `Flag` / `FlagLabel` (node `6436:37649`, where each flag is a named child symbol `Country=<ISO> <Name>`) replaced every emoji flag — Merchants country column (YE, HU, KZ, US), Rewards currency selector (GB), dashboard account rows (GB, US). **Closed Aug 2026:** the five countries the kit needed plus `EU` and `GENERIC` were supplied pre-labelled and wired in, so no screen renders a placeholder any more. An unknown code now falls back to the library's own `GENERIC` globe rather than an invented grey circle.
  - **Unmapped vectors in the bundle:** three badge glyphs I could not name confidently — assets 08/19 (`Trash` vs `Suitcase`), 07/20 (head-on vehicle; not Phosphor `Car`), and 14 (plane-like, but matches neither `AirplaneTilt` nor `PaperPlaneTilt`). They are **not** wired in; the category badge set still needs those three names from source.
  - Every thumbnail in Cards, Wallet, Members, Transactions and Card requests is `<CardIcon colourway=… scheme=… size="icon" />` — no drawn rects, no scaled-down renders, no sliced PNGs. The reference org (Aetna) runs Visa, so the kit passes `window.ORG_SCHEME = 'visa'`; scheme is per-organization and the components require it explicitly.
- **Resolved:** the bottom brand mark stays `currentColor` near-black on the light rail; the lime version belongs to the login page.
- **Still lacking screenshots**, rendered as an honest empty state and not invented: Export queue, Exported, and the Organization → Information Update / Receipts sub-tabs.
- The Intercom launcher visible bottom-right in the screenshots is third-party and omitted. "Most Popular Providers" (12) is present as a heading only — its content is below the screenshot fold.
