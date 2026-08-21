State badge for data tables, in two families taken from the internal app's tables.

**Solid** is organisation lifecycle — `ACTIVE`, `ONBOARDING`, `DRAFT` (INT-01, INT-05). Saturated fill, light text, always uppercase.

**Tinted** is batch / record state — `SETTLED`, `PAID`, `FAILED`, `WAITING`, `AUTHORIZED`, `RESOLVE` (INT-06 through INT-20). `RESOLVE` is warning-tinted because it names an **action the ops user must take**, unlike the others, which report a fact. Soft fill, dark text; the same treatment as the external app's status pills, so the two apps read as one system.

```jsx
<StateBadge label="ACTIVE" />           // solid teal
<StateBadge label="ONBOARDING" />       // solid amber
<StateBadge label="SETTLED" />          // tinted green
<StateBadge label="PAID" count={2} />   // "PAID (2)"
<StateBadge label="Authorized" />       // tinted, source casing
```

- The **count belongs in `count`**, not baked into `label` — batch tables show "FAILED (1)" / "WAITING (13)" and the badge composes it.
- An unrecognised label renders neutral and warns. Add the tone to `STATE_BADGE_TONES` rather than passing a colour inline, so every table inherits it.
- Casing: solid uppercases, tinted keeps what you pass (the art has `SETTLED` uppercase but `Authorized` sentence-case). Override with `upper`.
