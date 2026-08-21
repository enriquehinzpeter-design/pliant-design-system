const NS = window.PliantDesignSystem_8f7377 || {};
const { Icon, TextField, Select, Switch, Menu, MenuItem } = NS;
const WizardDialog = NS.WizardDialog;
const FormDialog = NS.FormDialog;
const FieldWithAction = NS.FieldWithAction || (({ label, children, actionLabel }) => <div>{label}{children}{actionLabel}</div>);
const InlineEscapeLink = NS.InlineEscapeLink || (({ children, linkLabel }) => <div>{children} {linkLabel}</div>);

// A field label in the internal dialogs — the same quiet caption both dialogs use.
function FieldLabel({ children, info }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 6, fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', lineHeight: 'var(--caption-line)', color: 'var(--text-secondary)' }}>
      {children}{info && <Icon name="Info" size={14} color="var(--action-active)" />}
    </span>
  );
}

function Field({ label, info, helper, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <FieldLabel info={info}>{label}</FieldLabel>
      {children}
      {helper && <div style={{ marginTop: 6, fontFamily: 'var(--font-sans)', fontSize: 'var(--caption-size)', lineHeight: 'var(--caption-line)', color: 'var(--text-secondary)' }}>{helper}</div>}
    </div>
  );
}

/**
 * INT-25 — the internal Add Card Variant wizard. The existing WizardDialog pattern with
 * its step rail; only the step content is new.
 */
function AddCardVariantDialog({ open, onClose }) {
  if (!WizardDialog) return null;
  return (
    <WizardDialog open={open} title="Basic Info" activeStep={0}
      steps={[{ label: 'Basic Info' }, { label: 'Attributes' }, { label: 'Summary' }]}
      continueLabel="Continue" onCancel={onClose} onContinue={onClose} onScrimClick={onClose}>
      <Field label="Name" helper="Max. 50 characters">
        <TextField fullWidth autoFocus />
      </Field>
      <Field label="Card Products">
        <Select placeholder="Search..." options={[]} fullWidth />
      </Field>
      <Field label="Account Group"><Select options={[]} fullWidth /></Field>
      <Field label="Issuance Country"><Select options={[]} fullWidth /></Field>
      <Field label="Currency"><Select options={[]} fullWidth /></Field>
    </WizardDialog>
  );
}

/**
 * INT-26 — Add new customer organization. The existing FormDialog, widened for a tall
 * form, carrying two details worth reusing: a field with an adjacent action ("Fetch")
 * and an inline escape link when the lookup cannot find the record.
 *
 * The confirm button ships DISABLED, as captured: the form has required fields below
 * the fold.
 */
function AddOrganizationDialog({ open, onClose }) {
  if (!FormDialog) return null;
  return (
    <FormDialog open={open} title="Add new customer organization" width={392}
      cancelLabel="Cancel" confirmLabel="Add organization" confirmDisabled
      onCancel={onClose} onConfirm={onClose} onScrimClick={onClose}>
      <Field label="Revenue Share" info><Select value="PLIANT" options={['PLIANT']} fullWidth
        startAdornment={<Icon name="MagnifyingGlass" size={16} />} /></Field>
      <Field label="Payment Program" info><Select value="PLIANT" options={['PLIANT']} fullWidth
        startAdornment={<Icon name="MagnifyingGlass" size={16} />} /></Field>
      <Field label="Country"><Select value="Germany" options={['Germany']} fullWidth
        startAdornment={<Icon name="MagnifyingGlass" size={16} />} /></Field>
      <Field label="Currency"><Select value="EUR" options={['EUR']} fullWidth /></Field>
      <Field label="Account group"><Select value="POy, BC" options={['POy, BC']} fullWidth /></Field>
      <div style={{ marginBottom: 18 }}>
        <FieldLabel>Organization name</FieldLabel>
        <Select placeholder="Organization name" options={[]} fullWidth
          startAdornment={<Icon name="MagnifyingGlass" size={16} />} />
        <InlineEscapeLink linkLabel="Add manually">Organisation not listed?</InlineEscapeLink>
      </div>
      <div style={{ marginBottom: 18 }}>
        <FieldWithAction label="HubSpot Company ID" actionLabel="Fetch">
          <TextField placeholder="HubSpot Company ID" fullWidth />
        </FieldWithAction>
      </div>
      {/* Switch-LEFT: this is a dialog, where the control leads the label. */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <Switch />
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, letterSpacing: '0.15px', color: 'var(--text-primary)' }}>Use new onboarding flow</span>
      </div>
      <Field label="Transaction Link Record ID"><TextField fullWidth variant="standard" /></Field>
    </FormDialog>
  );
}

/**
 * INT-27 — the account popover: the signed-in email as a header line, then Sign Out.
 * Elevation 8, anchored under the top-right account icon.
 */
function UserMenu({ open, onClose, email = 'test-super-platofrm-admin@infinnity.c...' }) {
  if (!open) return null;
  return (
    <React.Fragment>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
      <div style={{
        position: 'absolute', top: 52, right: 20, zIndex: 41, minWidth: 264,
        background: 'var(--surface-card)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-8)', overflow: 'hidden',
      }}>
        <div style={{ padding: '12px 16px', fontFamily: 'var(--font-sans)', fontSize: 'var(--body2-size)', letterSpacing: 'var(--body2-ls)', color: 'var(--text-primary)', borderBottom: '1px solid var(--divider)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{email}</div>
        <button type="button" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', border: 0, background: 'none', padding: '12px 16px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 15, letterSpacing: '0.15px', color: 'var(--text-primary)' }}>
          <Icon name="SignOut" size={18} color="var(--action-active)" />Sign Out
        </button>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { AddCardVariantDialog, AddOrganizationDialog, UserMenu, Field, FieldLabel });
