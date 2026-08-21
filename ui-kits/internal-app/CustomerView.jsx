const { Icon, Button } = window.PliantDesignSystem_8f7377;
const CustomerViewContext = window.CustomerViewContext;

/**
 * The blue banner that marks Customer View: label + info icon on the left, the exit
 * button beside it. Spans the full window ABOVE the external app's own rail and top bar.
 */
function CustomerViewBanner({ orgName, onExit }) {
  return (
    <div style={{
      flexShrink: 0, display: 'flex', alignItems: 'center', gap: 16, padding: '10px 20px',
      background: 'var(--alert-info-fill)', color: 'var(--alert-info-content)',
    }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-sans)', fontSize: 15, letterSpacing: '0.15px' }}>
        <Icon name="Info" size={20} />Customer View
      </span>
      <Button variant="outlined" size="small" onClick={onExit}>Back to Organization Overview</Button>
      {orgName && <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', opacity: 0.8 }}>{orgName}</span>}
    </div>
  );
}

/**
 * The INTERNAL nav section the external tree gains inside Customer View. Four
 * destinations, verified against the routes:
 *   /credit-and-compliance/credit|compliance  (tabs Profile / Q&A / Assessment)
 *   /settlements · /processing-account · /terms/general
 */
function internalNavSection() {
  return [
    { section: 'Internal' },
    { label: 'Credit & Compliance', value: 'credit-compliance', icon: <Icon name="ChartLineUp" /> },
    { label: 'Organization Settlements', value: 'org-settlements', icon: <Icon name="Sliders" /> },
    { label: 'Processing Account', value: 'processing-account', icon: <Icon name="Bank" /> },
    { label: 'Terms', value: 'terms-general', icon: <Icon name="FileText" /> },
  ];
}

/**
 * Customer View also shows a greyed "Onboarding" item ABOVE Dashboard — a destination
 * this organisation has already passed, inert rather than hidden.
 */
function onboardingNavItem() {
  return [{ label: 'Onboarding', value: 'onboarding', icon: <Icon name="RocketLaunch" />, disabled: true }];
}

// The org-detail internal screens, each rendered inside the banner by the same wrapper.
const INTERNAL_SCREENS = {
  'credit-compliance': 'CreditComplianceScreen',
  'org-settlements': 'OrgSettlementsScreen',
  'processing-account': 'ProcessingAccountScreen',
  'terms-general': 'TermsGeneralScreen',
};

/**
 * Customer View renders the ENTIRE external app for one organisation. It is the same
 * screens, the same light rail — the only additions are the banner and the INTERNAL
 * nav section, both supplied through CustomerViewContext so no external screen changes.
 */
function CustomerView({ org, onExit }) {
  const [screen, setScreen] = React.useState('dashboard');
  const ctx = React.useMemo(() => ({
    banner: <CustomerViewBanner onExit={onExit} />,
    navPrepend: onboardingNavItem(),
    extraNav: internalNavSection(),
    orgName: org ? org.name : 'Organization',
    orgInitial: '1',
  }), [org, onExit]);
  const nav = (s) => setScreen(s);
  const internal = INTERNAL_SCREENS[screen];
  if (internal && window[internal]) {
    const S = window[internal];
    return (
      <CustomerViewContext.Provider value={ctx}>
        <S screen={screen} onNavigate={nav} />
      </CustomerViewContext.Provider>
    );
  }
  const TX = ['my-transactions', 'all-transactions', 'needs-review', 'flagged'];
  const body = TX.indexOf(screen) !== -1
    ? <TransactionsScreen screen={screen} onNavigate={nav} />
    : (() => {
        const name = EXT_SCREENS[screen];
        if (name && window[name]) { const S = window[name]; return <S screen={screen} onNavigate={nav} />; }
        return <PlaceholderScreen screen={screen} title={screen} onNavigate={nav} />;
      })();
  return <CustomerViewContext.Provider value={ctx}>{body}</CustomerViewContext.Provider>;
}

Object.assign(window, { CustomerView, CustomerViewBanner, internalNavSection, onboardingNavItem });
