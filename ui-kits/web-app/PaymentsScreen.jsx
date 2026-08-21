const { Button, Icon } = window.PliantDesignSystem_8f7377;

function PaymentsScreen({ screen, onNavigate }) {
  const [topUp, setTopUp] = React.useState(false);
  return (
    <AppShell active={screen} onNavigate={onNavigate} title="Payments"
      actions={<>
        <Button variant="text" color="neutral" disabled startIcon={<Icon name="ArrowLineUp" size={18} />}>Withdraw</Button>
        <Button onClick={() => setTopUp(true)} startIcon={<Icon name="ArrowLineDown" size={18} />}>Top up account</Button>
      </>}>
      <TopUpDialog open={topUp} onClose={() => setTopUp(false)} />
      <EmptyState message="No data available yet." />
    </AppShell>
  );
}

Object.assign(window, { PaymentsScreen });
