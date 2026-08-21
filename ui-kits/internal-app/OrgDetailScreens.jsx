const NS = window.PliantDesignSystem_8f7377 || {};
const { Table, Icon, Button, Switch, Select } = NS;
// New tranche-3 patterns, resolved with text fallbacks so a not-yet-recompiled bundle
// degrades instead of unmounting the tree.
const SegmentedToggle = NS.SegmentedToggle || (({ options = [], value }) => <span>{options.join(' / ')} ({value})</span>);
const InlineEditableValueChip = NS.InlineEditableValueChip || (({ label, value }) => <span>{label}: {value}</span>);
const MetaValueRow = NS.MetaValueRow || (({ items = [] }) => <span>{items.map((i) => i.label + ': ' + i.value).join('  ')}</span>);
const HeaderStat = NS.HeaderStat || (({ label, value }) => <span>{label} {value}</span>);
const HeaderMeta = NS.HeaderMeta || (({ label, value, action }) => <span>{label}: {value} {action}</span>);
const ToggleCard = NS.ToggleCard || (({ label, control }) => <div>{label} {control}</div>);
const ToggleCardStack = NS.ToggleCardStack || (({ children }) => <div>{children}</div>);
const LedgerCell = NS.LedgerCell || (({ primary, secondary }) => <span>{primary}{secondary ? ' · ' + secondary : ''}</span>);
const PaymentTypeCell = NS.PaymentTypeCell || (({ type, id }) => <span>{type} {id || '-'}</span>);
const LedgerLink = NS.LedgerLink || (({ children }) => <span style={{ textDecoration: 'underline' }}>{children}</span>);
const SignedAmount = NS.SignedAmount || (({ children }) => <span>{children}</span>);
const StateBadge = NS.StateBadge || (({ label }) => <span>{label}</span>);
const ChipGroup = NS.ChipGroup || (({ items = [] }) => <span>{items.join(', ')}</span>);

// A section heading with its edit pencil and closing hairline — repeated on every
// Credit & Compliance section (Summary, Customer summary, UW case).
function EditableSection({ title, onEdit, children }) {
  return (
    <section style={{ marginTop: 34 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12, borderBottom: '1px solid var(--divider)' }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 24, lineHeight: '32px', color: 'var(--text-primary)' }}>{title}</h3>
        <button type="button" onClick={onEdit} aria-label={'Edit ' + title}
          style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer', color: 'var(--action-active)', display: 'inline-flex' }}>
          <Icon name="PencilSimple" size={18} />
        </button>
      </div>
      <div style={{ paddingTop: 18 }}>{children}</div>
    </section>
  );
}

/**
 * A label/value row. An empty value is "-", and a DERIVED value (one the ops user cannot
 * set directly, e.g. the organisation limit computed from the assessment) is greyed —
 * both conventions read off INT-18.
 */
function FieldRow({ label, value, derived = false }) {
  const empty = value == null || value === '' || value === '-';
  return (
    <div style={{ display: 'flex', gap: 24, padding: '8px 0', fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', letterSpacing: 'var(--body2-ls)' }}>
      <span style={{ width: 178, flexShrink: 0, color: 'var(--text-primary)' }}>{label}</span>
      <span style={{ color: empty || derived ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{empty ? '-' : value}</span>
    </div>
  );
}

const CC_TABS = [
  { label: 'Profile', value: 'profile' },
  { label: 'Q&A', value: 'qa' },
  { label: 'Assessment', value: 'assessment' },
];

const CC_SUMMARY = [
  { label: 'PD', value: '0.01% (Crefo)' },
  { label: 'Organization limit', value: '$3,000,000', derived: true },
  { label: 'Next monitoring date', value: '08.08.2027' },
  { label: 'Defaulted', value: '-' },
  { label: 'Default date', value: '-' },
  { label: 'Default reason', value: '-' },
];
const CC_CUSTOMER = [
  { label: 'Legal name', value: '1-Pliant US - Corporate' },
  { label: 'GCC', value: '-' },
  { label: 'RU', value: '-' },
  { label: 'RU Holding', value: '-' },
];
const CC_UW = [
  { label: 'Expected monthly spend', value: '$10,000,000' },
  { label: 'Requested limit', value: '$0' },
  { label: 'Requested frequency', value: 'Daily' },
  { label: 'Requested payment terms', value: 'Immediate' },
];

function CreditComplianceScreen({ screen, onNavigate }) {
  // The segmented toggle picks the SUBJECT (credit vs compliance); the tabs then pick a
  // view inside it. INT-18/19 were both captured with Compliance selected.
  const [view, setView] = React.useState('Compliance');
  const [tab, setTab] = React.useState('profile');
  return (
    <AppShell active={screen} onNavigate={onNavigate} title="Credit & Compliance"
      actions={<HeaderMeta label="Activated at" value="12.06.2026"
        action={<Button variant="text" color="neutral" startIcon={<Icon name="DownloadSimple" size={18} />}>Export</Button>} />}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginTop: 22 }}>
        <SegmentedToggle value={view} onChange={setView} options={['Credit', 'Compliance']} />
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <InlineEditableValueChip label="Account type" value="Prefund" editIcon={<Icon name="PencilSimple" size={16} />} />
            <InlineEditableValueChip label="Bill payment transfer type" value="Direct Debit" editIcon={<Icon name="PencilSimple" size={16} />} />
          </div>
          <div style={{ marginTop: 10 }}>
            <MetaValueRow items={[{ label: 'MCA', value: 'POy, BC (USD)' }, { label: 'Bank account product', value: 'MDESD' }]} />
          </div>
        </div>
      </div>
      <UnderlineTabs value={tab} onChange={setTab} tabs={CC_TABS} />
      {tab === 'qa' ? (
        <p style={{ marginTop: 40, fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-secondary)' }}>Not captured yet — the Q&amp;A tab has no reference screenshot.</p>
      ) : (
        <React.Fragment>
          <EditableSection title="Summary">
            {CC_SUMMARY.map((r) => <FieldRow key={r.label} {...r} />)}
          </EditableSection>
          {tab === 'assessment' ? (
            <EditableSection title="UW case">
              {CC_UW.map((r) => <FieldRow key={r.label} {...r} />)}
            </EditableSection>
          ) : (
            <EditableSection title="Customer summary">
              {CC_CUSTOMER.map((r) => <FieldRow key={r.label} {...r} />)}
            </EditableSection>
          )}
        </React.Fragment>
      )}
    </AppShell>
  );
}

const ORG_SETTLEMENTS = [
  { id: 1, date: '2026-07-15', groups: ['POy', 'BC'], service: 'EANSS', account: 'Main account', count: 334, amount: '-$215,132.62', fees: '$2,151.37', state: 'SETTLED' },
  { id: 2, date: '2026-06-24', groups: ['POy', 'BC'], service: 'EANSS', account: 'Main account', count: 34, amount: '-$33,108.91', fees: '$331.10', state: 'SETTLED' },
  { id: 3, date: '2026-06-22', groups: ['POy', 'BC'], service: 'EANSS', account: 'Main account', count: 70, amount: '-$35,071.55', fees: '$350.72', state: 'SETTLED' },
  { id: 4, date: '2026-06-12', groups: ['POy', 'BC'], service: 'EANSS', account: 'Main account', count: 5, amount: '-$549.73', fees: '$5.49', state: 'RESOLVE' },
];

// The service chip is its own treatment: a warning-tinted token, not a neutral chip.
function ServiceChip({ label }) {
  return <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: 6, background: 'var(--alert-warning-fill)', color: 'var(--alert-warning-content)', fontFamily: 'var(--font-sans)', fontSize: 'var(--overline2-size)', fontWeight: 'var(--overline2-weight)', letterSpacing: 'var(--overline2-ls)', textTransform: 'uppercase' }}>{label}</span>;
}

function OrgSettlementsScreen({ screen, onNavigate }) {
  const cols = [
    { field: 'date', headerName: <SortHeader label="Report date" active dir="desc" />, width: 180 },
    { field: 'groups', headerName: 'Account group', width: 170, renderCell: (r) => <ChipGroup items={r.groups} /> },
    { field: 'service', headerName: 'Service', width: 120, renderCell: (r) => <ServiceChip label={r.service} /> },
    { field: 'account', headerName: 'Card account', width: 190 },
    { field: 'count', headerName: 'Count', width: 120, align: 'right' },
    { field: 'amount', headerName: 'Amount', width: 170, align: 'right', renderCell: (r) => <SignedAmount>{r.amount}</SignedAmount> },
    { field: 'fees', headerName: 'Fees', width: 150, align: 'right', renderCell: (r) => <SignedAmount>{r.fees}</SignedAmount> },
    { field: 'state', headerName: 'State', width: 120, align: 'right', renderCell: (r) => <StateBadge label={r.state} /> },
  ];
  return (
    <AppShell active={screen} onNavigate={onNavigate} title="Organization Settlements"
      actions={<HeaderStat label="Cumulative Amount" value="-$283,313.08" />}>
      <Toolbar download={false} />
      <TableBlock><Table columns={cols} rows={ORG_SETTLEMENTS} /></TableBlock>
    </AppShell>
  );
}

const LEDGER = [
  { id: 1, post: '2026-07-16', val: '2026-07-16', purpose: '20260715-EANS-OSP PXVIPSB7', type: 'SCT_DEBIT', party: 'Pliant Oy', acct: 'DK1289000000702400', amount: '-$215,132.62', balance: '+$11,024,826.92', ptype: 'OSP', pid: 'PXVIPSB7', stmt: 'ZM7N2PWO' },
  { id: 2, post: '2026-06-25', val: '2026-06-25', purpose: '20260624-EANS-OSP HUMXXHQR', type: 'SCT_DEBIT', party: 'Pliant Oy', acct: 'DK1289000000702400', amount: '-$33,108.91', balance: '+$11,239,959.54', ptype: 'OSP', pid: 'HUMXXHQR', stmt: 'XWRNW5VA' },
  { id: 3, post: '2026-06-25', val: '2026-06-24', purpose: 'top up', type: 'SCT_CREDIT', party: 'CUSTOMER_999910558', acct: 'DK8289000000702401', amount: '+$10,000,000.00', balance: '+$11,273,068.45', ptype: 'PP', pid: null, stmt: 'XWRNW5VA' },
  { id: 4, post: '2026-06-23', val: '2026-06-23', purpose: '20260622-EANS-OSP LPFZIXJ7', type: 'SCT_DEBIT', party: 'Pliant Oy', acct: 'DK1289000000702400', amount: '-$35,071.55', balance: '+$1,273,068.45', ptype: 'OSP', pid: 'LPFZIXJ7', stmt: 'ALFPEFBO' },
  { id: 5, post: '2026-06-16', val: '2026-06-16', purpose: 'top up', type: 'SCT_CREDIT', party: 'CUSTOMER_999910558', acct: 'DK8289000000702401', amount: '+$20,000.00', balance: '+$1,258,140.00', ptype: 'PP', pid: null, stmt: 'K21LMJ3H' },
  { id: 6, post: '2026-06-16', val: '2026-06-16', purpose: 'top up', type: 'SCT_CREDIT', party: 'CUSTOMER_999910558', acct: 'DK8289000000702401', amount: '+$20,000.00', balance: '+$1,238,140.00', ptype: 'PP', pid: null, stmt: 'K21LMJ3H' },
];

function ProcessingAccountScreen({ screen, onNavigate }) {
  const cols = [
    { field: 'post', headerName: <StackedHeader primary="Posting date" secondary="Value date" sorted />, width: 190, renderCell: (r) => <LedgerCell primary={r.post} secondary={r.val} mono /> },
    { field: 'purpose', headerName: <StackedHeader primary="Purpose" secondary="Transaction type" />, width: 240, renderCell: (r) => <LedgerCell primary={r.purpose} secondary={r.type} /> },
    { field: 'party', headerName: <StackedHeader primary="Counterparty" secondary="Account number" />, width: 240, renderCell: (r) => <LedgerCell primary={r.party} secondary={r.acct} /> },
    { field: 'amount', headerName: 'Amount', width: 150, align: 'right', renderCell: (r) => <SignedAmount>{r.amount}</SignedAmount> },
    { field: 'balance', headerName: 'Balance', width: 150, align: 'right', renderCell: (r) => <SignedAmount>{r.balance}</SignedAmount> },
    { field: 'ptype', headerName: 'Payment type / ID', width: 170, renderCell: (r) => <PaymentTypeCell type={r.ptype} id={r.pid} /> },
    { field: 'stmt', headerName: 'Statement ID', width: 140, align: 'right', renderCell: (r) => <LedgerLink>{r.stmt}</LedgerLink> },
  ];
  return (
    <AppShell active={screen} onNavigate={onNavigate} title="Processing Account">
      <Toolbar download={false} trailing={(
        <span style={{ display: 'inline-block', textAlign: 'left' }}>
          <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)', marginBottom: 4 }}>Card account</span>
          <Select value="Main account" options={['Main account']} style={{ width: 220 }} />
          <span style={{ display: 'block', marginTop: 6, fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)' }}>DK2689000026181526</span>
        </span>
      )} />
      <TableBlock><Table columns={cols} rows={LEDGER} density="media" /></TableBlock>
    </AppShell>
  );
}

// INT-22. "Custom Cardholder Names" is greyed in the capture — read as disabled for this
// organisation, not merely off.
const INTERNAL_MODULES = [
  { label: 'Card Management', on: true },
  { label: 'Travel Purchasing Cards', on: false },
  { label: 'Custom Cardholder Names', on: false, disabled: true },
  { label: 'Benefit Cards', on: false },
  { label: 'Logo Cards', on: false },
  { label: 'Accounting Features', on: true },
];

function TermsGeneralScreen({ screen, onNavigate }) {
  const [mods, setMods] = React.useState(INTERNAL_MODULES);
  const toggle = (i) => setMods((m) => m.map((x, j) => (j === i ? { ...x, on: !x.on } : x)));
  return (
    <AppShell active={screen} onNavigate={onNavigate} breadcrumb="Terms" title="General" contentWidth="capped">
      <div style={{ borderTop: '1px solid var(--divider)', marginTop: 22, paddingTop: 26 }}>
        <h3 style={{ margin: '0 0 18px', fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 20, lineHeight: '28px', color: 'var(--text-primary)' }}>Internal Modules</h3>
        <ToggleCardStack>
          {mods.map((m, i) => (
            <ToggleCard key={m.label} label={m.label} disabled={m.disabled}
              info={<Icon name="Info" size={15} color="var(--action-active)" />}
              control={<Switch checked={m.on} disabled={m.disabled} onChange={() => toggle(i)} />} />
          ))}
        </ToggleCardStack>
      </div>
    </AppShell>
  );
}

Object.assign(window, { CreditComplianceScreen, OrgSettlementsScreen, ProcessingAccountScreen, TermsGeneralScreen, EditableSection, FieldRow, ServiceChip });
