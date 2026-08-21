const { Button, Icon } = window.PliantDesignSystem_8f7377;

function AccountsScreen({ screen, onNavigate }) {
  return (
    <AppShell active={screen} onNavigate={onNavigate} title="Accounts"
      actions={<Button startIcon={<Icon name="Bank" size={18} />}>Create account</Button>}>
      <div style={{ paddingTop: 26, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
        <AccountCard name="Main account (GBP)" balance="-5,370 GBP" starred />
        <AccountCard name="USD Account (USD)" balance="0 USD" kebab />
      </div>
    </AppShell>
  );
}

Object.assign(window, { AccountsScreen });
