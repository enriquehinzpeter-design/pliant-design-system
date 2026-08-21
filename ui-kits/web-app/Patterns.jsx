const { Icon, IconButton, Button, Typography, Switch, Avatar } = window.PliantDesignSystem_8f7377;

/* ---------- status pills ---------- */
// Observed tints differ per surface: the Wallet grid tints REQUESTED red,
// the Cards table tints it neutral grey. Both are reproduced verbatim.
const STATE_PILL = {
  requested: ['var(--alert-error-fill)', 'var(--alert-error-content)'],
  'requested-neutral': ['var(--alert-neutral-fill)', 'var(--alert-neutral-content)'],
  pending: ['var(--alert-info-fill)', 'var(--alert-info-content)'],
  active: ['var(--alert-success-fill)', 'var(--alert-success-content)'],
  terminated: ['var(--alert-warning-fill)', 'var(--warning-main)'],
};

function StatePill({ label, tone = 'pending' }) {
  const [bg, fg] = STATE_PILL[tone] || STATE_PILL.pending;
  return <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: 6, background: bg, color: fg, fontSize: 'var(--overline2-size)', fontWeight: 500, letterSpacing: 'var(--overline2-ls)', lineHeight: '14px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>;
}

// Solid badge used on module and data-field cards.
function SolidBadge({ label = 'Active' }) {
  return <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: 4, background: 'var(--success-dark)', color: '#fff', fontSize: 'var(--overline2-size)', fontWeight: 500, letterSpacing: 'var(--overline2-ls)', lineHeight: '14px', textTransform: 'uppercase' }}>{label}</span>;
}

/* ---------- 08 Wallet ---------- */
function WalletCard({ name, last4, colourway, scheme, state, stateLabel, usage, spent, limit, onClick }) {
  return (
    <div onClick={onClick} style={{ border: '1px solid var(--divider)', borderRadius: 'var(--radius)', padding: 20, minHeight: 200, display: 'flex', flexDirection: 'column', cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <CardThumb colourway={colourway} scheme={scheme} size={1.3} />
          <span>
            <span style={{ display: 'block', fontSize: 15, letterSpacing: '0.15px', color: 'var(--text-primary)' }}>{name}</span>
            <span style={{ display: 'block', fontSize: 'var(--caption-size)', color: 'var(--text-secondary)' }}>{last4}</span>
          </span>
        </span>
        <StatePill label={stateLabel} tone={state} />
      </div>
      <div style={{ marginTop: 'auto' }}>
        {spent !== undefined ? (
          <>
            <div style={{ fontSize: 13, letterSpacing: '0.16px', fontVariantNumeric: 'tabular-nums' }}>
              <span style={{ color: 'var(--text-primary)' }}>{spent}</span>
              <span style={{ color: 'var(--text-secondary)' }}> / {limit}</span>
            </div>
            <div style={{ height: 3, marginTop: 8, background: 'var(--action-disabled-bg)', borderRadius: 2 }}>
              <div style={{ height: 3, width: '100%', background: 'var(--primary-main)', borderRadius: 2 }} />
            </div>
          </>
        ) : (
          <div style={{ fontSize: 13, letterSpacing: '0.16px', color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{usage}</div>
        )}
      </div>
    </div>
  );
}

function GhostTile({ label = 'Request card', onClick }) {
  return (
    <button onClick={onClick} style={{ border: 0, background: 'var(--surface-contrast)', borderRadius: 'var(--radius)', minHeight: 200, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontFamily: 'var(--font-sans)', fontSize: 15, letterSpacing: '0.15px', color: 'var(--text-primary)' }}>
      <Icon name="Plus" size={20} />{label}
    </button>
  );
}

/* ---------- 09 Accounts ---------- */
function CircleAction({ icon, filled, disabled }) {
  return (
    <span style={{ width: 26, height: 26, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: filled ? 'var(--primary-main)' : 'transparent', border: filled ? 0 : '1px solid var(--divider)', color: filled ? 'var(--primary-contrast)' : disabled ? 'var(--action-disabled)' : 'var(--action-active)' }}>
      <Icon name={icon} size={14} />
    </span>
  );
}

function AccountCard({ name, balance, starred, kebab }) {
  return (
    <div style={{ border: '1px solid var(--divider)', borderRadius: 'var(--radius)', padding: 20, minHeight: 205, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 15, letterSpacing: '0.15px', color: 'var(--text-primary)' }}>{name}</span>
          {starred && <Icon name="Star" size={16} color="var(--action-active)" />}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <CircleAction icon="ArrowLineDown" filled />
          <CircleAction icon="ArrowLineUp" disabled />
          <CircleAction icon="ArrowLineRight" disabled />
          {kebab && <AccountKebabMenu />}
        </span>
      </div>
      <div style={{ marginTop: 40, fontSize: 24, letterSpacing: 0, lineHeight: '32px', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{balance}</div>
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="outlined" color="neutral" size="small">View transactions</Button>
      </div>
    </div>
  );
}

/* ---------- 10 two-line table header ---------- */
function TwoLineHeader({ primary, secondary }) {
  return (
    <span style={{ display: 'block' }}>
      <span style={{ display: 'block' }}>{primary}</span>
      {secondary && <span style={{ display: 'block', marginTop: 1, fontSize: 9, fontWeight: 400, letterSpacing: '0.17px', color: 'var(--text-secondary)' }}>{secondary}</span>}
    </span>
  );
}

/* ---------- 12 Rewards ---------- */
function StatTile({ icon, value, label, info, trailing }) {
  return (
    <div style={{ border: '1px solid var(--divider)', borderRadius: 'var(--radius)', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--divider)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={icon} size={17} />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 18, letterSpacing: 0, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
          {value}{info && <Icon name="Info" size={13} color="var(--action-active)" />}
        </span>
        <span style={{ display: 'block', marginTop: 2, fontSize: 'var(--caption-size)', letterSpacing: 'var(--caption-ls)', color: 'var(--text-secondary)' }}>{label}</span>
      </span>
      {trailing && <Icon name={trailing} size={17} color="var(--action-active)" />}
    </div>
  );
}

function CurrencySelect({ country, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 12px', border: '1px solid var(--input-border)', borderRadius: 'var(--radius)', width: 192, cursor: 'pointer' }}>
      <span style={{ display: 'inline-flex' }}>{(window.PliantDesignSystem_8f7377 || {}).Flag ? React.createElement(window.PliantDesignSystem_8f7377.Flag, { code: country, size: 20 }) : null}</span>
      <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 'var(--body2-size)', color: 'var(--text-primary)' }}>{label}</span>
      <Icon name="CaretDown" size={14} color="var(--action-active)" />
    </span>
  );
}

/* ---------- 15 Policies ---------- */
function ConditionChip({ label, icon = 'UsersThree' }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 9px', borderRadius: 6, background: 'var(--alert-neutral-fill)', fontSize: 'var(--body2-size)', letterSpacing: 'var(--body2-ls)', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
      <Icon name={icon} size={14} color="var(--action-active)" />{label}
    </span>
  );
}

function AmountPill({ label }) {
  return <span style={{ display: 'inline-block', padding: '3px 9px', borderRadius: 4, background: 'var(--alert-info-fill)', color: 'var(--text-primary)', fontSize: 11, letterSpacing: '0.17px', lineHeight: '16px', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{label}</span>;
}

function RoleChip({ label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 9px', borderRadius: 6, background: 'var(--alert-neutral-fill)', fontSize: 'var(--body2-size)', letterSpacing: 'var(--body2-ls)', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
      <Icon name="At" size={13} color="var(--action-active)" />{label}
    </span>
  );
}

function InitialChip({ label, dark }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 26, height: 22, padding: '0 6px', borderRadius: 6, background: dark ? 'var(--primary-main)' : 'var(--alert-neutral-fill)', color: dark ? '#fff' : 'var(--text-primary)', fontSize: 11, fontWeight: 500, letterSpacing: '0.17px' }}>{label}</span>;
}

function ApproverRow({ threshold, auto, chain = [] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', padding: '4px 0' }}>
      <AmountPill label={threshold} />
      {auto && <Icon name="Checks" size={17} color="var(--action-active)" />}
      {chain.map((step, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Icon name="ArrowRight" size={15} color="var(--action-active)" />}
          {step.map((node, j) => node.role ? <RoleChip key={j} label={node.role} /> : <InitialChip key={j} label={node.initials} dark={node.dark} />)}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ---------- 16 / 17 cards ---------- */
function ModuleCard({ preview, title, description, active }) {
  return (
    <div style={{ border: '1px solid var(--divider)', borderRadius: 'var(--radius)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 130, background: 'var(--surface-contrast)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>{preview}</div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <Typography variant="subtitle1" style={{ fontSize: 17, lineHeight: '24px' }}>{title}</Typography>
        <Typography variant="body2" color="text.secondary" style={{ flex: 1 }}>{description}</Typography>
        {active && <span><SolidBadge /></span>}
      </div>
    </div>
  );
}

function IntegrationCard({ logo, name, description, capabilities = [] }) {
  return (
    <div style={{ border: '1px solid var(--divider)', borderRadius: 'var(--radius)', padding: 20, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 155 }}>
      {logo}
      <Typography variant="subtitle1" style={{ fontSize: 17, lineHeight: '24px' }}>{name}</Typography>
      <Typography variant="body2" color="text.secondary" style={{ flex: 1 }}>{description}</Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
        {capabilities.map((c) => (
          <span key={c} style={{ padding: '4px 10px', borderRadius: 6, background: 'var(--alert-neutral-fill)', fontSize: 13, letterSpacing: '0.16px', color: 'var(--text-primary)' }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

// Data-field card from Settings > Accounting.
function DataFieldCard({ icon, title, description, trailingIcon, trailingCustom, active }) {
  return (
    <div style={{ border: '1px solid var(--divider)', borderRadius: 'var(--radius)', padding: 20, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 152 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <span style={{ width: 54, height: 54, borderRadius: '50%', border: '1px solid var(--divider)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name={icon} size={26} />
        </span>
        {active && <SolidBadge />}
      </div>
      <Typography variant="subtitle1" style={{ fontSize: 17, lineHeight: '24px' }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary" style={{ flex: 1 }}>{description}</Typography>
      {trailingIcon && <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Icon name={trailingIcon} assetBase={trailingCustom ? ASSETS : undefined} size={20} color="var(--action-active)" /></div>}
    </div>
  );
}

/* ---------- 18 Teams ---------- */
function AvatarStack({ people = [], dark, max = 3 }) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {shown.map((p, i) => (
        <span key={i} style={{ width: 24, height: 24, borderRadius: '50%', marginLeft: i ? -7 : 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: dark ? 'var(--primary-main)' : 'var(--alert-neutral-fill)', color: dark ? '#fff' : 'var(--text-secondary)', fontSize: 9, fontWeight: 500, boxShadow: '0 0 0 2px var(--surface-card)' }}>{p}</span>
      ))}
      {extra > 0 && <span style={{ width: 24, height: 24, borderRadius: '50%', marginLeft: -7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: dark ? 'var(--primary-light)' : 'var(--alert-neutral-fill)', color: dark ? '#fff' : 'var(--text-secondary)', fontSize: 9, fontWeight: 500, boxShadow: '0 0 0 2px var(--surface-card)' }}>{'+' + extra}</span>}
    </span>
  );
}

function TeamCard({ name, managers, members }) {
  return (
    <div style={{ border: '1px solid var(--divider)', borderRadius: 'var(--radius)', display: 'flex', flexDirection: 'column', minHeight: 200 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 20px' }}>
        <Typography variant="subtitle1" style={{ fontSize: 17, lineHeight: '24px' }}>{name}</Typography>
        <IconButton size="small"><Icon name="Gear" size={18} /></IconButton>
      </div>
      <div style={{ borderTop: '1px solid var(--divider)', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 28 }}>
        {[['Managers', managers, true], ['Members', members, false]].map(([label, list, dark]) => (
          <span key={label} style={{ minWidth: 96 }}>
            <span style={{ display: 'block', fontSize: 13, letterSpacing: '0.16px', color: 'var(--text-primary)' }}>
              <b style={{ fontWeight: 500 }}>{label}</b> <span style={{ color: 'var(--text-secondary)' }}>({list.length})</span>
            </span>
            <span style={{ display: 'block', marginTop: 8 }}><AvatarStack people={list} dark={dark} /></span>
          </span>
        ))}
        <span style={{ marginLeft: 'auto' }}><Icon name="ThumbsUp" size={19} color="var(--action-active)" /></span>
      </div>
    </div>
  );
}

/* ---------- 13 Merchants ---------- */
function LetterAvatar({ letter }) {
  return <span style={{ width: 28, height: 28, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'var(--surface-card)', color: 'var(--text-secondary)', fontSize: 14 }}>{letter}</span>;
}

// Flags are ALWAYS the SVG flag-library component — never an emoji flag.
function CountryCell({ code }) {
  const { FlagLabel } = window.PliantDesignSystem_8f7377 || {};
  if (!FlagLabel) return null;
  return <FlagLabel code={code} label={code} size={20} gap={10}
    style={{ fontSize: 'var(--body2-size)', color: 'var(--text-primary)' }} />;
}

/* ---------- shared section heading ---------- */
function SectionHeading({ children, action, editable }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
      <Typography variant="h6">{children}</Typography>
      {editable && <IconButton size="small"><Icon name="PencilSimple" size={18} /></IconButton>}
      {action && <span style={{ marginLeft: 'auto' }}>{action}</span>}
    </div>
  );
}

Object.assign(window, { StatePill, SolidBadge, WalletCard, GhostTile, CircleAction, AccountCard, TwoLineHeader, StatTile, CurrencySelect, ConditionChip, AmountPill, RoleChip, InitialChip, ApproverRow, ModuleCard, IntegrationCard, DataFieldCard, AvatarStack, TeamCard, LetterAvatar, CountryCell, SectionHeading });
