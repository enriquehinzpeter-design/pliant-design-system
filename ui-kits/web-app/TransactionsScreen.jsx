const { Table, Icon, Typography, Button, IconButton, Alert, Switch, Divider } = window.PliantDesignSystem_8f7377;

const TITLES = {
  'my-transactions': 'My transactions',
  'all-transactions': 'All transactions',
  'needs-review': 'Needs review',
  flagged: 'Flagged transactions',
};

function DetailRow({ label, value, action, tall }) {
  return (
    <div style={{ display: 'flex', alignItems: tall ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 16, padding: tall ? '14px 16px' : '0 16px', minHeight: tall ? 70 : 56, border: '1px solid var(--divider)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-sans)' }}>
      <span style={{ fontSize: 'var(--body2-size)', letterSpacing: 'var(--body2-ls)', color: 'var(--text-primary)' }}>{label}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 'var(--body2-size)', letterSpacing: 'var(--body2-ls)', color: 'var(--text-primary)', textAlign: 'right' }}>{value}{action}</span>
    </div>
  );
}

function SectionLabel({ children, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, margin: '26px 0 10px' }}>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--overline2-size)', fontWeight: 'var(--overline2-weight)', letterSpacing: 'var(--overline2-ls)', lineHeight: 'var(--overline2-line)', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{children}</span>
      {action}
    </div>
  );
}

function TransactionDrawer({ tx, onClose }) {
  const { RecordDrawer } = window.PliantDesignSystem_8f7377 || {};
  if (!RecordDrawer) return null;
  return (
    <RecordDrawer onClose={onClose}>
      <div style={{ padding: '4px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20 }}>
          <span style={{ width: 68, height: 68, borderRadius: 12, background: 'var(--surface-contrast)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CategoryIcon category={tx.category} size={30} />
          </span>
          <span style={{ textAlign: 'right' }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 'var(--overline2-size)', fontWeight: 500, letterSpacing: 'var(--overline2-ls)', textTransform: 'uppercase', color: tx.status === 'DECLINED' ? 'var(--error-main)' : 'var(--info-main)' }}>{tx.status}</span>
            <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 30, fontWeight: 500, letterSpacing: '-0.2px', lineHeight: '40px', color: 'var(--text-primary)', textDecoration: tx.status === 'DECLINED' ? 'line-through' : 'none' }}>{tx.amount}</span>
          </span>
        </div>
        <div style={{ marginTop: 12, fontFamily: 'var(--font-sans)', fontSize: 15, letterSpacing: '0.15px', color: 'var(--text-primary)' }}>{tx.merchant}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 16, paddingBottom: 16, borderBottom: '1px solid var(--divider)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', letterSpacing: 'var(--body2-ls)', color: 'var(--text-primary)' }}>
            <Icon name="CalendarCheck" size={18} />{tx.date + ', ' + tx.time}
          </span>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 10px', border: 0, borderRadius: 6, background: 'var(--alert-neutral-fill)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, letterSpacing: '0.16px', color: 'var(--text-primary)' }}>
            Flag transaction<Icon name="FlagPennant" size={16} />
          </button>
        </div>
      </div>
      <div style={{ padding: '20px 22px 32px' }}>
        {tx.receiptOverdue && (
          <Alert severity="error" title="Overdue Receipt">This receipt has been overdue for 2 days. Please upload it as soon as possible.</Alert>
        )}
        <SectionLabel>Transaction details</SectionLabel>
        <div style={{ display: 'grid', gap: 8 }}>
          <DetailRow label="Merchant" value={tx.merchant} />
          <DetailRow label="Cardholder" value={tx.member} />
          <DetailRow label="Card" value={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}><span style={{ textAlign: 'right' }}><span style={{ display: 'block' }}>{tx.card}</span><span style={{ display: 'block', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)' }}>{tx.last4}</span></span><CardThumb colourway={tx.colourway} scheme={window.ORG_SCHEME} /></span>} />
          <DetailRow label="Account" value={tx.account} />
          <DetailRow tall
            label={<span><span style={{ display: 'block' }}>Comment</span><span style={{ display: 'block', marginTop: 4, fontSize: 13, color: 'var(--text-secondary)' }}>Add comment</span></span>}
            value={null}
            action={<IconButton size="small"><Icon name="PencilSimple" size={18} /></IconButton>} />
        </div>
        <SectionLabel action={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}><Switch size="small" /><span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', color: 'var(--text-primary)' }}>Not needed</span></span>}>Receipt</SectionLabel>
        <div style={{ border: '1px dashed var(--input-border)', borderRadius: 'var(--radius)', padding: '32px 24px', textAlign: 'center' }}>
          <Icon name="ReceiptAdd" assetBase={ASSETS} size={26} />
          <Typography variant="body2" color="text.secondary" style={{ marginTop: 10 }}>Drop a receipt here or browse files</Typography>
        </div>
      </div>
    </RecordDrawer>
  );
}

function TransactionsScreen({ screen, onNavigate }) {
  const [sel, setSel] = React.useState(null);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const all = window.TX;
  const rows = screen === 'my-transactions' ? []
    : screen === 'needs-review' ? all.filter((t) => t.review === 'thumb')
    : screen === 'flagged' ? all.filter((t) => t.flagged)
    : all;
  const drawerOpen = !!sel;

  const cols = [
    { field: 'merchant', headerName: 'Merchant / Category', renderCell: (r) => <MerchantCell name={r.merchant} category={r.category} flagged={r.flagged} receipt={r.comment} /> },
    { field: 'date', headerName: 'Date', width: 130 },
    ...(drawerOpen ? [] : [
      { field: 'card', headerName: 'Card', width: 170, renderCell: (r) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <CardThumb colourway={r.colourway} scheme={window.ORG_SCHEME} />
          <span><span style={{ display: 'block', fontSize: 'var(--body2-size)' }}>{r.card}</span><span style={{ display: 'block', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)' }}>{r.last4}</span></span>
        </span>
      ) },
      { field: 'member', headerName: 'Member', width: 160 },
      ...(screen === 'flagged' ? [{ field: 'flagReason', headerName: 'Flag reason', width: 150 }] : []),
      { field: 'account', headerName: 'Account', width: 200 },
    ]),
    { field: 'amount', headerName: 'Amount', width: 130, align: 'right', renderCell: (r) => <StatusAmount status={r.status} amount={r.amount} /> },
    ...(drawerOpen ? [] : [
      { field: 'review', headerName: 'Review', width: 90, renderCell: (r) => r.review === 'thumb'
        ? <Icon name="ThumbsUp" size={20} color="var(--action-active)" />
        : r.review === 'flag' ? <Icon name="FlagPennant" size={20} weight="fill" color="var(--error-light)" /> : null },
    ]),
    { field: 'export', headerName: 'Export', width: 80 },
  ];

  return (
    <AppShell active={screen} onNavigate={onNavigate} breadcrumb="Transactions" title={TITLES[screen]}
      drawer={sel && <TransactionDrawer tx={sel} onClose={() => setSel(null)} />}>
      <Toolbar results={rows.length + ' results'} filterEnabled={rows.length > 0} onFilter={() => setFilterOpen(true)} downloadEnabled={rows.length > 0} />
      <TransactionFilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} />
      <div style={{ borderTop: '1px solid var(--divider)' }}>
        <Table columns={cols} rows={rows} onRowClick={setSel} emptyMessage="" />
        {rows.length === 0 && <EmptyState message={screen === 'needs-review' ? 'No transactions to review.' : 'No transactions available yet.'} />}
      </div>
    </AppShell>
  );
}

Object.assign(window, { TransactionsScreen, TransactionDrawer, DetailRow, SectionLabel });
