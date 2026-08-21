const { Icon, Typography } = window.PliantDesignSystem_8f7377;
const ASSETS = '../../assets';
// Custom Pliant SVGs resolve against this base, so <Icon> calls that omit assetBase
// (nav items, header buttons, top bar) still find assets/icons/*.svg from this folder.
window.__PLIANT_ASSET_BASE__ = ASSETS;

/* Card thumbnails are parametric vector cards at the "icon" size class —
   never a scaled-down tile or full render. from the Figma Card Library
   (node 5461-73221), never drawn rects and never scaled-down full renders.
   colourway and scheme are always passed explicitly. */
function CardThumb({ colourway, scheme, size = 1, singleUse, shield, type }) {
  // Resolved lazily so a not-yet-compiled bundle degrades instead of crashing.
  const CardIcon = (window.PliantDesignSystem_8f7377 || {}).CardIcon;
  if (!CardIcon) return null;
  return <CardIcon colourway={colourway} scheme={scheme} size="icon" height={Math.round(30 * size)}
    singleUse={singleUse} shield={shield} type={type} assetBase={ASSETS} />;
}

// Merchant-category glyphs, mapped to the icon set the app uses.
const CATEGORY_ICON = {
  'Travel & Accommodation': ['Travel', true],
  'Computing & Software': ['Computing', true],
  'Advertising & Marketing': ['PaperPlaneTilt', false],
  'Services': ['FirstAid', false],
  'Office Supplies & Equipment': ['Paperclip', false],
};

function CategoryIcon({ category, size = 22 }) {
  const [name, custom] = CATEGORY_ICON[category] || ['Storefront', false];
  return <Icon name={name} size={size} assetBase={custom ? ASSETS : undefined} />;
}

// Merchant / category cell.
function MerchantCell({ name, category, flagged, receipt }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0, color: 'var(--text-primary)' }}>
        <CategoryIcon category={category} />
        {flagged && <span style={{ position: 'absolute', right: -2, bottom: -2, width: 8, height: 8, borderRadius: '50%', background: 'var(--error-main)' }} />}
      </span>
      <span style={{ minWidth: 0 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 'var(--body2-size)', letterSpacing: 'var(--body2-ls)', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
          {receipt && <Icon name="ChatCircleText" size={13} color="var(--action-active)" />}
        </span>
        <span style={{ display: 'block', fontSize: 'var(--caption-size)', letterSpacing: 'var(--caption-ls)', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{category}</span>
      </span>
    </div>
  );
}

// Uppercase status label stacked above the amount, right-aligned.
const STATUS_TONE = { PENDING: 'var(--info-main)', DECLINED: 'var(--error-main)', CONFIRMED: 'var(--success-main)', EXPORTED: 'var(--info-main)' };

function StatusAmount({ status, amount, align = 'right' }) {
  const declined = status === 'DECLINED';
  return (
    <span style={{ display: 'block', textAlign: align }}>
      <span style={{ display: 'block', fontSize: 'var(--overline2-size)', fontWeight: 'var(--overline2-weight)', letterSpacing: 'var(--overline2-ls)', lineHeight: 'var(--overline2-line)', textTransform: 'uppercase', color: STATUS_TONE[status] || 'var(--text-secondary)' }}>{status}</span>
      <span style={{ display: 'block', fontSize: 'var(--body2-size)', fontWeight: 500, letterSpacing: 'var(--body2-ls)', fontVariantNumeric: 'tabular-nums', color: declined ? 'var(--error-main)' : 'var(--text-primary)', textDecoration: declined ? 'line-through' : 'none' }}>{amount}</span>
    </span>
  );
}

// Small uppercase tinted pill used in the STATUS / TEAM(S) columns.
const PILL = {
  pending: ['var(--alert-info-fill)', 'var(--alert-info-content)'],
  requested: ['var(--alert-neutral-fill)', 'var(--alert-neutral-content)'],
  invited: ['var(--alert-neutral-fill)', 'var(--alert-neutral-content)'],
  active: ['var(--alert-success-fill)', 'var(--alert-success-content)'],
  team: ['var(--alert-info-fill)', 'var(--alert-info-content)'],
};

function Pill({ label, tone = 'requested', upper = true }) {
  const [bg, fg] = PILL[tone] || PILL.requested;
  return (
    <span style={{
      display: 'inline-block', padding: '3px 8px', borderRadius: 6, background: bg, color: fg,
      fontSize: 'var(--overline2-size)', fontWeight: 'var(--overline2-weight)', letterSpacing: 'var(--overline2-ls)',
      lineHeight: '14px', textTransform: upper ? 'uppercase' : 'none', whiteSpace: 'nowrap',
    }}>{label}</span>
  );
}

// "0 GBP / 5,100 GBP" with a thin usage bar underneath.
function LimitMeter({ available, limit, currency = 'GBP' }) {
  const zero = available === 0;
  const pct = limit ? Math.max(0, Math.min(100, ((limit - available) / limit) * 100)) : 0;
  return (
    <span style={{ display: 'block', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
      <span style={{ fontSize: 'var(--body2-size)', letterSpacing: 'var(--body2-ls)' }}>
        <span style={{ color: zero ? 'var(--error-main)' : 'var(--text-primary)' }}>{available.toLocaleString('en-GB')} {currency}</span>
        <span style={{ color: 'var(--text-secondary)' }}> / {limit.toLocaleString('en-GB')} {currency}</span>
      </span>
      <span style={{ display: 'block', height: 2, marginTop: 6, background: 'var(--action-disabled-bg)', borderRadius: 1 }}>
        <span style={{ display: 'block', height: 2, width: pct + '%', background: 'var(--primary-main)', borderRadius: 1 }} />
      </span>
    </span>
  );
}

// Sortable column header label.
function SortHeader({ label, active, dir = 'asc' }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {label}
      {active && <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ transform: dir === 'desc' ? 'rotate(180deg)' : 'none' }}><path d="M12 4l-6 8h12z" /></svg>}
    </span>
  );
}

// Observed copy variants: 'No transactions available yet.' / 'No data available yet.' / 'No transactions to review.'
function EmptyState({ message = 'No transactions available yet.' }) {
  return (
    <div style={{ padding: '120px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <Icon name="XCircle" size={26} color="var(--text-disabled)" />
      <Typography variant="subtitle1" color="text.disabled" style={{ fontWeight: 400 }}>{message}</Typography>
    </div>
  );
}

Object.assign(window, { CardThumb, CategoryIcon, MerchantCell, StatusAmount, Pill, LimitMeter, SortHeader, EmptyState, ASSETS });
