# CopyRowsDialog / DialogTabs / CopyRow

```jsx
<CopyRowsDialog title="Top up your account" onDone={close}
  description={<>
    <p>You can top-up money using the instructions and bank data below:</p>
    <ul><li>…</li></ul>
  </>}
  select={<Select label="Card account" value="main" options={accounts} />}
  tabs={[{ label: 'Local transfers', info: true }, { label: 'SWIFT transfers', info: true }]}
  sectionLabel="Via bank transfer" onCopyAll={copyAll}
  rows={[{ label: 'Beneficiary', value: 'Aetna' }, { label: 'Sort code', value: '60-83-82', last: true }]} />
```

For dialogs that **hand the user data rather than ask for input** — bank details, API keys.
530px. One contained Done and no Cancel, because there is nothing to abandon. Values are
secondary ink; the label column is fixed so the values line up. `DialogTabs` splits the dialog
width evenly — it is the in-dialog cousin of the page's underline tab row, not `Tabs`.
