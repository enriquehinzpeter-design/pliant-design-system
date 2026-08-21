The dashboard summary panel (A1 Financial Overview) — figure row on top, hairline, total line beneath.

```jsx
<SummaryPanel title="Financial Overview" action={<Button variant="outlined" color="neutral" size="small">View all accounts</Button>}>
  <SummaryFigures>
    <SummaryFigure label="Available" value="0 GBP" />
    <SummaryFigure label="Accounts">
      <div style={{ display: 'flex', gap: 24, marginTop: 3 }}>
        <div><FlagLabel code="GB" label="GBP" /><SummarySubValue>0 GBP</SummarySubValue></div>
        <div><FlagLabel code="US" label="USD" /><SummarySubValue>0 USD</SummarySubValue></div>
      </div>
    </SummaryFigure>
  </SummaryFigures>
  <Divider />
  <SummaryTotalRow icon={<Icon name="HandCoins" size={22} />} label="Total cashback earned" value="0 GBP" />
</SummaryPanel>
```

Four rules this pattern exists to hold, all read off A1:

- **The title and its action share one row** — title left, outlined button right-aligned. `SummaryPanel` does this; never stack the button under the title.
- **Column groups are separated by a vertical hairline.** `SummaryFigures` draws it between children automatically — never lay the groups out with gap alone.
- **The total line is ONE row**: icon + label left, figure right-aligned on the same line. The figure must never stack above its label.
- **The vertical rhythm is tight.** The paddings here (14px title, 10/14px figures, 12px total row) match A1; do not loosen them — the panel is meant to be compact.

`SummaryFigure` uses a small **sentence-case grey** label. This is deliberately different from `StatColumn`, whose label is an uppercase overline — that one belongs to settings sections (C3 Plan), not dashboard panels. Secondary figures under a currency label use `SummarySubValue`, which is **primary ink, not light grey**. Currency rows pair `FlagLabel` with the code; flags are always SVG from the flag library, never emoji.

### Coverage block — Customer View only

Inside Customer View the org-detail Financial Overview adds three things the external dashboard does not have (INT-04): a **coverage progress bar** under the available figure, a **"Coverage N%"** note with an info icon inline beside that figure, and a right-aligned **editable "Exp. monthly spending"** line beneath the bar. The panel header also carries the sentence "Your remaining funds are expected to last for N days" beside the title, with the **Top up account** button at the row's end.

```jsx
<SummaryPanel title="Financial Overview" action={<Button size="small">Top up account</Button>}>
  <SummaryFigure label="Available" value={<>$9,756,137<SummaryCoverageNote icon={<Icon name="Info" size={14} />}>Coverage 98%</SummaryCoverageNote></>} />
  <SummaryCoverage percent={98} spendLabel="Exp. monthly spending" spendValue="$10,000,000"
    editIcon={<Icon name="PencilSimple" size={13} />} />
</SummaryPanel>
```

Keep the bar out of external-app screens until a screenshot shows it there — it has only been observed under Customer View.
