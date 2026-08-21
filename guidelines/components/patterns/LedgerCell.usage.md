Cells for bank-ledger tables — Processing Account (INT-21) and Settlement Accounts (INT-07).

```jsx
<LedgerCell primary="2026-07-16" secondary="2026-07-16" mono />          // posting / value date
<LedgerCell primary="20260715-EANS-OSP PXVIPSB7" secondary="SCT_DEBIT" />
<LedgerCell primary="Pliant Oy" secondary="DK1289000000702400" />
<SignedAmount>-$215,132.62</SignedAmount>
<PaymentTypeCell type="OSP" id="PXVIPSB7" onOpen={…} />
<LedgerLink>ZM7N2PWO</LedgerLink>                                        // statement id
```

- **Signed amounts are plain ink.** The captures tint neither debits nor credits — the sign does the work. Do not colour them.
- Ledger id links are **underlined plain ink**, not the accent link colour, so a dense table does not turn blue.
- `PaymentTypeCell` renders "-" for a missing id rather than an empty link (the PP top-up rows in INT-21).
- These pair with two-line column headers; use `LedgerCell` for the cells so both lines share the header's grid.
