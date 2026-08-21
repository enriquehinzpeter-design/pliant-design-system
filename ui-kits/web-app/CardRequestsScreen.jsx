const { Table, Icon } = window.PliantDesignSystem_8f7377;

const REQUESTS = [
  { id: 1, kind: 'New card', age: 'a day ago', cardholder: 'Dioni Ripoll', card: 'Commercial Choice', color: '#c9dcdc', approver: 'DS', txLimit: '2,000 GBP', limit: '2,000 GBP (Total)' },
  { id: 2, kind: 'New card', age: 'a day ago', cardholder: 'Dioni Ripoll', card: 'Commercial Choice', color: '#c9dcdc', approver: 'DS', txLimit: '2,323 GBP', limit: '2,323 GBP (Total)' },
  { id: 3, kind: 'New card', age: 'a day ago', cardholder: 'Dioni Ripoll', card: 'Commercial Choice', color: '#c9dcdc', approver: 'DS', txLimit: '1,000 GBP', limit: '1,000 GBP (Total)' },
  { id: 4, kind: 'New card', age: '2 days ago', cardholder: 'Dioni Ripoll', card: 'Commercial Choice', color: '#c9dcdc', approver: null, txLimit: '333 GBP', limit: '333 GBP (Total)' },
  { id: 5, kind: 'New card', age: '2 days ago', cardholder: 'Dioni Ripoll', card: 'Commercial Choice', color: '#c9dcdc', approver: null, txLimit: '200 GBP', limit: '200 GBP (Total)' },
  { id: 6, kind: 'New card', age: '2 days ago', cardholder: 'Dioni Ripoll', card: 'Commercial Choice', color: '#c9dcdc', approver: null, txLimit: '100 GBP', limit: '100 GBP (Total)' },
  { id: 7, kind: 'New card', age: '5 days ago', cardholder: 'Dioni Ripoll', card: 'TCP Test 111', color: '#c9dcdc', approver: null, txLimit: '200 GBP', limit: '200 GBP (Total)' },
];

// C9 — Archive tab. Same request rows, plus a REQUEST STATUS column.
const ARCHIVE = [
  { id: 1, kind: 'New card', age: '6 days ago', cardholder: 'Dioni Ripoll', card: 'TPC Test', last4: '9878', colourway: 'gray', status: 'Approved', txLimit: '200 GBP', limit: '200 GBP (Total)' },
  { id: 2, kind: 'New card', age: '8 days ago', cardholder: 'VERYLONGFIRSTNAME LAST…', card: 'Standard Physical', last4: '****', colourway: 'black', status: 'Approved', txLimit: '123 GBP', limit: '123 GBP Per Month' },
  { id: 3, kind: 'New card', age: '8 days ago', cardholder: 'Barnabas Verylonglastname', card: 'Standard Physical', last4: '****', colourway: 'black', status: 'Approved', txLimit: '123 GBP', limit: '123 GBP Per Month' },
  { id: 4, kind: 'New card', age: '9 days ago', cardholder: 'Barnabas Manager', card: 'Virtual', last4: '7225', colourway: 'lime', status: 'Approved', txLimit: '123 GBP', limit: '123 GBP Per Month' },
  { id: 5, kind: 'New card', age: '9 days ago', cardholder: 'Barnabas Bartha', card: 'Virtual', last4: '****', colourway: 'lime', status: 'Approved', txLimit: '123 GBP', limit: '123 GBP Per Month' },
  { id: 6, kind: 'New card', age: '9 days ago', cardholder: 'Barnabas Bartha', card: 'Virtual', last4: '****', colourway: 'lime', status: 'Approved', txLimit: '123 GBP', limit: '123 GBP Per Month' },
  { id: 7, kind: 'New card', age: '9 days ago', cardholder: 'Barnabas Bartha', card: 'Virtual', last4: '****', colourway: 'lime', status: 'Approved', txLimit: '123 GBP', limit: '123 GBP Per Month' },
];

function CardRequestsScreen({ screen, onNavigate }) {
  const [tab, setTab] = React.useState('pending');
  const cols = [
    { field: 'kind', headerName: <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>Request<Icon name="ArrowDown" size={13} /></span>, width: 240, renderCell: (r) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
        <Icon name="ArrowSquareOut" size={19} color="var(--action-active)" />
        <span>
          <span style={{ display: 'block', fontSize: 'var(--body2-size)', color: 'var(--text-primary)' }}>{r.kind}</span>
          <span style={{ display: 'block', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)' }}>{r.age}</span>
        </span>
      </span>
    ) },
    { field: 'cardholder', headerName: 'Cardholder', width: 180 },
    { field: 'card', headerName: 'Card', width: 200, renderCell: (r) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
        <CardThumb colourway={r.colourway} scheme={window.ORG_SCHEME} />
        <span>
          <span style={{ display: 'block', fontSize: 'var(--body2-size)' }}>{r.card}</span>
          <span style={{ display: 'block', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)' }}>****</span>
        </span>
      </span>
    ) },
    { field: 'approver', headerName: 'Approver', width: 240, renderCell: (r) => r.approver ? <InitialChip label={r.approver} dark /> : <span style={{ color: 'var(--text-primary)' }}>-</span> },
    { field: 'txLimit', headerName: 'Transaction limit', width: 180, align: 'right' },
    { field: 'limit', headerName: 'Limit', width: 180, align: 'right' },
  ];
  const { StatusBadge } = window.PliantDesignSystem_8f7377;
  const archiveCols = [
    cols[0], cols[1],
    { field: 'card', headerName: 'Card', width: 200, renderCell: (r) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
        <CardThumb colourway={r.colourway} scheme={window.ORG_SCHEME} />
        <span>
          <span style={{ display: 'block', fontSize: 'var(--body2-size)' }}>{r.card}</span>
          <span style={{ display: 'block', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)' }}>{r.last4}</span>
        </span>
      </span>
    ) },
    { field: 'status', headerName: 'Request status', width: 180, renderCell: (r) => <StatusBadge label={r.status.toUpperCase()} color="success" /> },
    { field: 'txLimit', headerName: 'Transaction limit', width: 180, align: 'right' },
    { field: 'limit', headerName: 'Limit', width: 190, align: 'right' },
  ];
  return (
    <AppShell active={screen} onNavigate={onNavigate} title="Card requests"
      tabs={<UnderlineTabs value={tab} onChange={setTab} tabs={[{ value: 'pending', label: 'Pending requests' }, { value: 'archive', label: 'Archive' }]} />}>
      {tab === 'pending' ? (
        <>
          <Toolbar results="25 results" download={false} />
          <div style={{ borderTop: '1px solid var(--divider)' }}>
            <Table columns={cols} rows={REQUESTS} onRowClick={() => {}} />
          </div>
        </>
      ) : (
        <>
          <Toolbar results="144 results" download={false} />
          <div style={{ borderTop: '1px solid var(--divider)' }}>
            <Table columns={archiveCols} rows={ARCHIVE} onRowClick={() => {}} />
          </div>
        </>
      )}
    </AppShell>
  );
}

Object.assign(window, { CardRequestsScreen, ARCHIVE });
