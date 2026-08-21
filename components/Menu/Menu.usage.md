Overflow actions for a row, a card or a page header. Reach for `MenuContainer` — it owns the open state and the trigger's selected styling, exactly like the source component.

```jsx
<MenuContainer button={<IconButton><Icon name="DotsThreeOutlineVertical" /></IconButton>} items={[
  { label: 'Edit limit', icon: <Icon name="PencilSimple" /> },
  { divider: true },
  { label: 'Terminate card', icon: <Icon name="Trash" />, danger: true },
]} />
```

Menus are **dense by default** (14px items), anchored bottom-right, and capped at 40vh, on an
outlined shadow-8 paper. A **single-item menu hugs its content** — the Accounts card kebab (B3)
opens a ~107px popover holding just `Rename` with a pencil icon, so pass `minWidth={0}` there
rather than letting the 200px default stretch it.
