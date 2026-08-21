# StatementRow

```jsx
<StatementRow title="August 2026" status={<StatusToken label="Ongoing" />}
  icon={<Icon name="FileText" size={20} />} arrow={<Icon name="ArrowRight" size={18} />}
  stats={[{ value: '-2.00 GBP', label: 'Starting Balance' }]}
  balance={{ value: '-2.00 GBP', label: 'Current Balance' }}
  download={<Button size="small" startIcon={<Icon name="DownloadSimple" size={16} />}>Download</Button>} />
```

Amount-carrying list rows: figures right-aligned above their caption, signed (+0.00 / -2.00),
currency code trailing. The current month shows a status token instead of a date range.
