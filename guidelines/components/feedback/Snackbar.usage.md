Transient confirmation of a completed action — "Card frozen", "Export queued", "Receipt attached".

```jsx
<Snackbar open={saved} message="Card limit updated" onClose={dismiss} />
```

Pliant builds these from notistack + a **filled** Alert with `icon={false}` and `elevation={6}`; a `default` notistack variant renders as `success`.
