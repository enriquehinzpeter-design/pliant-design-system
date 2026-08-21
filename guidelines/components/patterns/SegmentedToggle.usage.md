A pill pair of mutually exclusive views, active segment solid dark with light text (INT-18, Credit / Compliance).

```jsx
<SegmentedToggle value={view} onChange={setView} options={['Credit', 'Compliance']} />
```

**Not interchangeable with `Tabs`.** Tabs switch content *within* one subject; this switches the **subject** the page is about, and sits above the tab row — on INT-18 both are present at once: the toggle picks Credit or Compliance, the underline tabs then pick Profile / Q&A / Assessment inside it.
