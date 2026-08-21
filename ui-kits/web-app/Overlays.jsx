// Interaction layer: the dialogs and drawers reached from these screens (A2–A7).
// Every one of them is a thin composition over a design-system pattern —
// FormDialog, WizardDialog, FilterDrawer, RecordDrawer — so the kit stays a
// recreation and the reusable geometry lives in components/patterns/.
// Components are resolved lazily so a not-yet-recompiled bundle degrades instead of crashing.
const ns = () => window.PliantDesignSystem_8f7377 || {};

/* ---------- A2 · Invite a new member ---------- */
function InviteMemberDialog({ open, onClose }) {
  const { FormDialog, TextField, Select, RadioGroup } = ns();
  const [f, setF] = React.useState({ first: '', last: '', email: '', team: '', role: 'cardholder', issue: 'no' });
  if (!open || !FormDialog) return null;
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const valid = f.first && f.last && f.email;
  return (
    <FormDialog title="Invite a new member" confirmLabel="Send invite" confirmDisabled={!valid}
      onCancel={onClose} onConfirm={onClose}>
      <TextField label="First name" value={f.first} onChange={set('first')} />
      <TextField label="Last name" value={f.last} onChange={set('last')} />
      <TextField label="Email address" value={f.email} onChange={set('email')} />
      <Select label="Team" value={f.team} placeholder="" onChange={set('team')}
        options={['CLDS - Bolivia Mission', 'CLDS - Brazil Mission']} />
      <Select label="Member role" value={f.role} placeholder="" onChange={set('role')}
        options={[{ value: 'cardholder', label: 'Cardholder' }, { value: 'admin', label: 'Admin' }, { value: 'accountant', label: 'Accountant' }]}
        helperText={<span>Learn more about <a href="#" onClick={(e) => e.preventDefault()}>member roles</a></span>} />
      <div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, letterSpacing: '0.15px', color: 'var(--text-primary)' }}>Issue a card for the member?</div>
        <RadioGroup row value={f.issue} style={{ marginTop: 8 }} onChange={(v) => setF({ ...f, issue: v })}
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
      </div>
    </FormDialog>
  );
}

/* ---------- A3 · Request card, step 1 ---------- */
// Card types verbatim from the dev-environment screenshot, including its test rows.
const CARD_TYPES = [
  { label: 'CRP Sanity Template (harness 20260720)', colourway: 'gray' },
  { label: 'Pliant Virtual Virtual', colourway: 'gray' },
  { label: 'Pliant Virtual Travel default fee', colourway: 'gray' },
  { label: 'Pliant Virtual Single Use', colourway: 'gray' },
  { label: 'Pliant Physical Blue', colourway: 'black' },
];

function RequestCardDialog({ open, onClose }) {
  const { WizardDialog, SelectableOptionRow, CardIcon } = ns();
  const [pick, setPick] = React.useState(null);
  if (!open || !WizardDialog) return null;
  return (
    <WizardDialog title="Card type" prompt="Choose the card type" continueDisabled={!pick}
      steps={[{ label: 'Card type', helper: 'Select a card type to see the next steps.' }]}
      onCancel={onClose} onContinue={onClose}>
      {CARD_TYPES.map((t) => (
        <SelectableOptionRow key={t.label} label={t.label} name="card-type"
          selected={pick === t.label} onSelect={() => setPick(t.label)}
          leading={<CardIcon colourway={t.colourway} scheme={window.ORG_SCHEME} size="icon" height={36} singleUse={/Single Use/.test(t.label)} assetBase={ASSETS} />} />
      ))}
    </WizardDialog>
  );
}

/* ---------- A4 / A5 · Transactions filter ---------- */
const TX_FILTER_SECTIONS = [
  { title: 'Status', type: 'checkbox', options: ['PENDING', 'DECLINED', 'REVERSED', 'BOOKED'] },
  { title: 'Type', type: 'checkbox', options: ['PURCHASE', 'REFUND', 'CHARGEBACK', 'RECHARGE', 'CASH WITHDRAWAL', 'CARD CHECK'] },
  { title: 'Dates', type: 'field', placeholder: 'Dates' },
  { title: 'Export status', type: 'select', options: ['Not exported', 'Export queue', 'Exported'] },
  { title: 'Category', type: 'select', options: ['Travel & Accommodation', 'Computing & Software', 'Advertising & Marketing', 'Office Supplies & Equipment', 'Services'] },
  { title: 'Team', type: 'select', options: ['CLDS - Bolivia Mission', 'CLDS - Brazil Mission'] },
  { title: 'Review', type: 'select', options: ['Reviewed', 'Needs review'] },
  { title: 'Flag reason', type: 'select', options: ['Missing receipt', 'Wrong category', 'Private expense'] },
];

function TransactionFilterDrawer({ open, onClose }) {
  const { FilterDrawer } = ns();
  if (!open || !FilterDrawer) return null;
  return <FilterDrawer sections={TX_FILTER_SECTIONS} onClose={onClose} onApply={onClose} />;
}

/* ---------- A7 · Card detail ---------- */
function ContextChip({ icon, label }) {
  const { Icon } = ns();
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <Icon name={icon} size={18} color="var(--action-active)" />
      <span style={{ padding: '4px 12px', borderRadius: 16, background: 'var(--alert-neutral-fill)', fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.16px', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{label}</span>
    </span>
  );
}

function LimitRow({ label, value }) {
  const { RecordRow, Icon } = ns();
  return (
    <RecordRow
      label={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>{label}<Icon name="Info" size={14} color="var(--action-active)" /></span>}
      value={value} />
  );
}

function CardDetailDrawer({ card, onClose }) {
  const { RecordDrawer, RecordSectionLabel, StatusBadge, Alert, CardRender, Accordion, Button, IconButton, Icon, Typography } = ns();
  if (!card || !RecordDrawer) return null;
  const d = card.detail;
  return (
    <RecordDrawer onClose={onClose}
      actions={<IconButton size="small"><Icon name="FadersHorizontal" size={20} /></IconButton>}>
      <div style={{ padding: '6px 28px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 20, lineHeight: '28px', letterSpacing: '0.15px', color: 'var(--text-primary)' }}>{card.name} Card ({card.last4})</span>
          <StatusBadge label={card.statusLabel.toUpperCase()} color={card.status === 'pending' ? 'info' : 'default'} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 16, flexWrap: 'wrap' }}>
          <ContextChip icon="Bank" label={(d && d.account) || card.account} />
          {d && d.team && <ContextChip icon="UsersThree" label={d.team} />}
        </div>
        {d && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
            <Alert severity="info" style={{ paddingBottom: 12 }}>
              There's a pending request associated with this card.
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                <button style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 14, letterSpacing: '0.17px', color: 'inherit' }}>View card request</button>
              </div>
            </Alert>
            <Alert severity="info">Card needs to be activated by the cardholder using the last four digits of the card number.</Alert>
          </div>
        )}
        <RecordSectionLabel>Card details</RecordSectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '175px 1fr', gap: 16, alignItems: 'start' }}>
          <div style={{ position: 'relative' }}>
            <CardRender colourway={card.colourway} scheme={window.ORG_SCHEME} size="art" height={277} type={card.type || 'virtual'}
              label={card.name} cardholder={card.cardholder}
              maskedNumber={card.last4 && card.last4 !== '****' ? '**** **** **** ' + card.last4 : '**** **** **** ****'}
              expiry={card.validUntil && card.validUntil !== '-' ? card.validUntil : null} cvv="***" assetBase={ASSETS} />
            {card.status === 'pending' && (
              <span style={{ position: 'absolute', top: '46%', left: '50%', transform: 'translate(-50%,-50%)', width: 44, height: 44, borderRadius: '50%', background: 'var(--primary-main)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="Prohibit" size={22} color="var(--primary-contrast)" />
              </span>
            )}
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            {d ? (
              <>
                <LimitRow label="Default Limit" value={d.defaultLimit} />
                <LimitRow label="Transaction limit" value={d.transactionLimit} />
                <Button variant="outlined" color="neutral" disabled fullWidth
                  startIcon={<Icon name="ArrowsClockwise" size={18} />}>Change limits</Button>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">Limits for this card are not captured in the reference screenshots.</Typography>
            )}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 28, borderTop: '1px solid var(--divider)' }}>
        <Accordion title="Card history">
          <Typography variant="body2" color="text.secondary">Not captured — the history list is below the screenshot fold.</Typography>
        </Accordion>
      </div>
    </RecordDrawer>
  );
}

/* ---------- B1 · Member detail ---------- */
function MemberDetailDrawer({ member, onClose }) {
  const { RecordDrawer, RecordTitle, RecordSectionLabel, ContactRow, TagChip, MiniCardTile,
    StatusBadge, Alert, CardIcon, IconButton, Icon, Typography } = ns();
  if (!member || !RecordDrawer) return null;
  const d = member.detail;
  return (
    <RecordDrawer onClose={onClose}
      actions={<IconButton size="small"><Icon name="FadersHorizontal" size={20} /></IconButton>}>
      <div style={{ padding: '6px 28px 0' }}>
        {/* B1 puts the badge on its own line under the name; A7's card drawer keeps it inline. */}
        <RecordTitle title={member.name} badgePlacement="below"
          badge={<StatusBadge label={member.status.toUpperCase()} color="info" />} />
        {d && (
          <div style={{ marginTop: 26 }}>
            <Alert severity="info" title="Invite sent">
              An invite with a registration link has been sent to this email address.
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                <button style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 14, letterSpacing: '0.17px', color: 'inherit' }}>Resend invite.</button>
              </div>
            </Alert>
          </div>
        )}
        <RecordSectionLabel>Contact details</RecordSectionLabel>
        <div style={{ padding: '8px 0 22px', borderBottom: '1px solid var(--divider)' }}>
          <ContactRow icon={<Icon name="Envelope" size={22} />} label="E-Mail"
            value={d ? d.email : 'Not captured'} />
        </div>
        <RecordSectionLabel>Teams</RecordSectionLabel>
        <div style={{ padding: '4px 0 22px', borderBottom: '1px solid var(--divider)', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <TagChip label={member.team} />
        </div>
        <RecordSectionLabel>Cards</RecordSectionLabel>
        <div style={{ paddingBottom: 22, borderBottom: '1px solid var(--divider)', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {(d ? d.cards : []).map((c, i) => (
            <MiniCardTile key={i} name={c.name} masked="****" available={0} limit={c.limit}
              leading={<CardIcon colourway={c.colourway} scheme={window.ORG_SCHEME} assetBase={ASSETS} />} />
          ))}
        </div>
        <RecordSectionLabel>Last transactions</RecordSectionLabel>
        <Typography variant="body1" color="text.primary" style={{ padding: '6px 0 32px' }}>No transactions available yet.</Typography>
      </div>
    </RecordDrawer>
  );
}

/* ---------- B2 · Create a new team ---------- */
function CreateTeamDialog({ open, onClose }) {
  const { FormDialog, TextField, Switch, Icon } = ns();
  const [f, setF] = React.useState({ name: '', cost: '', review: true });
  if (!open || !FormDialog) return null;
  return (
    <FormDialog title="Create a new team" confirmLabel="Save" confirmDisabled={!f.name}
      onCancel={onClose} onConfirm={onClose}>
      <TextField label="Team Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      <TextField label="Cost Centre" value={f.cost} onChange={(e) => setF({ ...f, cost: e.target.value })} />
      {/* In a dialog the switch leads its label — the settings-page rule is reversed. */}
      <Switch checked={f.review} onChange={(e) => setF({ ...f, review: e.target.checked })}
        label={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>Transaction review<Icon name="Info" size={15} color="var(--action-active)" /></span>} />
    </FormDialog>
  );
}

/* ---------- B3 · Accounts kebab ---------- */
function AccountKebabMenu() {
  const { MenuContainer, IconButton, Icon } = ns();
  if (!MenuContainer) return null;
  return (
    <MenuContainer minWidth={0}
      button={<IconButton size="small"><Icon name="DotsThreeOutlineVertical" size={16} /></IconButton>}
      items={[{ label: 'Rename', icon: <Icon name="PencilSimple" size={17} /> }]} />
  );
}

/* ---------- B4 · Top up your account ---------- */
const TOP_UP_ROWS = [
  { label: 'Beneficiary', value: 'Aetna' },
  { label: 'Account number', value: '24001841' },
  { label: 'Sort code', value: '60-83-82' },
  { label: 'Bank', value: 'Deutsche Bank' },
  { label: 'Reference', value: 'Pliant Top Up', last: true },
];

function TopUpDialog({ open, onClose }) {
  const { CopyRowsDialog, Select } = ns();
  const [tab, setTab] = React.useState(0);
  if (!open || !CopyRowsDialog) return null;
  return (
    <CopyRowsDialog title="Top up your account" onDone={onClose}
      description={<>
        <div>You can top-up money using the instructions and bank data below:</div>
        <ul style={{ margin: '6px 0 0', paddingLeft: 22 }}>
          <li>The amount needs to be sent from <b style={{ fontWeight: 500 }}>your company bank account</b>, which has the same name as your organization.</li>
          <li>Please don't send any money from non-bank accounts, such as PayPal.</li>
        </ul>
        <div style={{ marginTop: 12 }}>If we cannot match the incoming payment correctly, the transfer will be reversed.</div>
      </>}
      select={<Select label="Card account" value="main" placeholder=""
        options={[{ value: 'main', label: 'Main account (GBP)' }, { value: 'usd', label: 'USD Account (USD)' }]} />}
      tabs={[{ label: 'Local transfers', info: true }, { label: 'SWIFT transfers', info: true }]}
      activeTab={tab} onTabChange={setTab}
      sectionLabel="Via bank transfer" onCopyAll={() => {}}
      rows={tab === 0 ? TOP_UP_ROWS : []}
      children={tab === 1 ? <div style={{ padding: '18px 0 8px', fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', color: 'var(--text-secondary)' }}>Not captured — the SWIFT tab is not in the reference screenshot.</div> : null} />
  );
}

/* ---------- D1 · notifications popover ---------- */
function NotificationsBell() {
  const { PopoverPanel, EmptyBlock, IconButton, Icon } = ns();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  if (!PopoverPanel) return null;
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <IconButton size="small" selected={open} onClick={() => setOpen(!open)}><Icon name="Bell" size={20} /></IconButton>
      <PopoverPanel open={open}>
        <EmptyBlock pad={38} icon={<Icon name="Bell" size={22} />} message="No notifications so far" />
      </PopoverPanel>
    </span>
  );
}

/* ---------- D2 · Receipt Inbox workspace modal ---------- */
const INBOX_TABS = ['Unmatched', 'Matched', 'Trash'];
const INBOX_EMPTY = ['No unmatched receipts.', 'Not captured — the Matched tab is not in the reference screenshot.', 'Not captured — the Trash tab is not in the reference screenshot.'];

function ReceiptInboxModal({ open, onClose }) {
  const { WorkspaceModal, ViewToggle, EmptyBlock, TextField, Icon } = ns();
  const [tab, setTab] = React.useState(0);
  const [view, setView] = React.useState('grid');
  if (!open || !WorkspaceModal) return null;
  return (
    <WorkspaceModal open title="Receipt Inbox" tabs={INBOX_TABS} activeTab={tab} onTabChange={setTab} onClose={onClose}
      meta={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', color: 'var(--text-secondary)' }}>
        Inbox address: <b style={{ fontWeight: 500, color: 'var(--text-primary)' }}>aetna-gbpref0721dd2b@receipts.dev.infinnitytest.com</b>
        <button aria-label="Copy inbox address" style={{ display: 'inline-flex', border: 0, background: 'none', padding: 0, cursor: 'pointer', color: 'var(--action-active)' }}><Icon name="Copy" size={18} /></button>
      </span>}
      toolbar={<div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0' }}>
        <TextField placeholder="Search" fullWidth={false} style={{ width: 192 }} startAdornment={<Icon name="MagnifyingGlass" size={18} />} inputStyle={{ fontSize: 14 }} />
        <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: 0, background: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 14, letterSpacing: '0.17px', color: 'var(--text-disabled)' }}><Icon name="FadersHorizontal" size={18} />Filter</button>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.17px', color: 'var(--text-secondary)' }}>0 results</span>
        <span style={{ marginLeft: 'auto' }}><ViewToggle value={view} onChange={setView} /></span>
      </div>}>
      <EmptyBlock pad={140} icon={<Icon name="XCircle" size={26} />} message={INBOX_EMPTY[tab]} />
    </WorkspaceModal>
  );
}

Object.assign(window, { InviteMemberDialog, RequestCardDialog, TransactionFilterDrawer, CardDetailDrawer,
  MemberDetailDrawer, CreateTeamDialog, AccountKebabMenu, TopUpDialog, NotificationsBell, ReceiptInboxModal,
  TX_FILTER_SECTIONS, CARD_TYPES, TOP_UP_ROWS });
