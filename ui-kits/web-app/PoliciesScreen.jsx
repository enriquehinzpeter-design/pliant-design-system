const { Table, Icon, IconButton, Button, Typography } = window.PliantDesignSystem_8f7377;

const RULES = [
  { n: '1', name: 'Cards for Teams 1', conditions: [['Team', 'pablo test in-16657-2', 'UsersThree']], settings: 1,
    approvers: [{ t: '> 0 GBP', auto: true }, { t: '> 1,000 GBP', chain: [[{ role: 'Owner' }]] }] },
  { n: '2', name: 'Cards for Teams 2', conditions: [['Team', 'CLDS - Bolivia Mission', 'UsersThree'], ['Card type', 'Standard Physical Card', 'Cardholder']], settings: 2,
    approvers: [
      { t: '> 0 GBP', auto: true },
      { t: '> 1,000 GBP', chain: [[{ role: 'Team Manager' }, { initials: 'CV' }], [{ initials: 'DR' }]] },
      { t: '> 5,000 GBP', chain: [[{ role: 'Owner' }]] },
      { t: '> 50,000 GBP', chain: [[{ role: 'Accountant' }, { role: 'Team Manager' }, { initials: 'AA' }], [{ role: 'Accountant' }], [{ initials: 'TA' }, { initials: 'BM' }]] },
      { t: '> 500,000 GBP', chain: [[{ initials: 'AA' }, { initials: 'BM' }], [{ initials: 'TA' }]] },
    ] },
  { n: '3', name: 'test empty', conditions: [['Team', 'empty', 'UsersThree']], settings: 2,
    approvers: [{ t: '> 0 GBP', chain: [[{ initials: 'DS' }], [{ role: 'Team Manager' }]] }] },
  { n: 'lock', name: 'Default Rule', conditions: [], settings: 2,
    approvers: [{ t: '> 0 GBP', auto: true }, { t: '> 1,000 GBP', chain: [[{ role: 'Owner' }]] }] },
];

// C5 — Policies > Receipt Policy.
function ReceiptPolicyTab() {
  const NS = window.PliantDesignSystem_8f7377 || {};
  const { PolicySummaryBar, InlineChip, OptionCard, StatusBadge, Switch } = NS;
  if (!PolicySummaryBar) return null;
  return (
    <div style={{ paddingTop: 30 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Typography variant="h6" style={{ fontWeight: 400 }}>Overdue Receipt</Typography>
        <StatusBadge label="ACTIVE" color="success" />
      </div>
      <Typography variant="body1" style={{ marginTop: 14 }}>
        Set the timeframe after which a missing receipt for a transaction will be marked as overdue. For more details, see the <a href="#" onClick={(e) => e.preventDefault()}>Help Center</a>.
      </Typography>
      <PolicySummaryBar style={{ marginTop: 22 }} action={<Button>Edit Timeframe</Button>}>
        <InlineChip label="7 days" /> after transaction date OR <InlineChip label="3 days" /> after end of month
      </PolicySummaryBar>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 42 }}>
        <Typography variant="h6" style={{ fontWeight: 400 }}>Auto-reimbursement</Typography>
        <Icon name="Info" size={15} color="var(--action-active)" />
        <span style={{ marginLeft: 'auto' }}><Switch /></span>
      </div>
      <Typography variant="body1" style={{ marginTop: 12 }}>
        Automatically reimburse transactions with overdue receipts. <a href="#" onClick={(e) => e.preventDefault()}>View enabled cards</a>
      </Typography>
      <Typography variant="h6" style={{ fontWeight: 400, marginTop: 42 }}>Receipt not needed</Typography>
      <Typography variant="body1" style={{ marginTop: 12 }}>Define when receipts aren't required. Those transactions are exempt from the Overdue Receipt Policy.</Typography>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 26 }}>
        <OptionCard title="Automate Low Amount" valueLabel="Low Amount" value="22.00 GBP"
          editable={<Icon name="PencilSimple" size={18} />} />
        <OptionCard title="Automate Merchants"
          action={<Button variant="text">View Merchants</Button>}>
          No merchants exempted yet. Add exemptions for “Receipt not needed” in the Merchants page.
        </OptionCard>
      </div>
    </div>
  );
}

function PoliciesScreen({ screen, onNavigate }) {
  const [tab, setTab] = React.useState('card');
  const cols = [
    { field: 'n', headerName: '#', width: 60, renderCell: (r) => r.n === 'lock' ? <Icon name="Lock" size={18} /> : <span>{r.n}</span> },
    { field: 'name', headerName: 'Rule name', width: 180 },
    { field: 'conditions', headerName: 'Conditions', width: 400, renderCell: (r) => (
      <span style={{ display: 'block' }}>
        {r.conditions.map(([field, value, icon], i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0', flexWrap: 'wrap' }}>
            {i > 0 && <span style={{ fontWeight: 500 }}>AND</span>}
            <span>{field}</span><span style={{ fontWeight: 500 }}>IS</span>
            <ConditionChip label={value} icon={icon} />
          </span>
        ))}
      </span>
    ) },
    { field: 'settings', headerName: 'Settings', width: 110, renderCell: (r) => (
      <span style={{ display: 'inline-flex', gap: 8, color: 'var(--action-active)' }}>
        <Icon name="EyeSlash" size={19} />
        {r.settings > 1 && <Icon name="Eye" size={19} />}
      </span>
    ) },
    { field: 'approvers', headerName: 'Approvers', renderCell: (r) => (
      <span style={{ display: 'block' }}>
        {r.approvers.map((a, i) => <ApproverRow key={i} threshold={a.t} auto={a.auto} chain={a.chain} />)}
      </span>
    ) },
  ];
  return (
    <AppShell active={screen} onNavigate={onNavigate} breadcrumb="Settings" title="Policies" contentWidth="capped"
      tabs={<UnderlineTabs value={tab} onChange={setTab} tabs={[{ value: 'card', label: 'Card Approval Policy' }, { value: 'receipt', label: 'Receipt Policy' }]} />}>
      {tab !== 'card' ? <ReceiptPolicyTab /> : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '30px 0 22px' }}>
            <Typography variant="h6">Card Approval Policy</Typography>
            <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 14 }}>
              <IconButton size="small"><Icon name="Gear" size={19} /></IconButton>
              <Button startIcon={<Icon name="PencilSimple" size={18} />}>Edit policy</Button>
            </span>
          </div>
          <div style={{ borderTop: '1px solid var(--divider)' }}>
            <Table columns={cols} rows={RULES} />
          </div>
        </>
      )}
    </AppShell>
  );
}

Object.assign(window, { PoliciesScreen });
