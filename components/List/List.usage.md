Vertical stack of records with optional leading avatar/icon and a trailing control — team members, integrations, notification settings.

```jsx
<List subheader="Team">
  <ListItem avatar={<Avatar size="small">JS</Avatar>} primary="Jonas Schmidt" secondary="Admin" action={<StatusBadge label="Active" color="success" />} />
  <ListItem primary="€1,240.00" secondary="Lufthansa" reversed />
</List>
```

`reversed` reproduces `ListItemTextReversed` — used when the value matters more than its label (amount above merchant).
