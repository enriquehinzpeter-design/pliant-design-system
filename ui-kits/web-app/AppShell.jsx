const { Sidebar, Button, IconButton, TextField, Icon, Typography, Table } = window.PliantDesignSystem_8f7377;

let NAV = null;
// Built lazily: this file is also evaluated inside _ds_bundle.js, before the
// namespace exists, so no React elements may be created at module scope.
function getNav() {
  if (NAV) return NAV;
  NAV = [
  { label: 'Dashboard', value: 'dashboard', icon: <Icon name="SquaresFour" /> },
  { label: 'Wallet', value: 'wallet', icon: <Icon name="Wallet" /> },
  { label: 'Members & Teams', value: 'members-group', icon: <Icon name="Users" />, children: [
    { label: 'Members', value: 'members' },
    { label: 'Teams', value: 'teams' },
  ] },
  { label: 'Accounts', value: 'accounts', icon: <Icon name="Bank" /> },
  { label: 'Cards', value: 'cards-group', icon: <Icon name="VerticalCards" />, children: [
    { label: 'Cards', value: 'cards' },
    { label: 'Card Requests', value: 'card-requests', badge: 25 },
  ] },
  { label: 'Transactions', value: 'tx-group', icon: <Icon name="ListBullets" />, children: [
    { label: 'My Transactions', value: 'my-transactions' },
    { label: 'All Transactions', value: 'all-transactions' },
    { label: 'Needs Review', value: 'needs-review' },
    { label: 'Flagged Transactions', value: 'flagged', badge: 1 },
  ] },
  { label: 'Accounting Export', value: 'export-group', icon: <Icon name="BookOpen" />, children: [
    { label: 'Not exported', value: 'not-exported' },
    { label: 'Export queue', value: 'export-queue' },
    { label: 'Exported', value: 'exported' },
  ] },
  { label: 'Billing', value: 'billing-group', icon: <Icon name="Files" />, children: [
    { label: 'Payments', value: 'payments' },
    { label: 'Statements', value: 'statements' },
  ] },
  { label: 'Rewards', value: 'rewards', icon: <Icon name="Star" /> },
  { label: 'Merchants', value: 'merchants', icon: <Icon name="Storefront" /> },
  { label: 'Settings', value: 'settings-group', icon: <Icon name="Gear" />, children: [
    { label: 'Organization', value: 'settings-organization' },
    { label: 'Accounting', value: 'settings-accounting' },
    { label: 'Card Templates', value: 'settings-card-templates' },
    { label: 'Policies', value: 'settings-policies' },
    { label: 'Modules', value: 'settings-modules' },
    { label: 'Integrations', value: 'settings-integrations' },
  ] },
  ];
  return NAV;
}

// Customer View: the internal app renders the ENTIRE external app under a banner, with
// an extra INTERNAL nav section appended. Provided as context so every external screen
// picks it up without changes of its own.
const CustomerViewContext = React.createContext(null);

function TopBar({ compact = false }) {
  const [inbox, setInbox] = React.useState(false);
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 22, padding: '20px 36px 0', flexShrink: 0 }}>
      <ReceiptInboxModal open={inbox} onClose={() => setInbox(false)} />
      {/* Customer View keeps the receipt inbox but drops Copilot and Info — the ops user
          is looking at someone else's workspace, not working in their own. */}
      {!compact && <IconButton size="small" style={{ color: 'var(--secondary-dark)' }}><Icon name="Copilot" size={20} /></IconButton>}
      <IconButton size="small" onClick={() => setInbox(true)}><Icon name="Tray" size={20} /></IconButton>
      {!compact && <IconButton size="small"><Icon name="Info" size={20} /></IconButton>}
      <NotificationsBell />
      <IconButton size="small"><Icon name="UserCircle" size={20} /></IconButton>
    </div>
  );
}

// Every page shows BOTH the small breadcrumb line and the large title. The breadcrumb
// is derived from the nav tree when a screen sits under a group, so no screen can
// silently ship without it; `title` is required.
function navBreadcrumb(active) {
  const group = getNav().filter((it) => (it.children || []).some((c) => c.value === active))[0];
  return group ? group.label : null;
}

function PageHeader({ breadcrumb, title, actions, tabs }) {
  if (!title && typeof console !== 'undefined') console.warn('PageHeader: `title` is required — every page shows the large page title.');
  return (
    <div style={{ padding: '18px 36px 0', flexShrink: 0 }}>
      {breadcrumb && <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.17px', color: 'var(--text-primary)', marginBottom: 2 }}>{breadcrumb}</div>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, minHeight: 44 }}>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 32, lineHeight: '40px', letterSpacing: '-0.2px', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{title}</h1>
        {actions && <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>{actions}</div>}
      </div>
      {tabs}
    </div>
  );
}

const TOOL_LINK = (enabled) => ({ display: 'inline-flex', alignItems: 'center', gap: 8, border: 0, background: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 14, letterSpacing: '0.17px', color: enabled ? 'var(--text-primary)' : 'var(--text-disabled)' });

/**
 * Table toolbar. `filterCount` > 0 switches the Filter control to its ACTIVE form — a
 * solid dark button carrying the count — and `filterPills` renders the dismissible
 * value pills on their OWN row beneath, so a long filter set never squeezes the search
 * field. Both apps share this; see the FilterBar usage notes.
 */
function Toolbar({ results, filter = true, filterEnabled = true, onFilter, filterCount = 0,
  filterPills, onRemoveFilter, download = true, downloadEnabled = true, trailing, search = true }) {
  const NSb = window.PliantDesignSystem_8f7377 || {};
  const FilterButton = NSb.FilterButton;
  const FilterPills = NSb.FilterPills;
  return (
    <React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '22px 0 14px' }}>
        {search && <TextField placeholder="Search" fullWidth={false} style={{ width: 192 }}
          startAdornment={<Icon name="MagnifyingGlass" size={18} />} inputStyle={{ fontSize: 14 }} />}
        {filter && (FilterButton
          ? <FilterButton count={filterCount} onClick={filterEnabled ? onFilter : undefined} icon={<Icon name="FadersHorizontal" size={18} />} />
          : <button onClick={filterEnabled ? onFilter : undefined} style={TOOL_LINK(filterEnabled)}><Icon name="FadersHorizontal" size={18} />Filter{filterCount ? ' (' + filterCount + ')' : ''}</button>)}
        {results && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.17px', color: 'var(--text-secondary)' }}>{results}</span>}
        {trailing && <span style={{ marginLeft: 'auto' }}>{trailing}</span>}
        {download && <button style={{ ...TOOL_LINK(downloadEnabled), marginLeft: trailing ? undefined : 'auto' }}><Icon name="DownloadSimple" size={18} />Download</button>}
      </div>
      {FilterPills && <FilterPills items={filterPills} onRemove={onRemoveFilter}
        removeIcon={<Icon name="XCircle" size={16} weight="fill" />} />}
    </React.Fragment>
  );
}

function UnderlineTabs({ value, onChange, tabs = [] }) {
  return (
    <div style={{ borderBottom: '1px solid var(--divider)', marginTop: 22 }}>
      <div style={{ display: 'flex', gap: 24 }}>
        {tabs.map((t) => {
          const active = t.value === value;
          return (
            <button key={t.value} onClick={() => onChange && onChange(t.value)}
              style={{ position: 'relative', border: 0, background: 'none', cursor: 'pointer', padding: '0 0 10px', fontFamily: 'var(--font-sans)', fontWeight: active ? 500 : 400, fontSize: 15, letterSpacing: '0.15px', color: active ? 'var(--text-primary)' : 'rgba(0,0,0,0.72)' }}>
              {t.label}
              {active && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, background: 'var(--primary-main)' }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AppShell({ active, onNavigate, breadcrumb, title, actions, tabs, children, drawer, contentWidth = 'full' }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const crumb = breadcrumb !== undefined ? breadcrumb : navBreadcrumb(active);
  const cv = React.useContext(CustomerViewContext);
  const items = cv ? (cv.navPrepend || []).concat(getNav(), cv.extraNav || []) : getNav();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--surface-page)' }}>
    {cv && cv.banner}
    <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <Sidebar mode="light" collapsible collapsed={collapsed} onCollapse={() => setCollapsed((c) => !c)}
        activeItem={active} onSelect={onNavigate} items={items}
        orgName={cv ? cv.orgName : 'Aetna'} orgInitial={cv ? cv.orgInitial : 'A'}
        logo={<img src={ASSETS + '/logo-icon.svg'} alt="Pliant" style={{ height: 20 }} />} />
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        <TopBar compact={!!cv} />
        <PageHeader breadcrumb={crumb} title={title} actions={actions} tabs={tabs} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 36px 36px' }}>
          <div style={{ maxWidth: contentWidth === 'capped' ? 'var(--content-max-width)' : 'none' }}>{children}</div>
        </div>
        {drawer}
      </main>
    </div>
    </div>
  );
}

// Bordered table container matching the app: hairline rules, no outer box.
function TableBlock({ children }) {
  return <div style={{ borderTop: '1px solid var(--divider)' }}>{children}</div>;
}

Object.assign(window, { AppShell, TopBar, PageHeader, Toolbar, UnderlineTabs, TableBlock, TOOL_LINK, getNav, CustomerViewContext });
