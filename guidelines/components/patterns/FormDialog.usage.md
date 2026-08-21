# FormDialog

```jsx
<FormDialog title="Invite a new member" confirmLabel="Send invite" confirmDisabled={!valid}
  onCancel={close} onConfirm={submit}>
  <TextField label="First name" />
  <Select label="Member role" value="cardholder" options={roles}
    helperText={<>Learn more about <a href="#">member roles</a></>} />
</FormDialog>
```

392px, 24px padding, 16px between fields. Title only — **no X button and no dividers.**
Footer is always text Cancel + contained confirm, 8px apart, right-aligned; the confirm
starts disabled. A yes/no question inside the form is a plain 15px line plus `RadioGroup row`.
