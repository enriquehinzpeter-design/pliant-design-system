# WizardDialog / SelectableOptionRow

```jsx
<WizardDialog title="Card type" prompt="Choose the card type" continueDisabled={!pick}
  steps={[{ label: 'Card type', helper: 'Select a card type to see the next steps.' }]}
  onCancel={close} onContinue={next}>
  <SelectableOptionRow label="Pliant Virtual Virtual" selected={pick === 'virtual'}
    onSelect={() => setPick('virtual')} leading={<CardIcon colourway="gray" scheme="visa" height={36} />} />
</WizardDialog>
```

Use for a **short branching task inside the current page** (request a card). A long linear
workflow still gets its own page with a `Stepper`. The rail lists the steps even when only one
is known; the active step gets the indicator and the helper line. Continue stays disabled until
the step is answered.
