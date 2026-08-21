Country flags, drawn from the canonical SVG flag library in the Design System Figma file — `g1YQZdrVs2KJtFwfxgtTmD`, node **`6436:37649`**. The artwork is circular and 1:1, native 16×16.

**API matches production** (`src/components/CountryFlag`): keyed by ISO 3166-1 alpha-2 code in a **16px tall × 22px wide** slot, so any country can be added without an API change. The circle renders at `size` and centres in the 22px slot — that keeps rows aligned with the app without stretching the art.

**Never use an emoji flag anywhere in a Pliant design.** Emoji render differently on every platform, are missing entirely on Windows, and are not the brand's artwork. If a country is not in the exported set, fetch it from the node — never substitute a lookalike or an emoji.

```jsx
<Flag code="DE" />                        // 16×22 slot, the production default
<Flag code="fr" />                        // any case
<FlagLabel code="ZA" label="ZAR" />       // currency selector
<FlagLabel code="PT" label="Portugal" />  // country field
```

Confirmed usage sites, all of which take `Flag`: account and currency selectors (dashboard Financial Overview, Rewards), country fields in address and bank forms (billing beneficiary controls, `AddBankInformationDialog`), member nationality (`NationalitiesAutocomplete`, `ProfilePage`), card country restrictions (`CardCountry`), merchant country (Merchants columns, `MerchantData`, transaction columns), phone-number prefixes (`CountryCallingCode`), and legal-document language tabs.
- `FlagLabel` pairs the flag with a currency code, country name or dial code at an 8px gap — the pattern used wherever a flag carries text.
- An unknown or not-yet-exported code renders the library's own **GENERIC** fallback ("Country=X Generic" — a neutral outlined globe) and warns in the console, so a missing flag is visible in review rather than silently wrong. Pass `code="GENERIC"` to request it deliberately.
- `EU` is in the set for euro rows (the circle of stars), alongside the real countries.

### Exported so far (21 of 240+, plus GENERIC)

`AF` Afghanistan · `AQ` Antarctica · `AW` Aruba · `BF` Burkina Faso · `CF` Central African Republic · `DE` Germany · `DZ` Algeria · `ES` Spain · `EU` European Union · `FR` France · `GB` United Kingdom · `HU` Hungary · `IN` India · `KZ` Kazakhstan · `NL` Netherlands · `US` United States · `YE` Yemen · `PT` Portugal · `TT` Trinidad and Tobago · `TZ` Tanzania · `ZA` South Africa

Every flag in the node is a named child symbol **`Country=<ISO> <Name>`** — `Country=DE Germany`, `Country=GB United Kingdom`, `Country=X Generic` for the fallback. So any of the 240+ can be requested by ISO code and added to `FLAGS` without touching the API or any call site. Five assets in the supplied export are **not** complete flags — see the iconography section of `readme.md` for what is still unmapped.
