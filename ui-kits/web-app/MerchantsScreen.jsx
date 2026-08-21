const { Table, Icon } = window.PliantDesignSystem_8f7377;

const MERCHANTS = [
  { id: 1, letter: 'M', name: 'MOCO', category: 'Travel & Accommodation', code: 'YE', team: 'CLDS - Bolivia Mission', last: '0.00 GBP', thisMonth: '0.00 GBP', count: 1, volume: '-2.00 GBP' },
  { id: 2, letter: 'G', name: 'Google Digital Garage', category: 'Computing & Software', code: 'HU', team: null, last: '0.00 GBP', thisMonth: '0.00 GBP', count: 1, volume: '-1.00 GBP' },
  { id: 3, letter: 'I', name: 'IONOS', category: 'Computing & Software', code: 'KZ', team: null, last: '0.00 GBP', thisMonth: '0.00 GBP', count: 1, volume: '-1.00 GBP' },
  { id: 4, letter: 'F', name: 'FAANG GmbH', category: null, code: 'US', team: null, last: '0.00 GBP', thisMonth: '0.00 GBP', count: 0, volume: '0.00 GBP' },
];

function MerchantsScreen({ screen, onNavigate }) {
  const cols = [
    { field: 'name', headerName: 'Merchant', width: 340, renderCell: (r) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
        <LetterAvatar letter={r.letter} />
        <span>
          <span style={{ display: 'block', fontSize: 'var(--body2-size)', color: 'var(--text-primary)' }}>{r.name}</span>
          {r.category && <span style={{ display: 'block', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)' }}>{r.category}</span>}
        </span>
      </span>
    ) },
    { field: 'code', headerName: 'Country', width: 120, renderCell: (r) => <CountryCell code={r.code} /> },
    { field: 'team', headerName: 'Teams', width: 300, renderCell: (r) => r.team ? <Pill label={r.team} tone="requested" upper={false} /> : null },
    { field: 'last', headerName: 'Last month', width: 140, align: 'right' },
    { field: 'thisMonth', headerName: 'This month', width: 140, align: 'right' },
    { field: 'count', headerName: <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>Transactions<Icon name="Info" size={13} /></span>, width: 130, align: 'right' },
    { field: 'volume', headerName: <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon name="ArrowUp" size={13} />Volume<Icon name="Info" size={13} /></span>, width: 130, align: 'right' },
  ];
  return (
    <AppShell active={screen} onNavigate={onNavigate} title="Merchants">
      <Toolbar results="4 results" download={false} />
      <div style={{ borderTop: '1px solid var(--divider)' }}>
        <Table columns={cols} rows={MERCHANTS} onRowClick={() => {}} />
      </div>
    </AppShell>
  );
}

Object.assign(window, { MerchantsScreen });
