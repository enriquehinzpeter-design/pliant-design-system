One-time-code entry for two-factor auth, card activation and payment confirmation.

```jsx
<VerificationCodeField length={6} value={code} onChange={setCode} />
```

Boxes are 44×52 with the standard 8px radius; the digit is 20px/500 — larger than `input-text` because it is read back aloud.
