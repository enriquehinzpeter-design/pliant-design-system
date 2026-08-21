const { Button, Icon, Switch } = window.PliantDesignSystem_8f7377;

const TEAMS = [
  { name: 'CLDS - Bolivia Mission', managers: ['BM', 'DR', 'AT'], members: ['AA', 'AM', 'AT', 'BB', 'BH', 'CT', 'DR', 'PI', 'RA', 'TA', 'AA', 'AM', 'AT', 'BB', 'BH', 'CT', 'DR', 'PI'] },
  { name: 'CLDS - Brazil Mission', managers: ['BM', 'RA'], members: ['BB', 'BB', 'BB', 'AA', 'AM', 'AT', 'CT', 'DR'] },
  { name: 'CRP Sanity Team A', managers: ['CM'], members: ['CT'] },
  { name: 'empty', managers: ['DR'], members: ['BH'] },
  { name: 'pablo test in-16657-2', managers: ['AM'], members: ['PI', 'RA'] },
];

function TeamsScreen({ screen, onNavigate }) {
  const [dialog, setDialog] = React.useState(false);
  return (
    <AppShell active={screen} onNavigate={onNavigate} title="Teams"
      actions={<Button onClick={() => setDialog(true)} startIcon={<Icon name="UsersThree" size={18} />}>Create team</Button>}>
      <CreateTeamDialog open={dialog} onClose={() => setDialog(false)} />
      <Toolbar filter={false} download={false} results={null}
        trailing={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}><Switch /><span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', color: 'var(--text-primary)' }}>Deactivated teams</span></span>} />
      <div style={{ paddingTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 30 }}>
        {TEAMS.map((t) => <TeamCard key={t.name} {...t} />)}
      </div>
    </AppShell>
  );
}

Object.assign(window, { TeamsScreen });
