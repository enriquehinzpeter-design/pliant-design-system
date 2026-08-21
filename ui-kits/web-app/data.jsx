// Demo data transcribed from the dev-environment screenshots.
// The reference org (Aetna) runs the Visa scheme; scheme is per-organization.
const ORG_SCHEME = 'visa';
const TX = [
  { id: 1, merchant: 'MOCO', category: 'Travel & Accommodation', date: '17 Jun 2026', time: '10:43', card: 'Virtual', last4: '7558', colourway: 'lime', member: 'Barnabas Bartha', account: 'Main account (GBP)', amount: '-2.00 GBP', status: 'PENDING', review: null, receiptOverdue: true },
  { id: 2, merchant: 'Google Digital Garage', category: 'Computing & Software', date: '14 May 2026', time: '09:12', card: 'asdf', last4: '7881', colourway: 'gray', member: 'Gabriel Hora', account: 'Main account (GBP)', amount: '-1.00 GBP', status: 'PENDING', review: 'thumb' },
  { id: 3, merchant: 'FAANG GmbH', category: 'Advertising & Marketing', date: '11 May 2026', time: '16:05', card: 'Virtual', last4: '8299', colourway: 'gray', member: 'Barnabas Bartha', account: 'Main account (GBP)', amount: '-2.00 GBP', status: 'DECLINED', review: null },
  { id: 4, merchant: 'IONOS', category: 'Computing & Software', date: '26 Jan 2026', time: '11:30', card: 'asdf', last4: '7881', colourway: 'gray', member: 'Gabriel Hora', account: 'Main account (GBP)', amount: '-1.00 GBP', status: 'PENDING', review: null },
  { id: 5, merchant: 'YBS MEDICAL', category: 'Travel & Accommodation', date: '25 Jun 2025', time: '14:20', card: 'Mis123', last4: '1379', colourway: 'sage', member: 'Hemal Desai', account: 'Main account (GBP)', amount: '-254.94 GBP', status: 'PENDING', review: 'flag', flagged: true, comment: true, flagReason: 'Personal expense' },
  { id: 6, merchant: 'HOSP.TORREVIEJA URG.FACT.', category: 'Services', date: '25 Jun 2025', time: '13:02', card: 'Mis123', last4: '1379', colourway: 'sage', member: 'Hemal Desai', account: 'Main account (GBP)', amount: '-50.00 GBP', status: 'PENDING', review: null, comment: true },
  { id: 7, merchant: 'GARGASH HOSPITAL LLC', category: 'Office Supplies & Equipment', date: '25 Jun 2025', time: '12:44', card: 'Mis123', last4: '1379', colourway: 'sage', member: 'Hemal Desai', account: 'Main account (GBP)', amount: '-440.03 GBP', status: 'PENDING', review: null },
  { id: 8, merchant: 'BKG*Hotel at Booking.c', category: 'Travel & Accommodation', date: '25 Jun 2025', time: '10:15', card: 'Mis123', last4: '1379', colourway: 'sage', member: 'Hemal Desai', account: 'Main account (GBP)', amount: '-3,696.43 GBP', status: 'PENDING', review: null },
  { id: 9, merchant: 'SPORTS SURGERY CLINIC', category: 'Services', date: '25 Jun 2025', time: '09:40', card: 'Mis123', last4: '1379', colourway: 'sage', member: 'Hemal Desai', account: 'Main account (GBP)', amount: '-120.00 GBP', status: 'PENDING', review: null },
];

// `type` is 'physical' | 'virtual' — it drives the label on the card face, so every row
// carries it explicitly rather than letting CardRender fall back to 'virtual'.
const CARDS = [
  { id: 1, name: 'Standard Physical', type: 'physical', last4: '8814', colourway: 'black', icon: 'ArrowsClockwise', cardholder: 'Dioni Ripoll', status: 'pending', statusLabel: 'Pending', issued: '25 Nov 2025', validUntil: '31 Oct 2028', account: 'Main accou…', available: 0, limit: 5100, frequency: 'Monthly',
    // Detail-drawer values transcribed from A7; only this row has a captured drawer.
    detail: { account: 'Main account (GBP)', team: 'CLDS - Bolivia Mission', defaultLimit: '5,100.00 GBP per month', transactionLimit: '1,000.00 GBP' } },
  { id: 2, name: 'Adv Limits (Travel + FM …', last4: '****', colourway: 'lime', icon: 'ArrowSquareOut', cardholder: 'Desi Sim3', status: 'requested', statusLabel: 'Requested', issued: '-', validUntil: '-', account: 'Main accou…', available: 10000, limit: 10000, frequency: 'Total' },
  { id: 3, name: 'TPC Test 2', last4: '****', colourway: 'lime', icon: 'ArrowSquareOut', cardholder: 'Dioni Ripoll', status: 'requested', statusLabel: 'Requested', issued: '-', validUntil: '-', account: 'Main accou…', available: 100, limit: 100, frequency: 'Total' },
  { id: 4, name: 'Virtual', last4: '****', colourway: 'gray', icon: 'ArrowSquareOut', cardholder: 'Normaluser ApprovalPolicy', status: 'requested', statusLabel: 'Requested', issued: '-', validUntil: '-', account: 'Main accou…', available: 2000, limit: 2000, frequency: 'Monthly' },
  { id: 5, name: 'Commercial Choice', last4: '****', colourway: 'sage', icon: 'ArrowSquareOut', cardholder: 'Dioni Ripoll', status: 'requested', statusLabel: 'Requested', issued: '-', validUntil: '-', account: 'Main accou…', available: 1000, limit: 1000, frequency: 'Total' },
  { id: 6, name: 'Commercial Choice', last4: '****', colourway: 'sage', icon: 'ArrowSquareOut', cardholder: 'Dioni Ripoll', status: 'requested', statusLabel: 'Requested', issued: '-', validUntil: '-', account: 'Main accou…', available: 333, limit: 333, frequency: 'Total' },
  { id: 7, name: 'Virtual', last4: '****', colourway: 'coral', icon: 'ArrowSquareOut', cardholder: 'Test Both', status: 'requested', statusLabel: 'Requested', issued: '-', validUntil: '-', account: 'Main accou…', available: 1000, limit: 1000, frequency: 'Monthly' },
  { id: 8, name: 'Test', last4: '****', colourway: 'coral', icon: 'ArrowSquareOut', cardholder: 'Dioni Ripoll', status: 'requested', statusLabel: 'Requested', issued: '-', validUntil: '-', account: 'Main accou…', available: 2000, limit: 2000, frequency: 'Monthly' },
  { id: 9, name: 'test', last4: '****', colourway: 'orange', icon: 'ArrowSquareOut', cardholder: 'Test Both', status: 'requested', statusLabel: 'Requested', issued: '-', validUntil: '-', account: 'Main accou…', available: 5100, limit: 5100, frequency: 'Monthly' },
];

const MEMBERS = [
  { id: 1, name: 'Barnabas Bartha', status: 'Invited', team: 'CLDS - Brazil Mission', cards: ['gray', 'sage', 'sage'],
    // Detail-drawer values transcribed from B1; only this row has a captured drawer.
    detail: { email: 'barnabas.bartha+2@getpliant.com', cards: [
      { name: 'Test', colourway: 'gray', limit: 1 },
      { name: 'SR-133085112', colourway: 'sage', limit: 100 },
      { name: 'Balance-based', colourway: 'sage', limit: 123 },
    ] } },
  { id: 2, name: 'Barnabas Bartha', status: 'Invited', team: 'CLDS - Bolivia Mission', cards: ['lime', 'lime'] },
  { id: 3, name: 'Barnabas Bartha', status: 'Invited', team: 'CLDS - Bolivia Mission', cards: ['lime', 'sage'] },
  { id: 4, name: 'Barnabas Verylonglastname', status: 'Invited', team: 'CLDS - Bolivia Mission', cards: ['black'] },
  { id: 5, name: 'Barnabas Bartha', status: 'Invited', team: 'CLDS - Bolivia Mission', cards: ['lime'] },
  { id: 6, name: 'Barnabas Bartha', status: 'Invited', team: 'CLDS - Brazil Mission', cards: [] },
  { id: 7, name: 'Barnabas Bartha', status: 'Invited', team: 'CLDS - Bolivia Mission', cards: ['sage'] },
  { id: 8, name: 'Barnabas Issuecarddialog', status: 'Invited', team: 'CLDS - Bolivia Mission', cards: ['sage'] },
  { id: 9, name: 'Bruna Hirano', status: 'Invited', team: 'empty', cards: [] },
];

Object.assign(window, { TX, CARDS, MEMBERS, ORG_SCHEME });
