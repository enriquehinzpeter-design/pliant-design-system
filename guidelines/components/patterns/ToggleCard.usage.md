An outlined row per feature — label + info icon left, switch right. The Internal Modules stack on Terms → General (INT-22).

```jsx
<ToggleCardStack>
  <ToggleCard label="Card Management" info={<Icon name="Info" size={15} />}
    control={<Switch checked onChange={…} />} />
  <ToggleCard label="Custom Cardholder Names" disabled info={<Icon name="Info" size={15} />}
    control={<Switch checked={false} disabled />} />
</ToggleCardStack>
```

- **Not the external app's illustrated module cards.** This is a dense administrative list: no artwork, no description line, one row per module.
- A disabled module greys **both** the label and the switch — pass `disabled` and a disabled control.
- The switch sits on the RIGHT here, which is the settings-row convention; the switch-left rule applies to dialogs only.
