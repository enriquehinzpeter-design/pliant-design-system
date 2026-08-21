const { Icon, Typography, Switch } = window.PliantDesignSystem_8f7377;

/* The preview headers in the product are miniature renders of the module's own UI.
   They are rebuilt here from this design system's primitives at reduced scale. */
function MiniRow({ children, style }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: '#fff', borderRadius: 6, fontSize: 9, color: 'var(--text-primary)', ...style }}>{children}</div>;
}

let PREVIEWS = null;
// Built lazily for the same reason as getNav() in AppShell.jsx.
function getPreviews() {
  if (PREVIEWS) return PREVIEWS;
  PREVIEWS = {
  assistant: (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%' }}>
      <Icon name="Sparkle" size={26} weight="fill" color="var(--secondary-dark)" />
      <span style={{ padding: '10px 14px', background: '#fff', borderRadius: 8, fontSize: 11, color: 'var(--text-primary)' }}>How can I help today?</span>
    </div>
  ),
  requests: (
    <div style={{ width: '100%', display: 'grid', gap: 6 }}>
      <MiniRow><span style={{ color: 'var(--text-secondary)' }}>1×</span><span>•••• 3456</span><span style={{ marginLeft: 'auto' }}>€ 30.000,00</span></MiniRow>
      <div style={{ display: 'flex', gap: 6 }}>
        <span style={{ flex: 1, textAlign: 'center', padding: '7px 6px', background: '#fff', borderRadius: 6, fontSize: 9 }}>Request limit change</span>
        <span style={{ flex: 1, textAlign: 'center', padding: '7px 6px', background: 'var(--primary-main)', color: '#fff', borderRadius: 6, fontSize: 9 }}>Request new card</span>
      </div>
    </div>
  ),
  singleUse: (
    <div style={{ width: '100%', display: 'grid', gap: 6 }}>
      <MiniRow><span style={{ color: 'var(--text-secondary)' }}>1×</span><span>Apple</span><span style={{ marginLeft: 'auto' }}>- € 37.500,00</span><Icon name="CheckCircle" size={9} weight="fill" color="var(--success-main)" /></MiniRow>
      <MiniRow><span style={{ color: 'var(--text-secondary)' }}>1×</span><span>Single-use card</span><span style={{ marginLeft: 'auto', padding: '2px 5px', borderRadius: 3, background: 'var(--warning-main)', color: '#fff', fontSize: 7, letterSpacing: '0.4px' }}>TERMINATED</span></MiniRow>
    </div>
  ),
  controls: (
    <div style={{ display: 'flex', gap: 8, width: '100%' }}>
      {[['FlagPennant', 'Marketing', true], ['Computing', 'Computing', false], ['Travel', 'Travel', true]].map(([ic, l, on], i) => (
        <span key={i} style={{ flex: 1, background: '#fff', borderRadius: 6, padding: '8px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Icon name={ic} size={16} assetBase={ic === 'Computing' || ic === 'Travel' ? ASSETS : undefined} />
          <span style={{ width: 18, height: 9, borderRadius: 5, background: on ? 'var(--primary-main)' : 'var(--action-disabled-bg)' }} />
          <span style={{ fontSize: 7, color: 'var(--text-secondary)' }}>{l}</span>
        </span>
      ))}
    </div>
  ),
  templates: (
    <div style={{ width: '100%', display: 'grid', gap: 6 }}>
      <MiniRow><Icon name="DotsSixVertical" size={9} color="var(--action-active)" /><span style={{ color: 'var(--text-secondary)' }}>1</span><span style={{ width: 12, height: 16, borderRadius: 2, background: '#efefeb' }} /><span>Virtual Card</span><span style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>2 Card(s)</span></MiniRow>
      <MiniRow><Icon name="DotsSixVertical" size={9} color="var(--action-active)" /><span style={{ color: 'var(--text-secondary)' }}>2</span><span style={{ width: 12, height: 16, borderRadius: 2, background: '#111' }} /><span>Physical Card</span><span style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>8 Card(s)</span></MiniRow>
    </div>
  ),
  merchantRules: (
    <div style={{ width: '100%', display: 'grid', gap: 6 }}>
      <MiniRow><Icon name="FlagPennant" size={11} /><span>G/L Account</span><span style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>Auto-assigned</span><Icon name="CheckCircle" size={9} weight="fill" color="var(--success-main)" /></MiniRow>
      <MiniRow><Icon name="Percent" size={11} /><span>VAT rate</span><span style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>Auto-assigned</span><Icon name="CheckCircle" size={9} weight="fill" color="var(--success-main)" /></MiniRow>
    </div>
  ),
  };
  return PREVIEWS;
}

const MODULES = [
  { key: 'assistant', title: 'Pliant Assistant', description: 'An AI assistant that answers your questions on spend, analytics, and Pliant setup.', active: true },
  { key: 'requests', title: 'Card Requests', description: 'Allow employees to request new cards or changes to the limits of their existing cards.', active: true },
  { key: 'singleUse', title: 'Single-use Cards', description: 'Issue and request single-use virtual cards for one-time or occasional larger expenses.', active: true },
  { key: 'controls', title: 'Card Controls', description: 'Select which transaction types are allowed with a specific card.', active: false },
  { key: 'templates', title: 'Card Templates', description: 'Simplify and standardize the issuance of credit cards with reusable templates.', active: false },
  { key: 'merchantRules', title: 'Merchant-based Accounting Rules', description: 'With the automatic accounting rules, suppliers, G/L accounts and/or tax rates can be assigned automatically.', active: false },
];

function ModulesScreen({ screen, onNavigate }) {
  return (
    <AppShell active={screen} onNavigate={onNavigate} breadcrumb="Settings" title="Modules">
      <div style={{ borderTop: '1px solid var(--divider)', paddingTop: 30, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
        {MODULES.map((m) => <ModuleCard key={m.key} preview={getPreviews()[m.key]} title={m.title} description={m.description} active={m.active} />)}
      </div>
    </AppShell>
  );
}

Object.assign(window, { ModulesScreen });
