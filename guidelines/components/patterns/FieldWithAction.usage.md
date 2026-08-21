Two form details from the Add-organization dialog (INT-26).

```jsx
<FieldWithAction label="HubSpot Company ID" actionLabel="Fetch" onAction={lookup}>
  <TextField placeholder="HubSpot Company ID" fullWidth />
</FieldWithAction>

<Select label="Organization name" … />
<InlineEscapeLink linkLabel="Add manually" onClick={…}>Organisation not listed?</InlineEscapeLink>
```

- The **action sits outside the input**, on its trailing edge — a separate step ("go fetch this record"), not an input adornment. Adornments belong inside the field; actions do not.
- `InlineEscapeLink` is a **statement plus an underlined inline link**, not a button: it offers a way out when a search-select cannot find the record. Keep it directly under the field it rescues.
