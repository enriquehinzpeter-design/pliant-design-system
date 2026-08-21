The Pliant app's navigation rail. **Nav mode is app-scoped, not a default-vs-alternate preference:**

| `mode` | App | Rail |
|---|---|---|
| `"light"` | **External app** (customer-facing admin) — the default for PM prototypes | warm `#f5f5f0`, near-black labels, `#e4e4de` selected fill plus the 3×28px near-black indicator bar |
| `"dark"` | **Internal app** (Pliant ops), themed by `internalTheme` / `PLIANT_INTERNAL_APP` | `#111111`, white labels, `#2e2e2e` selected fill |

In code, `createPartnerTheme` defaults `navigationMode` to `'light'`; only the `PLIANT_INTERNAL_APP` theme id switches it to `'dark'`. Unless you are prototyping Pliant's own ops tooling, use `mode="light"`.

```jsx
<Sidebar mode="light" orgName="Aetna" collapsible activeItem="all-transactions" onSelect={go}
  logo={<img src="assets/logo-icon.svg" height={20} />}
  items={[
    { label: 'Dashboard', value: 'dashboard', icon: <Icon name="SquaresFour" /> },
    { label: 'Cards', value: 'cards-group', icon: <Icon name="VerticalCards" />, children: [
      { label: 'Cards', value: 'cards' },
      { label: 'Card Requests', value: 'card-requests', badge: 25 },
    ] },
  ]} />
```

### Metrics (verified against `src/components/Sidebar/style.tsx` and `Tab.tsx`)

| | Value |
|---|---|
| Rail width | **264px** (`drawerWidth`); collapsed rail **24px** |
| Collapse control | bordered circular 28px `IconButton`, `top: 29px`, `right: -14px`, Phosphor **CaretLeft / CaretRight** |
| Nav item | padding **6px 16px**, margin-bottom **8px**, border-radius **8px**, icon container **minWidth 36**, text = `--menu-item-dense-*` |
| Active item | navigation selected background + **3×28px** indicator bar, radius 2, at **left: 4px** |
| Sub-item | padding **2px 16px**, margin-bottom **4px**, no icon, label indented **36px** |
| Group chevron | Phosphor **CaretDown / CaretUp**, small, inline at the row end |

### Group click behaviour (`Tab.tsx` → `TabWithChildren`) — not optional

Clicking a group row **navigates to its first available child route** and expands the group. While
expanded the group row is **disabled** (no hover, no pointer). A group row **never renders the active
state** — selection appears only on the sub-item. Any screen or template that builds nav from grouped
items inherits this; do not re-implement group rows as pure accordions.

- Count badges are the lime pill (`#e7ff53`, black digit) — used on sub-items like Card Requests and Flagged Transactions.
- Org avatar + name sit at the top; the brand mark sits at the bottom in `currentColor` (near-black on the light rail, white on the dark one).
