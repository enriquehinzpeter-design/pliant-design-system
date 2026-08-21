const { Button, IconButton, Icon } = window.PliantDesignSystem_8f7377;

const WALLET = [
  { name: 'Virtual', last4: '****', colourway: 'coral', scheme: 'visa', state: 'requested', stateLabel: 'Requested', usage: '1,000.00 GBP per month' },
  { name: 'test', last4: '****', colourway: 'orange', scheme: 'visa', state: 'requested', stateLabel: 'Requested', usage: '5,100.00 GBP per month' },
  { name: 'Standard Physical', type: 'physical', last4: '****', colourway: 'black', scheme: 'visa', state: 'pending', stateLabel: 'Pending', usage: '300.00 GBP per month' },
  { name: 'CRP sanity metric probe', last4: '7373', colourway: 'sage', scheme: 'visa', state: 'active', stateLabel: 'Active', spent: '0.10 GBP', limit: '0.10 GBP per month' },
  { name: 'Balance-based', last4: '1330', colourway: 'sage', scheme: 'visa', state: 'active', stateLabel: 'Active', usage: '12,600.00 GBP' },
];

function WalletScreen({ screen, onNavigate }) {
  const [sel, setSel] = React.useState(null);
  // WalletCardTile is wired to the same CardDetailsPage as the Cards table, so the
  // tile opens the A7 record drawer with the tile's own card.
  const openCard = (c) => setSel({
    name: c.name, last4: c.last4, colourway: c.colourway, type: c.type || 'virtual',
    status: c.state, statusLabel: c.stateLabel, account: 'Main account (GBP)',
  });
  return (
    <AppShell active={screen} onNavigate={onNavigate} title="Wallet"
      drawer={sel && <CardDetailDrawer card={sel} onClose={() => setSel(null)} />}
      actions={<>
        <IconButton size="small"><Icon name="List" size={20} /></IconButton>
        <Button variant="outlined" color="neutral">View exchange rate</Button>
        <Button variant="outlined" color="neutral">View billing details</Button>
        <Button startIcon={<Icon name="VerticalCards" size={18} tint />}>Request card</Button>
      </>}>
      <Toolbar results="5 results" filter={false} download={false} />
      <div style={{ borderTop: '1px solid var(--divider)', paddingTop: 30, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
        {WALLET.map((c, i) => <WalletCard key={i} {...c} onClick={() => openCard(c)} />)}
        <GhostTile />
      </div>
    </AppShell>
  );
}

Object.assign(window, { WalletScreen });
