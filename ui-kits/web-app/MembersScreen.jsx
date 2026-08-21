const { Table, Icon, Button } = window.PliantDesignSystem_8f7377;

function MembersScreen({ screen, onNavigate }) {
  const rows = window.MEMBERS;
  const [sel, setSel] = React.useState(null);
  const drawerOpen = !!sel;
  const cols = [
    { field: 'name', headerName: 'Name', width: 360 },
    { field: 'status', headerName: <SortHeader label="Status" active dir="asc" />, width: 200, renderCell: (r) => <Pill label={r.status} tone="invited" /> },
    { field: 'team', headerName: 'Team(s)', width: 360, renderCell: (r) => <Pill label={r.team} tone="team" upper={false} /> },
    // The cards column falls outside the 524px drawer, exactly as in B1.
    ...(drawerOpen ? [] : [
      { field: 'cards', headerName: 'Cards', renderCell: (r) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          {r.cards.map((cw, i) => <CardThumb key={i} colourway={cw} scheme={window.ORG_SCHEME} />)}
        </span>
      ) },
    ]),
  ];
  return (
    <AppShell active={screen} onNavigate={onNavigate} title="Members"
      actions={<Button startIcon={<Icon name="User" size={18} />}>Invite member</Button>}
      drawer={sel && <MemberDetailDrawer member={sel} onClose={() => setSel(null)} />}>
      <Toolbar results="71 results" />
      <div style={{ borderTop: '1px solid var(--divider)' }}>
        <Table density="media" columns={cols} rows={rows} onRowClick={setSel} />
      </div>
    </AppShell>
  );
}

Object.assign(window, { MembersScreen });
