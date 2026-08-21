The ACCOUNT GROUPS cell in the internal app's cross-organisation lists (INT-01, INT-05, INT-24).

```jsx
<ChipGroup items={['POy', 'BC']} />                 // "POy, BC"
<ChipGroup items={['POy', 'VG', 'BC']} max={2} />   // "POy, VG"  +1
```

- **One chip, not one per value.** The values are joined with ", " inside a single grey pill — the captures show the comma *inside* the pill, which separate chips could never contain. `max` governs how many values go in the chip before the rest overflow.
- The **"+N" token is dark and solid** while the chip is tinted: it reads as a control that reveals the rest, not as another group.
- Keep `max` at 2 for the ACCOUNT GROUPS column, which is where it was observed.
- If your data is already a joined string (`'POy, BC'`), it is one value — pass `items={['POy, BC']}` or use a plain chip.
