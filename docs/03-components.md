# 03 — Components

The library is `@pliant/ui`: **92 exported, typed components** — thin MUI re-exports whose restyling lives in the theme (`createTheme` + 24 override modules). Full inventory and per-component docs: `components/` (synced from the design system). Storybook stories are the canonical usage documentation.

Groups: **Core** (Button, IconButton, ButtonGroup, Link, Paper, Card, Avatar, Divider) · **Data** (Table/data-grid geometry, PaperLabeledValue, StatusBadge, Chip) · **Feedback** (Alert, Snackbar, Tooltip, LinearProgress) · **Forms** (TextField, Select, Autocomplete, Checkbox, Radio, Switch, Slider, MoneyField, DateField, VerificationCodeField) · **Icon** · **Navigation** (Sidebar, Tabs, Breadcrumbs, Stepper, Menu, List, Accordion, Drawer) · **Card art** (CardRender, CardIcon, Flag).

Key rules (details in each component doc):
- Buttons: contained near-black = primary action (one per view), outlined = secondary, text = tertiary; sentence case; icon start/end; loading state with spinner.
- StatusBadge: tinted uppercase micro-label; supports count suffix ("PAID (10)"); status color styles are a token set (see 08 open Q1).
- Switch: settings pages label-left/switch-right; dialogs switch-left/label-right.
- Deprecated — do not use: ChipAutocomplete→Autocomplete, ChipSelect→Select, Dropzone→FileUploadField.
