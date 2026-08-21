# WorkspaceModal / ViewToggle

```jsx
<WorkspaceModal title="Receipt Inbox" tabs={['Unmatched', 'Matched', 'Trash']} onClose={close}
  meta={<span>Inbox address: <b>…</b></span>} toolbar={<Toolbar results="0 results" />}>
  <EmptyBlock message="No unmatched receipts." />
</WorkspaceModal>
```

For a **secondary workspace**, not a task: opened from a top-bar icon, near-fullscreen
(28px / 84px inset), with its own tabs and toolbar. A task with a commit is still a dialog.
