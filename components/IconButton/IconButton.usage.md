Icon-only circular button for toolbars, table row actions and dialog close buttons.

```jsx
<IconButton onClick={close}><Icon name="X" /></IconButton>
<IconButton color="primary-contained"><Icon name="Plus" /></IconButton>
```

- `selected` renders the persistent pressed state used when the button owns an open menu (MenuContainer applies it automatically).
- `primary-contained` is Pliant-specific: near-black fill, white glyph, no hover lightening.
