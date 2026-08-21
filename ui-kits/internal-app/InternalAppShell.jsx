const { Sidebar, IconButton, Icon } = window.PliantDesignSystem_8f7377;

// The internal (ops) nav tree, transcribed from the rail in INT-01..INT-17. Group
// sub-items are the ones the group rows expand to in the captures.
let INT_NAV = null;
function getIntNav() {
  if (INT_NAV) return INT_NAV;
  INT_NAV = [
    { label: 'Partners & Programs', value: 'partners', icon: <Icon name="Handshake" /> },
    { label: 'All Organizations', value: 'organizations', icon: <Icon name="Buildings" /> },
    { label: 'All Members', value: 'int-members', icon: <Icon name="Users" /> },
    { label: 'All Transactions', value: 'int-transactions', icon: <Icon name="ListBullets" /> },
    { label: 'All Merchants', value: 'int-merchants', icon: <Icon name="CreditCard" /> },
    { label: 'Settlements', value: 'settlements-group', icon: <Icon name="Sliders" />, children: [
      { label: 'Program Settlements', value: 'program-settlements' },
      { label: 'Settlement Accounts', value: 'settlement-accounts' },
      { label: 'Program Settlement Files', value: 'settlement-files' },
    ] },
    { label: 'Repayments', value: 'repayments-group', icon: <Icon name="DownloadSimple" />, children: [
      { label: 'Customer Repayments', value: 'customer-repayments' },
      { label: 'DD Collection Payout', value: 'dd-collection-payout' },
      { label: 'Receivable Repayments', value: 'receivable-repayments' },
    ] },
    { label: 'Payouts', value: 'payouts-group', icon: <Icon name="UploadSimple" />, children: [
      { label: 'Customer Payouts', value: 'customer-payouts' },
      { label: 'Cashback Payments', value: 'cashback-payments' },
      { label: 'Compensation Payments', value: 'compensation-payments' },
    ] },
    { label: 'Compliance', value: 'compliance-group', icon: <Icon name="ArrowsClockwise" />, children: [
      { label: 'Repayment Accounts Approval', value: 'repayment-approval' },
      { label: 'Coastal Report Templates', value: 'coastal-templates' },
    ] },
    { label: 'Update Terms or Policies', value: 'update-terms', icon: <Icon name="Export" /> },
  ];
  return INT_NAV;
}

// The environment pill above the mark, bottom-left of the rail. Staging shows SANDBOX;
// no other environment has been captured, so no other tone is defined.
function EnvironmentPill({ label = 'SANDBOX' }) {
  return (
    <span style={{
      // alignSelf keeps the pill hugging its word inside the rail column flex slot,
      // which would otherwise stretch it edge to edge.
      display: 'inline-block', alignSelf: 'flex-start', padding: '3px 10px', borderRadius: 999,
      background: 'var(--warning-main)', color: 'var(--primary-contrast)',
      fontFamily: 'var(--font-sans)', fontSize: 'var(--overline2-size)', fontWeight: 600,
      letterSpacing: 'var(--overline2-ls)', lineHeight: 'var(--overline2-line)',
    }}>{label}</span>
  );
}

// Compact top bar: notifications + account only. The internal app has no Copilot,
// receipt inbox, info or page-level invite/request actions.
function IntTopBar() {
  const [menu, setMenu] = React.useState(false);
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 22, padding: '20px 36px 0', flexShrink: 0 }}>
      <IconButton size="small"><Icon name="Bell" size={20} /></IconButton>
      <IconButton size="small" onClick={() => setMenu((v) => !v)}><Icon name="UserCircle" size={20} /></IconButton>
      {window.UserMenu && <UserMenu open={menu} onClose={() => setMenu(false)} />}
    </div>
  );
}

function intBreadcrumb(active) {
  const group = getIntNav().filter((it) => (it.children || []).some((c) => c.value === active))[0];
  return group ? group.label : null;
}

/**
 * The dark ops shell for cross-organisation pages. Same PageHeader / Toolbar / Table
 * vocabulary as the external app — only the rail tone, the environment pill and the
 * compact top bar differ.
 */
function InternalAppShell({ active, onNavigate, breadcrumb, title, actions, tabs, children, drawer, contentWidth = 'full' }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const crumb = breadcrumb !== undefined ? breadcrumb : intBreadcrumb(active);
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--surface-page)' }}>
      <Sidebar mode="dark" collapsible collapsed={collapsed} onCollapse={() => setCollapsed((c) => !c)}
        activeItem={active} onSelect={onNavigate} items={getIntNav()}
        logo={(
          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14 }}>
            <EnvironmentPill />
            {/* Inline so the mark inherits the rail's light ink via currentColor —
                an <img> could not follow the dark theme. */}
            <svg width="16" height="20" viewBox="0 0 25 32" fill="none" aria-label="Pliant" role="img" style={{ display: 'block' }}>
              <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M23.611 0H1.39a1.34 1.34 0 0 0-.982.439A1.56 1.56 0 0 0 0 1.499v8.558c0 .397.146.779.407 1.06.26.28.613.439.982.439h10.614c.368 0 .722.158.982.44.261.28.408.662.408 1.06v10.333c0 .398.146.779.406 1.06s.614.44.983.44h8.83c.368 0 .72-.159.981-.44.26-.281.407-.662.407-1.06V1.5a1.56 1.56 0 0 0-.407-1.06A1.34 1.34 0 0 0 23.611 0ZM10.714 30.554V15.669c0-.8-.621-1.447-1.387-1.447h-7.94C.622 14.222 0 14.87 0 15.67v14.885C0 31.352.621 32 1.388 32h7.939c.766 0 1.387-.648 1.387-1.446Z" />
            </svg>
          </span>
        )} />
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        <IntTopBar />
        <PageHeader breadcrumb={crumb} title={title} actions={actions} tabs={tabs} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 36px 36px' }}>
          <div style={{ maxWidth: contentWidth === 'capped' ? 'var(--content-max-width)' : 'none' }}>{children}</div>
        </div>
        {drawer}
      </main>
    </div>
  );
}

Object.assign(window, { InternalAppShell, IntTopBar, EnvironmentPill, getIntNav });
