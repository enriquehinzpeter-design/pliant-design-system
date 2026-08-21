const { Table, Icon, Button, Typography } = window.PliantDesignSystem_8f7377;

function CardsScreen({ screen, onNavigate }) {
  const rows = window.CARDS;
  const [sel, setSel] = React.useState(null);
  const drawerOpen = !!sel;
  const cols = [
    { field: 'name', headerName: 'Card', width: 210, renderCell: (r) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
        <CardThumb colourway={r.colourway} scheme={window.ORG_SCHEME} />
        <span style={{ minWidth: 0 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--body2-size)' }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</span>
            <Icon name={r.icon} size={14} color="var(--action-active)" />
          </span>
          <span style={{ display: 'block', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)' }}>{r.last4}</span>
        </span>
      </span>
    ) },
    { field: 'cardholder', headerName: 'Cardholder', width: 200 },
    { field: 'status', headerName: <SortHeader label="Status" active dir="asc" />, width: 130, renderCell: (r) => <Pill label={r.statusLabel} tone={r.status} /> },
    // With the record drawer open the table drops its middle columns, exactly as in A7.
    ...(drawerOpen ? [] : [
      { field: 'issued', headerName: 'Issued', width: 130 },
      { field: 'validUntil', headerName: 'Valid until', width: 130 },
    ]),
    { field: 'account', headerName: 'Account', width: 150 },
    ...(drawerOpen ? [] : [
      { field: 'available', headerName: 'Available', width: 200, align: 'right', renderCell: (r) => <LimitMeter available={r.available} limit={r.limit} /> },
      { field: 'frequency', headerName: 'Limit frequen…', width: 130, align: 'right' },
    ]),
  ];
  return (
    <AppShell active={screen} onNavigate={onNavigate} title="Cards"
      actions={<Button startIcon={<Icon name="VerticalCards" size={18} tint />}>Request card</Button>}
      drawer={sel && <CardDetailDrawer card={sel} onClose={() => setSel(null)} />}>
      <Toolbar results="242 results" />
      <div style={{ borderTop: '1px solid var(--divider)' }}>
        <Table columns={cols} rows={rows} onRowClick={setSel} />
      </div>
    </AppShell>
  );
}

Object.assign(window, { CardsScreen });
