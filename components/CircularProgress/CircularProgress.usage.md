Loading indicators. `LoaderWithOverlay` is the Pliant house pattern: a 50%-white scrim with a centred spinner, pinned to a positioned container so the panel underneath stays readable.

```jsx
<div style={{ position: 'relative' }}>
  <TransactionTable />
  <LoaderWithOverlay loading={isFetching} />
</div>
<LinearProgress value={64} />
```

Never use a full-page blocking spinner for a table refresh — overlay the panel.
