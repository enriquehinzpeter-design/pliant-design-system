const { Icon, Typography } = window.PliantDesignSystem_8f7377;

// C6 — Rewards > Card Benefits.
const BENEFITS = [
  { label: 'Cashback', details: <>You can earn attractive cashback on every transaction made with Pliant cards. <a href="#" onClick={(e) => e.preventDefault()}>See details</a>.</> },
  { label: 'Hotel & merchant discounts', details: <>Benefit from attractive partner deals across various categories, including hotel bookings, office equipment, and electronics. More information <a href="#" onClick={(e) => e.preventDefault()}>here</a>.</> },
  { label: 'Worldwide emergency card replacement and cash disbursement service', details: <>As a Pliant customer you are eligible to use Visa's Global Customer Assistance Services. Visa GCAS offers a worldwide support network that can give cardholders quick, reliable access to emergency services - 24 hours a day. More details <a href="#" onClick={(e) => e.preventDefault()}>here</a>.</> },
];

function CardBenefitsTab() {
  const NS = window.PliantDesignSystem_8f7377 || {};
  const { ComparisonTable, CardIcon } = NS;
  if (!ComparisonTable) return null;
  return (
    <div style={{ paddingTop: 30 }}>
      <Typography variant="h6" style={{ fontWeight: 400 }}>Card Benefits</Typography>
      <Typography variant="body1" style={{ marginTop: 12 }}>Find out about the available benefits for the different types of cards.</Typography>
      <ComparisonTable style={{ marginTop: 34 }}
        mark={<Icon name="CheckCircle" size={22} color="var(--success-main)" />}
        columns={[{
          art: <span style={{ display: 'inline-flex', gap: 6 }}>
            <CardIcon colourway="black" scheme={window.ORG_SCHEME} assetBase={ASSETS} />
            <CardIcon colourway="sage" scheme={window.ORG_SCHEME} assetBase={ASSETS} />
          </span>,
          label: 'Standard physical card / Virtual card', sublabel: 'Visa Platinum Business',
        }]}
        rows={BENEFITS.map((b) => ({ label: b.label, marks: [true], details: b.details }))} />
    </div>
  );
}

function RewardsScreen({ screen, onNavigate }) {
  const [tab, setTab] = React.useState('cashback');
  return (
    <AppShell active={screen} onNavigate={onNavigate} title="Rewards" contentWidth={tab === 'cashback' ? 'capped' : 'full'}
      tabs={<UnderlineTabs value={tab} onChange={setTab} tabs={[{ value: 'cashback', label: 'Cashback' }, { value: 'benefits', label: 'Card Benefits' }]} />}>
      {tab !== 'cashback' ? <CardBenefitsTab /> : (
        <div style={{ paddingTop: 30 }}>
          <Typography variant="h6">Cashback</Typography>
          <Typography variant="body2" color="text.secondary" style={{ marginTop: 8 }}>Automatically up to 0.40%* cashback on all spending categories and providers.</Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 30 }}>
            <span style={{ flex: 1, height: 5, background: 'var(--action-disabled-bg)', borderRadius: 3 }} />
            <span style={{ padding: '4px 9px', borderRadius: 6, background: 'var(--alert-neutral-fill)', color: 'var(--text-primary)', fontSize: 'var(--overline2-size)', fontWeight: 500, letterSpacing: 'var(--overline2-ls)', lineHeight: '14px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Start earning</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginTop: 14 }}>
            <span>
              <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 20, letterSpacing: 0, color: 'var(--text-primary)' }}>0 GBP</span>
              <span style={{ display: 'block', marginTop: 2, fontSize: 'var(--caption-size)', letterSpacing: 'var(--caption-ls)', color: 'var(--text-secondary)' }}>Transaction volume in August</span>
            </span>
            <span style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 20, letterSpacing: 0, color: 'var(--text-primary)' }}>750,000 GBP</span>
              <span style={{ display: 'block', marginTop: 2, fontSize: 'var(--caption-size)', letterSpacing: 'var(--caption-ls)', color: 'var(--text-secondary)' }}>Left to activate cashback</span>
            </span>
          </div>
          <div style={{ marginTop: 30 }}><CurrencySelect country="GB" label="Great British Pound" /></div>
          <div style={{ marginTop: 26, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
            <StatTile icon="PiggyBank" value="0 GBP" label="Total cashback earned" />
            <StatTile icon="ArrowLineDown" value="0 GBP" label="Total redeemed" trailing="CalendarBlank" />
            <StatTile icon="HourglassHigh" value="0 GBP" label="Pending" info />
            <StatTile icon="CheckCircle" value="0.00 GBP" label="Redeemable cashback" info trailing="ArrowRight" />
          </div>
          <p style={{ margin: '22px 0 0', fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', letterSpacing: 'var(--caption-ls)', color: 'var(--text-secondary)' }}>
            * Pliant will apply a cashback rate of 0.40% to transactions in EUR across most categories. <a href="#" style={{ color: 'var(--text-primary)' }}>view more</a>
          </p>
          <Typography variant="h6" style={{ marginTop: 40 }}>Most Popular Providers</Typography>
        </div>
      )}
    </AppShell>
  );
}

Object.assign(window, { RewardsScreen, BENEFITS });
