const NS = window.PliantDesignSystem_8f7377 || {};
const { Table, Icon, Button, FlagLabel } = NS;
// Resolved with a text fallback so a not-yet-recompiled bundle degrades to plain text
// instead of crashing the page — same guard the external kit uses for CardIcon.
const StateBadge = NS.StateBadge || (({ label, count }) => <span>{label}{count != null ? ' (' + count + ')' : ''}</span>);
const ChipGroup = NS.ChipGroup || (({ items = [] }) => <span>{items.join(', ')}</span>);
const TwoLineCell = NS.TwoLineCell || (({ primary, secondary }) => <span>{primary}{secondary ? ' · ' + secondary : ''}</span>);
const RoleTag = NS.RoleTag || (({ label }) => <span> {String(label || '').toUpperCase()}</span>);

// Two-line column header — PROGRAM / NAME in INT-05. Same shape as TwoLineCell so the
// header and its cells sit on one grid.
function StackedHeader({ primary, secondary, sorted }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 6 }}>
      <span style={{ display: 'block' }}>
        <span style={{ display: 'block' }}>{primary}</span>
        <span style={{ display: 'block', fontWeight: 400 }}>{secondary}</span>
      </span>
      {sorted && <Icon name="ArrowUp" size={13} />}
    </span>
  );
}

// A currency cell: the code, plus the "…" affordance the art shows when an org holds
// more than one currency (INT-01).
function CurrencyCell({ code, more }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: 6, background: 'var(--alert-neutral-fill)', color: 'var(--alert-neutral-content)', fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', lineHeight: 'var(--caption-line)' }}>{code}</span>
      {more && <span style={{ color: 'var(--text-secondary)' }}>…</span>}
    </span>
  );
}

const ORG_TABS = [
  { label: 'Customers', value: 'customers' },
  { label: 'Non-customers', value: 'non-customers' },
  { label: 'Groups', value: 'groups' },
];

function IntOrganizationsScreen({ screen, onNavigate, onOpenOrg }) {
  const [tab, setTab] = React.useState('customers');
  const [addOrg, setAddOrg] = React.useState(false);
  const customerCols = [
    { field: 'name', headerName: <SortHeader label="Organization" active dir="asc" />, width: 200 },
    { field: 'cc', headerName: 'Country', width: 100, renderCell: (r) => <FlagLabel code={r.cc} label={r.cc} gap={10} style={{ fontSize: 'var(--body2-size)' }} /> },
    { field: 'program', headerName: 'Payment Program', width: 130 },
    { field: 'currency', headerName: 'Currency', width: 110, renderCell: (r) => <CurrencyCell code={r.currency} more={r.currencyMore} /> },
    { field: 'groups', headerName: 'Account Groups', width: 150, renderCell: (r) => <ChipGroup items={r.groups} /> },
    { field: 'status', headerName: 'Status', width: 150, renderCell: (r) => <StateBadge label={r.status} /> },
    { field: 'members', headerName: 'Members', width: 100, align: 'right' },
    { field: 'cards', headerName: 'Active Cards', width: 100, align: 'right' },
    { field: 'available', headerName: 'Available / Credit Limit', width: 170, align: 'right' },
    { field: 'go', headerName: '', width: 48, renderCell: () => <Icon name="CaretRight" size={16} color="var(--action-active)" /> },
  ];
  const ncoCols = [
    { field: 'name', headerName: <SortHeader label="Organization" active dir="asc" />, width: 320 },
    { field: 'cc', headerName: 'Country', renderCell: (r) => <FlagLabel code={r.cc} label={r.cc} gap={10} style={{ fontSize: 'var(--body2-size)' }} /> },
    { field: 'go', headerName: '', width: 48, renderCell: () => <Icon name="CaretRight" size={16} color="var(--action-active)" /> },
  ];
  const nco = tab === 'non-customers';
  return (
    <InternalAppShell active={screen} onNavigate={onNavigate} title="Organizations"
      actions={<Button startIcon={<Icon name="Plus" size={18} />}
        onClick={nco ? undefined : () => setAddOrg(true)}>{nco ? 'Add NCO' : 'Add Organization'}</Button>}
      tabs={<UnderlineTabs value={tab} onChange={setTab} tabs={ORG_TABS} />}>
      <AddOrganizationDialog open={addOrg} onClose={() => setAddOrg(false)} />
      {tab === 'groups' ? (
        <p style={{ marginTop: 40, fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-secondary)' }}>Not captured yet — the Groups tab has no reference screenshot.</p>
      ) : (
        <React.Fragment>
          <Toolbar download={false} />
          <TableBlock>
            <Table columns={nco ? ncoCols : customerCols} rows={nco ? INT_NCOS : INT_ORGS}
              onRowClick={nco ? undefined : (r) => onOpenOrg && onOpenOrg(r)} />
          </TableBlock>
        </React.Fragment>
      )}
    </InternalAppShell>
  );
}

function IntMembersScreen({ screen, onNavigate }) {
  const cols = [
    { field: 'name', headerName: 'Name', width: 260, renderCell: (r) => (
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', color: 'var(--text-primary)' }}>
        {r.name}{r.owner && <RoleTag label="Owner" />}
      </span>
    ) },
    { field: 'org', headerName: 'Organization', width: 260 },
    { field: 'status', headerName: <SortHeader label="Status" active dir="asc" />, width: 160, renderCell: (r) => <StateBadge label={r.status} variant="tinted" upper /> },
    { field: 'device', headerName: 'Paired Device', width: 160 },
    { field: 'last', headerName: 'Last Active', width: 160 },
    { field: 'since', headerName: 'Registered Since', width: 170 },
  ];
  return (
    <InternalAppShell active={screen} onNavigate={onNavigate} title="Members">
      <Toolbar results="11247 results" download={false} />
      <TableBlock><Table columns={cols} rows={INT_MEMBERS} /></TableBlock>
    </InternalAppShell>
  );
}

function IntTransactionsScreen({ screen, onNavigate }) {
  const cols = [
    { field: 'merchant', headerName: 'Merchant / Category', width: 300, renderCell: (r) => <MerchantCell name={r.merchant} category={r.category} /> },
    // Every internal transaction row carries a decline mark next to the merchant, ahead
    // of the country column. Only this outlined variant appears in INT-03.
    { field: 'declined', headerName: '', width: 56, renderCell: () => <Icon name="XSquare" size={18} color="var(--error-main)" /> },
    { field: 'cc', headerName: 'Country', width: 110, renderCell: (r) => <FlagLabel code={r.cc} label={r.cc} gap={10} style={{ fontSize: 'var(--body2-size)' }} /> },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'org', headerName: 'Organization', width: 200 },
    { field: 'card', headerName: 'Card', width: 200, renderCell: (r) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <CardThumb colourway={r.colourway} scheme="visa" />
        <TwoLineCell primary={r.card} secondary={r.last4} />
      </span>
    ) },
    { field: 'member', headerName: 'Member', width: 180 },
    { field: 'amount', headerName: 'Amount', width: 130, align: 'right', renderCell: (r) => <StatusAmount status={r.status} amount={r.amount} /> },
  ];
  return (
    <InternalAppShell active={screen} onNavigate={onNavigate} title="Transactions">
      <Toolbar download={false} />
      <TableBlock><Table columns={cols} rows={INT_TX} density="media" /></TableBlock>
    </InternalAppShell>
  );
}

const PARTNER_TABS = [
  { label: 'Partners', value: 'partners' },
  { label: 'Programs', value: 'programs' },
  { label: 'Card Products', value: 'card-products' },
  { label: 'Card Variants', value: 'card-variants' },
];

const CARD_PRODUCTS = [
  { id: 1, name: 'Alpitour Premium Physical', colourway: 'metal', partner: 'Alpitour', program: 'Alpitour', variants: 61, type: 'Physical' },
  { id: 2, name: 'Anders & Ganz Virtual Travel Pliant', colourway: 'cream', scheme: 'visa', partner: 'Anders & Ganz', program: 'Anders & Ganz', variants: 24, type: 'Virtual' },
  { id: 3, name: 'Anders & Ganz Virtual Travel Pliant', colourway: 'cream', scheme: 'visa', partner: 'Anders & Ganz', program: 'Anders & Ganz', variants: 9, type: 'Virtual' },
  { id: 4, name: 'Anybill Physical Blue', colourway: 'black', scheme: 'visa', physical: true, partner: 'Anybill', program: 'Anybill', variants: 109, type: 'Physical' },
  { id: 5, name: 'Anybill Premium Physical', colourway: 'metal', partner: 'Anybill', program: 'Anybill', variants: 64, type: 'Physical' },
  { id: 6, name: 'Anybill Virtual Single Use', colourway: 'cream', scheme: 'visa', singleUse: true, partner: 'Anybill', program: 'Anybill', variants: 31, type: 'Virtual' },
  { id: 7, name: 'Anybill Virtual Single Use', colourway: 'cream', scheme: 'visa', singleUse: true, partner: 'Anybill', program: 'Anybill', variants: 77, type: 'Virtual' },
  { id: 8, name: 'Anybill Virtual Virtual', colourway: 'cream', scheme: 'visa', partner: 'Anybill', program: 'Anybill', variants: 31, type: 'Virtual' },
  { id: 9, name: 'Anybill Virtual Virtual', colourway: 'cream', scheme: 'visa', partner: 'Anybill', program: 'Anybill', variants: 77, type: 'Virtual' },
  { id: 10, name: 'Aon Benefit Virtual', colourway: 'cream', scheme: 'visa', partner: 'AON', program: 'AON', variants: 1, type: 'Virtual' },
  { id: 11, name: 'Awiti Physical Blue', colourway: 'black', scheme: 'visa', physical: true, partner: 'Awiti', program: 'Awiti', variants: 109, type: 'Physical' },
];

const CARD_VARIANTS = [
  { id: 1, name: '_DEEL COAST V CORP P US USD (21099)', product: 'Deel General CorpT&E V…', more: 0, group: 'Coastal', cc: 'US', currency: 'USD', processor: '21099' },
  { id: 2, name: 'DEEL COAST V CORP P US USD (21099)', product: 'Deel General CorpT&E V…', more: 0, group: 'POy, BC', cc: 'US', currency: 'USD', processor: '21099' },
  { id: 3, name: '_DEEL COAST V CORP V US USD (21098)', product: 'Deel General CorpT&E V…', more: 1, group: 'Coastal', cc: 'US', currency: 'USD', processor: '21098' },
  { id: 4, name: 'DEEL COAST V CORP V US USD (21098)', product: 'Deel General CorpT&E V…', more: 1, group: 'POy, BC', cc: 'US', currency: 'USD', processor: '21098' },
  { id: 5, name: '_DEEL COAST V OMNI US USD 120 (21115)', product: 'Deel Purchasing OMNI 1…', more: 0, group: 'Coastal', cc: 'US', currency: 'USD', processor: '21115' },
  { id: 6, name: 'DEEL COAST V OMNI US USD 120 (21115)', product: 'Deel Purchasing OMNI 1…', more: 0, group: 'POy, BC', cc: 'US', currency: 'USD', processor: '21115' },
  { id: 7, name: '_DEEL COAST V OMNI US USD 140 (21114)', product: 'Deel Purchasing OMNI 1…', more: 0, group: 'Coastal', cc: 'US', currency: 'USD', processor: '21114' },
  { id: 8, name: 'DEEL COAST V OMNI US USD 140 (21114)', product: 'Deel Purchasing OMNI 1…', more: 0, group: 'POy, BC', cc: 'US', currency: 'USD', processor: '21114' },
  { id: 9, name: '_DEEL COAST V OMNI US USD 160 (21113)', product: 'Deel Purchasing OMNI 1…', more: 0, group: 'Coastal', cc: 'US', currency: 'USD', processor: '21113' },
  { id: 10, name: 'DEEL COAST V OMNI US USD 160 (21113)', product: 'Deel Purchasing OMNI 1…', more: 0, group: 'POy, BC', cc: 'US', currency: 'USD', processor: '21113' },
];

// A neutral grey chip — PARTNER, PAYMENT PROGRAMS, ACCOUNT GROUP single values.
function GreyChip({ label }) {
  return <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: 6, background: 'var(--alert-neutral-fill)', color: 'var(--alert-neutral-content)', fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', lineHeight: 'var(--caption-line)', whiteSpace: 'nowrap' }}>{label}</span>;
}

// The dark "+N" token, same treatment as ChipGroup's overflow.
function OverflowToken({ n }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 24, padding: '3px 6px', borderRadius: 10, background: 'var(--action-active)', color: 'var(--primary-contrast)', fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', lineHeight: 'var(--caption-line)', fontWeight: 500 }}>{'+' + n}</span>;
}

// "View inactive" — a label-left switch, the settings-row convention.
function ViewInactiveToggle({ checked, onChange }) {
  const { Switch } = window.PliantDesignSystem_8f7377 || {};
  if (!Switch) return null;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <Switch checked={checked} onChange={onChange} />
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, letterSpacing: '0.15px', color: 'var(--text-primary)' }}>View inactive</span>
    </span>
  );
}

function IntPartnersScreen({ screen, onNavigate }) {
  const [tab, setTab] = React.useState('programs');
  const [inactive, setInactive] = React.useState(false);
  // INT-24 was captured with one filter group applied, holding three values.
  const [pills, setPills] = React.useState([{ key: 'status', label: 'DRAFT +2' }]);
  const [wizard, setWizard] = React.useState(false);
  const cols = [
    { field: 'name', headerName: <StackedHeader primary="Program" secondary="Name" sorted />, width: 220, renderCell: (r) => <TwoLineCell primary={r.name} secondary={r.code} /> },
    { field: 'scope', headerName: 'Scope', width: 200 },
    { field: 'groups', headerName: 'Account Groups', width: 190, renderCell: (r) => <ChipGroup items={r.groups} /> },
    { field: 'partner', headerName: 'Partner Name', width: 220 },
    { field: 'orgs', headerName: <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>Organizations<Icon name="Info" size={14} /></span>, width: 160 },
    { field: 'status', headerName: 'Status', width: 120, renderCell: (r) => <StateBadge label={r.status} /> },
  ];
  const productCols = [
    { field: 'name', headerName: 'Card products', width: 360, renderCell: (r) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
        <CardThumb colourway={r.colourway} scheme={r.scheme || 'none'} singleUse={r.singleUse} type={r.type === 'Physical' ? 'physical' : 'virtual'} />
        <span style={{ fontSize: 'var(--body2-size)' }}>{r.name}</span>
      </span>
    ) },
    { field: 'partner', headerName: 'Partner', width: 240, renderCell: (r) => <GreyChip label={r.partner} /> },
    { field: 'program', headerName: 'Payment programs', width: 250, renderCell: (r) => <GreyChip label={r.program} /> },
    { field: 'variants', headerName: 'Variants', width: 120 },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'status', headerName: 'Status', width: 120, renderCell: () => <StateBadge label="ACTIVE" /> },
  ];
  const variantCols = [
    { field: 'name', headerName: 'Card product variant', width: 300 },
    { field: 'product', headerName: 'Card product', width: 260, renderCell: (r) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        <GreyChip label={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><CardThumb colourway="black" scheme="none" size={0.62} />{r.product}</span>} />
        {r.more > 0 && <OverflowToken n={r.more} />}
      </span>
    ) },
    { field: 'group', headerName: 'Account group', width: 160, renderCell: (r) => <GreyChip label={r.group} /> },
    { field: 'cc', headerName: 'Country', width: 120, renderCell: (r) => <FlagLabel code={r.cc} label={r.cc} gap={10} style={{ fontSize: 'var(--body2-size)' }} /> },
    { field: 'currency', headerName: 'Currency', width: 120 },
    { field: 'processor', headerName: 'Processor ID', width: 140 },
    { field: 'status', headerName: 'Status', width: 120, renderCell: () => <StateBadge label="ACTIVE" /> },
  ];
  const ACTION = {
    programs: 'Add Payment Program', 'card-products': 'Add Card Product',
    'card-variants': 'Add Card Variant', partners: 'Add Partner',
  };
  return (
    <InternalAppShell active={screen} onNavigate={onNavigate} title="Partners & Programs"
      actions={<Button startIcon={<Icon name="Plus" size={18} />}
        onClick={tab === 'card-variants' ? () => setWizard(true) : undefined}>{ACTION[tab]}</Button>}
      tabs={<UnderlineTabs value={tab} onChange={setTab} tabs={PARTNER_TABS} />}>
      {tab === 'programs' && (
        <React.Fragment>
          <Toolbar results="180 results" download={false} />
          <TableBlock><Table columns={cols} rows={INT_PROGRAMS} /></TableBlock>
        </React.Fragment>
      )}
      {tab === 'card-products' && (
        <React.Fragment>
          <Toolbar results="480 results" download={false}
            trailing={<ViewInactiveToggle checked={inactive} onChange={() => setInactive((v) => !v)} />} />
          <TableBlock><Table columns={productCols} rows={CARD_PRODUCTS} density="media" /></TableBlock>
        </React.Fragment>
      )}
      {tab === 'card-variants' && (
        <React.Fragment>
          <Toolbar results="1230 results" download={false} filterCount={pills.length} filterPills={pills}
            onRemoveFilter={(key) => setPills((p) => p.filter((x) => x.key !== key))}
            trailing={<ViewInactiveToggle checked={inactive} onChange={() => setInactive((v) => !v)} />} />
          <TableBlock><Table columns={variantCols} rows={CARD_VARIANTS} /></TableBlock>
          <AddCardVariantDialog open={wizard} onClose={() => setWizard(false)} />
        </React.Fragment>
      )}
      {tab === 'partners' && (
        <p style={{ marginTop: 40, fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-secondary)' }}>Not captured yet — the Partners tab has no reference screenshot.</p>
      )}
    </InternalAppShell>
  );
}

Object.assign(window, { IntOrganizationsScreen, IntMembersScreen, IntTransactionsScreen, IntPartnersScreen, CurrencyCell, StackedHeader, GreyChip, OverflowToken, ViewInactiveToggle });
