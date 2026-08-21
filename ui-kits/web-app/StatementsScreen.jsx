const { Icon, Button, Select } = window.PliantDesignSystem_8f7377;

// Transcribed from C8 (Billing > Statements, Main account (GBP)).
const STATEMENTS = [
  { month: 'August 2026', ongoing: true, start: '-2.00 GBP', tx: '+0.00 GBP', pay: '+0.00 GBP', close: '-2.00 GBP' },
  { month: 'July 2026', range: '01 Jul - 31 Jul', start: '-2.00 GBP', tx: '+0.00 GBP', pay: '+0.00 GBP', close: '-2.00 GBP' },
  { month: 'June 2026', range: '01 Jun - 30 Jun', start: '0.00 GBP', tx: '-2.00 GBP', pay: '+0.00 GBP', close: '-2.00 GBP' },
  { month: 'May 2026', range: '01 May - 31 May', start: '0.00 GBP', tx: '+0.00 GBP', pay: '+0.00 GBP', close: '0.00 GBP' },
  { month: 'April 2026', range: '01 Apr - 30 Apr', start: '0.00 GBP', tx: '+0.00 GBP', pay: '+0.00 GBP', close: '0.00 GBP' },
  { month: 'March 2026', range: '01 Mar - 31 Mar', start: '0.00 GBP', tx: '+0.00 GBP', pay: '+0.00 GBP', close: '0.00 GBP' },
  { month: 'February 2026', range: '01 Feb - 28 Feb', start: '0.00 GBP', tx: '+0.00 GBP', pay: '+0.00 GBP', close: '0.00 GBP' },
];

function StatementsScreen({ screen, onNavigate }) {
  const { StatementRow, StatusToken } = window.PliantDesignSystem_8f7377;
  return (
    <AppShell active={screen} onNavigate={onNavigate} title="Statements">
      <div style={{ paddingTop: 24, maxWidth: 220 }}>
        <Select value="main" placeholder="" options={[{ value: 'main', label: 'Main account (GBP)' }, { value: 'usd', label: 'USD Account (USD)' }]} />
      </div>
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {StatementRow && STATEMENTS.map((s) => (
          <StatementRow key={s.month} title={s.month}
            icon={<Icon name="FileText" size={20} />}
            status={s.ongoing ? <StatusToken label="Ongoing" color="var(--info-main)" style={{ display: 'block', marginTop: 3 }} /> : null}
            subtitle={s.range}
            stats={[{ value: s.start, label: 'Starting Balance' }, { value: s.tx, label: 'Total Transactions' }, { value: s.pay, label: 'Total Payments' }]}
            arrow={<Icon name="ArrowRight" size={18} />}
            balance={{ value: s.close, label: s.ongoing ? 'Current Balance' : 'Closing Balance' }}
            download={<Button size="small" startIcon={<Icon name="DownloadSimple" size={16} />}>Download</Button>} />
        ))}
      </div>
    </AppShell>
  );
}

Object.assign(window, { StatementsScreen, STATEMENTS });
