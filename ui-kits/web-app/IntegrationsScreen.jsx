const { Icon, Typography } = window.PliantDesignSystem_8f7377;

// Only Bezala and Candis ship as assets in the import; the rest render a
// neutral initial tile rather than an approximated third-party logo.
function LogoTile({ src, letter, bg = 'var(--surface-contrast)', color = 'var(--text-secondary)' }) {
  if (src) return <img src={src} alt="" style={{ width: 48, height: 48, objectFit: 'contain' }} />;
  return <span style={{ width: 48, height: 48, borderRadius: 8, background: bg, color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 500 }}>{letter}</span>;
}

const INTEGRATIONS = [
  { name: 'Agicap', letter: 'A', description: "Europe's leading software for transparent cash flow management in real time", capabilities: ['API Integration (PSD2)'] },
  { name: 'BAS Fadiro', letter: 'B', description: 'BAS is the travel agency file administration system in the Dutch travel industry.', capabilities: ['API Integration'] },
  { name: 'Bezala', src: ASSETS + '/icons/Bezala.svg', description: "Europe's most automated expense software, customized to your needs", capabilities: ['API Integration'] },
  { name: 'bookman', letter: 'b', description: 'Digital Invoice Management', capabilities: ['Receipt forwarding via E-Mail'] },
  { name: 'BuchhaltungsButler', letter: 'B', description: 'The fastest cloud-based accounting software', capabilities: ['File Export/Import (CSV)', 'Receipt forwarding via E-Mail'] },
  { name: 'Candis', src: ASSETS + '/icons/Candis.svg', description: 'The invoice management software for medium-sized enterprises', capabilities: ['API Integration'] },
];

function IntegrationsScreen({ screen, onNavigate }) {
  return (
    <AppShell active={screen} onNavigate={onNavigate} breadcrumb="Settings" title="Integrations">
      <Typography variant="body2" color="text.secondary" style={{ marginTop: 4 }}>For empowering your business you can integrate pliant with other applications and synchronize your data.</Typography>
      <div style={{ borderTop: '1px solid var(--divider)', marginTop: 22, paddingTop: 30, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
        {INTEGRATIONS.map((i) => (
          <IntegrationCard key={i.name} name={i.name} description={i.description} capabilities={i.capabilities}
            logo={<LogoTile src={i.src} letter={i.letter} />} />
        ))}
      </div>
    </AppShell>
  );
}

Object.assign(window, { IntegrationsScreen });
