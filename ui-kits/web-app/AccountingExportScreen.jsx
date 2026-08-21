const { Table, Icon, Checkbox } = window.PliantDesignSystem_8f7377;

const COLS = [
  ['Merchant', null], ['Booking date', 'Transaction date'], ['Subcategory', 'G/L account'],
  ['Vat rate', 'Percentage / code'], ['Team', 'Cost center'], ['Account', 'Account number'],
  ['Amount', 'Foreign transaction am…'], ['Review', null],
];

function AccountingExportScreen({ screen, onNavigate }) {
  const cols = [
    { field: 'merchant', headerName: <TwoLineHeader primary="Merchant" /> },
    ...COLS.slice(1).map(([p, s], i) => ({
      field: 'c' + i, width: i === 6 ? 90 : 150,
      align: p === 'Amount' ? 'right' : 'left',
      headerName: <TwoLineHeader primary={p} secondary={s} />,
    })),
  ];
  return (
    <AppShell active={screen} onNavigate={onNavigate} breadcrumb="Accounting Export" title="Not exported">
      <Toolbar results="0 results" filterEnabled={false} download={false}
        trailing={<button style={TOOL_LINK(true)}><Icon name="Columns" size={18} />Configure columns</button>} />
      <div style={{ borderTop: '1px solid var(--divider)' }}>
        <Table columns={cols} rows={[]} selectable emptyMessage="" />
        <EmptyState message="No transactions available yet." />
      </div>
    </AppShell>
  );
}

Object.assign(window, { AccountingExportScreen });
