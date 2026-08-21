Date and date-range entry — statement periods, transaction filters, card validity.

```jsx
<DateField label="Booking date" value="12.03.2026" />
<DateRangeField label="Statement period" from="01.03.2026" to="31.03.2026" />
```

Pliant uses `@mui/x-date-pickers-pro` (DatePicker, DateTimePicker, DateRangePicker) with app-level `MuiDateRangePickerOverrides`. These recreations cover the field visuals only, not the calendar popover.
