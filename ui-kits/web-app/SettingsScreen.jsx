const { Icon, IconButton, Typography, Switch, Button, TextField, Select, StatusBadge } = window.PliantDesignSystem_8f7377;

// C1 — Card Templates (15 results; the seven rows the screenshot shows).
const CARD_TEMPLATES = [
  { name: 'CRP Sanity Template (harness 20260720)', kind: 'Template', colourway: 'gray' },
  { name: 'Pliant Virtual Virtual', kind: 'Default', colourway: 'gray' },
  { name: 'Pliant Virtual Virtual', kind: 'Default', colourway: 'gray' },
  { name: 'Pliant Virtual Virtual', kind: 'Default', colourway: 'gray' },
  { name: 'Pliant Virtual Virtual', kind: 'Default', colourway: 'gray' },
  { name: 'Pliant Virtual Travel default fee', kind: 'Default', colourway: 'gray' },
  { name: 'Pliant Virtual Travel default fee', kind: 'Default', colourway: 'gray' },
];

// C4 — G/L Accounts. Only "Advertising & Marketing" has a subcategory in the screenshot.
const GL_CATEGORIES = [
  { label: 'Advertising & Marketing', children: [{ label: 'Test', editable: true }] },
  { label: 'Computing & Software' },
  { label: 'Education & Training' },
  { label: 'Electronics & IT Equipment' },
  { label: 'Entertainment & Wellness' },
];


// Label above value with a hairline underline and a pencil edit affordance (07).
function Field({ label, value, info, editable, span }) {
  return (
    <div style={{ gridColumn: span ? 'span 2' : undefined, display: 'flex', alignItems: 'flex-end', gap: 12, paddingBottom: 8, borderBottom: '1px solid var(--divider)' }}>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-sans)', fontSize: 'var(--input-label-size)', letterSpacing: 'var(--input-label-ls)', color: 'var(--text-secondary)' }}>
          {label}{info && <Icon name="Info" size={13} color="var(--action-active)" />}
        </span>
        <span style={{ display: 'block', marginTop: 6, fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', letterSpacing: 'var(--body2-ls)', color: 'var(--text-primary)', whiteSpace: 'pre-line' }}>{value}</span>
      </span>
      {editable && <IconButton size="small" style={{ marginBottom: -6 }}><Icon name="PencilSimple" size={18} /></IconButton>}
    </div>
  );
}

// Inline label/value row with the value right-aligned; '-' marks an empty value (14).
function ValueRow({ label, value = '-', info }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: '5px 0' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', letterSpacing: 'var(--body2-ls)', color: 'var(--text-primary)' }}>
        {label}{info && <Icon name="Info" size={14} color="var(--action-active)" />}
      </span>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', color: 'var(--text-primary)' }}>{value}</span>
    </div>
  );
}

const ORG_TABS = [
  { value: 'general', label: 'General' },
  { value: 'information', label: 'Information Update' },
  { value: 'bank', label: 'Bank Accounts' },
  { value: 'receipts', label: 'Receipts' },
  { value: 'plan', label: 'Plan (Standard)' },
];

const ACC_TABS = [
  { value: 'general', label: 'General' },
  { value: 'gl', label: 'G/L Accounts' },
  { value: 'vat', label: 'VAT Rates' },
  { value: 'cost', label: 'Cost Centers & Units' },
  { value: 'accounts', label: 'Accounts' },
];

const DATA_FIELDS = [
  { icon: 'ChartPie', title: 'G/L Accounts', description: 'G/L Accounts and related subcategories can be assigned to transactions and then exported to your accounting system.', trailingIcon: 'MerchantBasedAutomation', trailingCustom: true, active: true },
  { icon: 'Percent', title: 'VAT Rates', description: 'VAT Rates can be assigned to transactions and then exported to your accounting system.', trailingIcon: 'MerchantBasedAutomation', trailingCustom: true, active: true },
  { icon: 'UsersThree', title: 'Cost Centers (Teams)', description: 'Cost centers and related teams can be assigned to transactions and then exported to your accounting system.', trailingIcon: 'MerchantBasedAutomation', trailingCustom: true, active: true },
  { icon: 'ChatCircleText', title: 'Comments', description: 'Comments can be added to transactions and then exported to your accounting system.', active: true },
];

const TITLES = {
  'settings-organization': 'Organization',
  'settings-accounting': 'Accounting',
  'settings-card-templates': 'Card Templates',
};

function SettingsScreen({ screen, onNavigate }) {
  const NS = window.PliantDesignSystem_8f7377 || {};
  const { IndexedRow, StatColumns, CategoryList, EmptyBlock, CardIcon } = NS;
  const [orgTab, setOrgTab] = React.useState('general');
  const [accTab, setAccTab] = React.useState('general');
  const isOrg = screen === 'settings-organization';
  const isAcc = screen === 'settings-accounting';
  const isTemplates = screen === 'settings-card-templates';
  const tabs = isOrg ? <UnderlineTabs value={orgTab} onChange={setOrgTab} tabs={ORG_TABS} />
    : isAcc ? <UnderlineTabs value={accTab} onChange={setAccTab} tabs={ACC_TABS} /> : null;
  // VAT Rates / Cost Centers / Accounts have no reference screenshot; they reuse the G/L
  // list shape, which is an inference and flagged as such in the kit README.
  const listTab = isAcc && ['gl', 'vat', 'cost', 'accounts'].indexOf(accTab) !== -1;

  return (
    <AppShell active={screen} onNavigate={onNavigate} breadcrumb="Settings" title={TITLES[screen] || screen} tabs={tabs}
      contentWidth={isTemplates ? 'full' : 'capped'}
      actions={isTemplates ? <Button startIcon={<Icon name="Plus" size={18} />}>Add Template</Button> : null}>
      {isTemplates && IndexedRow && (
        <>
          <Toolbar results="15 results" download={false}
            trailing={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}><Switch /><span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', color: 'var(--text-primary)' }}>View inactive</span></span>} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, paddingTop: 8 }}>
            {CARD_TEMPLATES.map((t, i) => (
              <IndexedRow key={i} index={i + 1} title={t.name} subtitle={t.kind}
                leading={<CardIcon colourway={t.colourway} scheme={window.ORG_SCHEME} assetBase={ASSETS} />}
                trailing={<StatusBadge label="ACTIVE" color="success" />} />
            ))}
          </div>
        </>
      )}
      {isOrg && orgTab === 'bank' && EmptyBlock && (
        <div style={{ paddingTop: 30 }}>
          <div style={{ padding: '0 0 12px', borderBottom: '1px solid var(--divider)', fontFamily: 'var(--font-sans)', fontWeight: 'var(--overline2-weight)', fontSize: 'var(--overline2-size)', letterSpacing: 'var(--overline2-ls)', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Bank</div>
          <EmptyBlock message="No Bank accounts connected" pad={52} />
        </div>
      )}
      {isOrg && orgTab === 'plan' && StatColumns && (
        <div style={{ paddingTop: 30 }}>
          <Typography variant="h6" style={{ fontWeight: 400 }}>Subscription plan</Typography>
          <h2 style={{ margin: '14px 0 0', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 34, lineHeight: '42px', letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>Standard</h2>
          <Typography variant="body1" style={{ marginTop: 14 }}>Pliant charges a base fee of 10,000.00 EUR per month and 1.00 EUR per active member per month. The first 2500 members are free!</Typography>
          <StatColumns style={{ marginTop: 30 }} columns={[
            { label: 'Members', value: '37', delta: '(+20)', suffix: '/ Unlimited' },
            { label: 'Virtual cards', value: '93', delta: '(+56)', suffix: '/ Unlimited' },
            { label: 'Single-use cards', info: <Icon name="Info" size={13} color="var(--action-active)" />, value: '11', delta: '(+6)', suffix: '/ Unlimited' },
          ]} />
          <Typography variant="h6" style={{ fontWeight: 400, marginTop: 30 }}>Add-ons</Typography>
          <StatColumns style={{ marginTop: 22 }} action={<Button variant="outlined" color="neutral">View details</Button>} columns={[
            { label: 'Premium physical cards', value: '0' },
            { label: 'Annual fee per card', value: '360 EUR' },
          ]} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 30 }}>
            <Typography variant="h6" style={{ fontWeight: 400 }}>Foreign transaction fees</Typography>
            <Icon name="Info" size={15} color="var(--action-active)" />
          </div>
          <StatColumns divider={false} style={{ marginTop: 22 }} columns={[
            { label: 'Foreign transaction volume (Aug 2026)', value: '0.00 EUR' },
            { label: 'Foreign transaction fee %', value: '2.00%' },
            { label: 'Foreign transaction fee (Aug 2026)', value: '0.00 EUR' },
          ]} />
        </div>
      )}
      {listTab && CategoryList && (
        <div style={{ paddingTop: 30 }}>
          <Typography variant="h6" style={{ fontWeight: 400 }}>{ACC_TABS.filter((t) => t.value === accTab)[0].label}</Typography>
          {accTab === 'gl' && (
            <Typography variant="body1" style={{ marginTop: 14 }}>Here you can add subcategories and related G/L account numbers as used in your company's accounting system. G/L accounts can then be assigned to transactions and exported together with the other transaction data.</Typography>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '34px 0 18px' }}>
            <TextField placeholder="Search" fullWidth={false} style={{ width: 192 }} startAdornment={<Icon name="MagnifyingGlass" size={18} />} inputStyle={{ fontSize: 14 }} />
            <Select fullWidth={false} style={{ width: 138 }} value="active" placeholder="" options={[{ value: 'active', label: 'Active only' }, { value: 'all', label: 'All' }]} />
            <span style={{ marginLeft: 'auto' }}>
              <Button endIcon={<Icon name="CaretDown" size={16} />} style={{ paddingLeft: 20 }}>Add subcategory</Button>
            </span>
          </div>
          <CategoryList edit={<Icon name="PencilSimple" size={18} />} columns={['Categories', 'Account number']}
            items={GL_CATEGORIES.map((c) => ({ ...c, icon: <CategoryIcon category={c.label} size={20} /> }))} />
        </div>
      )}
      {isOrg && orgTab === 'general' && (
        <div style={{ paddingTop: 28 }}>
          <Typography variant="h6" style={{ marginBottom: 26 }}>Organization details</Typography>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 60, rowGap: 32 }}>
            <Field label="Legal name" value="Aetna" />
            <Field label="Trade name" info value="Aetna International" editable />
            <Field span label="Billing address" value={'Street -\nSW1A1AA Test City\nUnited Kingdom'} />
            <Field span label="Billing email address" info value="may.formosa+aetna_dev@getpliant.com" editable />
            <Field span label="Registration" value={'-\nUK123445'} />
            <Field span label="VAT-ID" value="GB123456789" editable />
          </div>
        </div>
      )}
      {isAcc && accTab === 'general' && (
        <div style={{ paddingTop: 28 }}>
          <SectionHeading editable>General accounts</SectionHeading>
          <div style={{ marginBottom: 40 }}>
            <ValueRow label="Cash in transit account" info />
            <ValueRow label="Default Employee Creditor Account" info />
          </div>
          <SectionHeading action={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}><Switch /><span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', color: 'var(--text-primary)' }}>View inactive</span></span>}>Data fields</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
            {DATA_FIELDS.map((d) => <DataFieldCard key={d.title} {...d} />)}
          </div>
        </div>
      )}
      {((isOrg && ['general', 'bank', 'plan'].indexOf(orgTab) === -1) || (isAcc && accTab !== 'general' && !listTab)) && (
        <EmptyState message="Not captured in the reference screenshots." />
      )}
    </AppShell>
  );
}

Object.assign(window, { SettingsScreen, Field, ValueRow, CARD_TEMPLATES, GL_CATEGORIES });
