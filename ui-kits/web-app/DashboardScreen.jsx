const { Icon, Button, Typography, Divider, SummaryPanel, SummaryFigures, SummaryFigure,
  SummarySubValue, SummaryTotalRow, FlagLabel } = window.PliantDesignSystem_8f7377;
// The Customer View coverage block is newer than some served bundles, so it degrades to
// plain text rather than throwing an undefined element type and unmounting the tree.
const NS = window.PliantDesignSystem_8f7377 || {};
const SummaryCoverage = NS.SummaryCoverage || (({ spendLabel, spendValue }) => (
  <div style={{ marginTop: 8, textAlign: 'right', fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)' }}>{spendLabel}{spendValue ? ' ' + spendValue : ''}</div>
));
const SummaryCoverageNote = NS.SummaryCoverageNote || (({ children }) => (
  <span style={{ marginLeft: 12, fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)' }}>{children}</span>
));

// The panel shell, the hairline between figure groups, the single-row total and A1's
// tight vertical rhythm all live in the SummaryPanel pattern so every dashboard inherits them.
const Panel = SummaryPanel;
// True once the bundle carries SummaryPanel's note slot (shipped with the coverage block).
const SUPPORTS_PANEL_NOTE = !!NS.SummaryCoverage;

function MetricLabel({ children }) {
  return <div style={{ padding: '18px 20px 0', fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', letterSpacing: 'var(--body2-ls)', color: 'var(--text-primary)' }}>{children}</div>;
}

function DashboardScreen({ screen, onNavigate }) {
  const tx = window.TX.slice(0, 5);
  const [dialog, setDialog] = React.useState(null);
  // Under Customer View the ops-facing org detail replaces the two page actions with a
  // single Invite member button and the Financial Overview gains its coverage block
  // (INT-04). Nothing else about the screen changes.
  const cv = React.useContext(window.CustomerViewContext);
  return (
    <AppShell active={screen} onNavigate={onNavigate} title="Dashboard"
      actions={cv
        ? <Button variant="outlined" color="neutral" onClick={() => setDialog('invite')} startIcon={<Icon name="User" size={18} />}>Invite member</Button>
        : <>
        <Button variant="outlined" color="neutral" onClick={() => setDialog('invite')} startIcon={<Icon name="User" size={18} />}>Invite member</Button>
        <Button onClick={() => setDialog('request')} startIcon={<Icon name="VerticalCards" size={18} tint />}>Request card</Button>
      </>}>
      <InviteMemberDialog open={dialog === 'invite'} onClose={() => setDialog(null)} />
      <RequestCardDialog open={dialog === 'request'} onClose={() => setDialog(null)} />
      <div style={{ paddingTop: 20, display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 22, marginBottom: 22 }}>
        <Panel title="Financial Overview"
          note={cv && SUPPORTS_PANEL_NOTE ? 'Your remaining funds are expected to last for 29 days.' : undefined}
          action={cv
            ? <Button size="small">Top up account</Button>
            : <Button variant="outlined" color="neutral" size="small">View all accounts</Button>}>
          {cv ? (
            <div style={{ padding: '18px 20px 16px' }}>
              {!SUPPORTS_PANEL_NOTE && <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)', marginBottom: 8 }}>Your remaining funds are expected to last for 29 days.</div>}
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--overline2-size)', fontWeight: 'var(--overline2-weight)', letterSpacing: 'var(--overline2-ls)', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Available</div>
              <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 2 }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 28, lineHeight: '36px', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>$9,756,137</span>
                <SummaryCoverageNote icon={<Icon name="Info" size={14} />}>Coverage 98%</SummaryCoverageNote>
              </div>
              <SummaryCoverage percent={98} style={{ marginTop: 12 }}
                spendLabel="Exp. monthly spending" spendValue="$10,000,000"
                editIcon={<Icon name="PencilSimple" size={13} />} />
            </div>
          ) : (
          <SummaryFigures>
            <SummaryFigure label="Available" value="0 GBP" />
            <SummaryFigure label="Accounts">
              <div style={{ display: 'flex', gap: 24, marginTop: 3 }}>
                {[['GB', 'GBP', '0 GBP'], ['US', 'USD', '0 USD']].map(([cc, code, amt]) => (
                  <div key={code}>
                    <FlagLabel code={cc} label={code} gap={6}
                      style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', color: 'var(--text-primary)' }} />
                    <SummarySubValue>{amt}</SummarySubValue>
                  </div>
                ))}
              </div>
            </SummaryFigure>
          </SummaryFigures>
          )}
          <Divider />
          <SummaryTotalRow icon={<Icon name="HandCoins" size={22} />} label="Total cashback earned" value="0 GBP" />
        </Panel>
        <Panel>
          <MetricLabel># Members</MetricLabel>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '8px 20px 24px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 40, fontWeight: 400, lineHeight: '48px', color: 'var(--text-primary)' }}>57</span>
            <span style={{ padding: '5px 12px', borderRadius: 16, background: 'var(--primary-main)', color: 'var(--primary-contrast)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, letterSpacing: '0.16px' }}>Admin App: 25</span>
          </div>
        </Panel>
        <Panel>
          <MetricLabel># Cards</MetricLabel>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '4px 20px 20px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 40, fontWeight: 400, lineHeight: '48px', color: 'var(--text-primary)' }}>123</span>
            <div style={{ display: 'flex', gap: 14 }}>
              {[['sage', 78], ['gray', 22], ['sage', 12], ['black', 11]].map(([cw, n], i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <CardThumb colourway={cw} scheme={window.ORG_SCHEME} size={1.3} />
                  <div style={{ marginTop: 6, fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)' }}>{n}</div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
        <Panel title="Top Spenders by Card" style={{ minHeight: 320 }}>
          <div style={{ padding: '2px 20px 0' }}><Typography variant="caption" color="text.secondary">Last 90 days</Typography></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', color: 'var(--text-primary)', width: 16 }}>1.</span>
            <CardThumb colourway="lime" scheme={window.ORG_SCHEME} size={1.5} />
            <span style={{ width: 120 }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', color: 'var(--text-primary)' }}>Virtual</span>
              <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)' }}>7558</span>
            </span>
            <span style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', color: 'var(--text-primary)' }}>Barnabas Bartha</span>
            <span style={{ width: 100, height: 4, background: 'var(--primary-main)', borderRadius: 2 }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', fontVariantNumeric: 'tabular-nums', color: 'var(--text-primary)' }}>2 GBP</span>
          </div>
        </Panel>
        <Panel title="Last Transactions" action={<button onClick={() => onNavigate('all-transactions')} style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', letterSpacing: 'var(--body2-ls)', color: 'var(--text-primary)', textDecoration: 'underline' }}>see all</button>}>
          <div style={{ padding: '14px 20px 20px' }}>
            {tx.map((t) => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '9px 0' }}>
                <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
                  <CategoryIcon category={t.category} />
                  {t.flagged && <span style={{ position: 'absolute', right: -2, bottom: -2, width: 8, height: 8, borderRadius: '50%', background: 'var(--error-main)' }} />}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.merchant}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)' }}>{t.category}</span>
                </span>
                <span style={{ width: 150 }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', color: 'var(--text-primary)' }}>{t.member}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)' }}>{t.date}</span>
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', fontVariantNumeric: 'tabular-nums', color: t.status === 'DECLINED' ? 'var(--error-main)' : 'var(--text-primary)', textDecoration: t.status === 'DECLINED' ? 'line-through' : 'none' }}>{t.amount}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <p style={{ margin: '26px auto 0', maxWidth: 660, textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 11, lineHeight: '166%', letterSpacing: '0.4px', color: 'var(--text-secondary)' }}>
        Pliant cards are issued by Pliant Oy pursuant to license by VISA Europe Limited. Pliant Oy is licensed by the Finnish Financial Supervisory Authority as an Electronic Money Institution.
      </p>
    </AppShell>
  );
}

Object.assign(window, { DashboardScreen, Panel });
