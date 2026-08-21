// Demo data transcribed from the internal-app captures (staging, demo records).

const INT_ORGS = [
  { id: 1, name: '1-Pliant EU - Corporate', cc: 'DE', program: 'Pliant', currency: 'EUR', currencyMore: true, groups: ['POy', 'BC'], status: 'ACTIVE', members: 88, cards: 131, available: '-264,187 EUR' },
  { id: 2, name: '1-Pliant EU - Travel', cc: 'DE', program: 'Pliant', currency: 'EUR', currencyMore: true, groups: ['POy', 'BC'], status: 'ACTIVE', members: 62, cards: 14, available: '451,967 EUR' },
  { id: 3, name: '1-Pliant UK - Corporate', cc: 'GB', program: 'Pliant', currency: 'GBP', currencyMore: true, groups: ['POy', 'BC'], status: 'ACTIVE', members: 39, cards: 77, available: '-107,658 GBP' },
  { id: 4, name: '1-Pliant UK - Travel', cc: 'GB', program: 'Pliant', currency: 'GBP', currencyMore: true, groups: ['POy', 'BC'], status: 'ACTIVE', members: 39, cards: 0, available: '-49,354 GBP' },
  { id: 5, name: '1-Pliant US - Corporate', cc: 'US', program: 'Pliant', currency: 'USD', groups: ['POy', 'BC'], status: 'ACTIVE', members: 60, cards: 55, available: '9,756,137 USD' },
  { id: 6, name: '1-Pliant US - Travel', cc: 'US', program: 'Pliant', currency: 'USD', groups: ['POy', 'BC'], status: 'ACTIVE', members: 44, cards: 1, available: '39,492 USD' },
  { id: 7, name: '2025-11_Langworth Group', cc: 'DE', program: 'Unzer', currency: 'EUR', groups: ['POy', 'BC'], status: 'ONBOARDING', members: 2, cards: 0, available: '-' },
  { id: 8, name: '2025-11_Mayert - Braun', cc: 'DE', program: 'Unzer', currency: 'EUR', groups: ['POy', 'BC'], status: 'ONBOARDING', members: 2, cards: 0, available: '-' },
  { id: 9, name: '2026-02-24T11:07:31.312Z_…', cc: 'DE', program: 'Circula Embe…', currency: 'EUR', groups: ['POy', 'BC'], status: 'ONBOARDING', members: 2, cards: 0, available: '-' },
  { id: 10, name: '2026-03-09T09:28:11.115Z_…', cc: 'DE', program: 'Unzer', currency: 'EUR', groups: ['POy', 'BC'], status: 'ONBOARDING', members: 1, cards: 0, available: '-' },
  { id: 11, name: '2026-03-09T09:31:09.004…', cc: 'DE', program: 'Unzer', currency: 'EUR', groups: ['POy', 'BC'], status: 'ONBOARDING', members: 0, cards: 0, available: '-' },
  { id: 12, name: '2026-03-09T09:31:11.635Z…', cc: 'DE', program: 'Unzer', currency: 'EUR', groups: ['POy', 'BC'], status: 'ONBOARDING', members: 0, cards: 0, available: '-' },
  { id: 13, name: '2026-03-09T09:50:07.349…', cc: 'DE', program: 'Unzer', currency: 'EUR', groups: ['POy', 'BC'], status: 'ONBOARDING', members: 0, cards: 0, available: '-' },
];

// Non-customers tab (INT-17): organisation + country only, then a chevron.
const INT_NCOS = [
  { id: 1, name: 'Allora NCO', cc: 'IT' },
  { id: 2, name: 'HALO GmbH', cc: 'DE' },
  { id: 3, name: 'Hugo Muster Joint Venture GmbH', cc: 'AT' },
  { id: 4, name: 'Oui NCO', cc: 'FR' },
  { id: 5, name: "Poor Man's GmbH", cc: 'DE' },
];

const INT_MEMBERS = [
  { id: 1, name: 'Aaron Aaijtink', owner: true, org: 'Initech', status: 'INVITED', device: '-', last: '21 Feb 2023', since: '21 Feb 2023' },
  { id: 2, name: 'Abdurahmanov Majnun', org: 'Pliant Test', status: 'INVITED', device: '-', last: '7 May 2025', since: '7 May 2025' },
  { id: 3, name: 'Abdurahmanov Majnun', org: 'Co2move Test', status: 'INVITED', device: '-', last: '7 May 2025', since: '7 May 2025' },
  { id: 4, name: 'Abe Lovelace', owner: true, org: 'Unzer Onboarding', status: 'INVITED', device: '-', last: '10 Feb 2026', since: '10 Feb 2026' },
  { id: 5, name: 'Acquim"><b>a Matuli"><b>a', org: 'Test Org', status: 'INVITED', device: '-', last: '23 Dec 2025', since: '2 May 2023' },
  { id: 6, name: 'Ada Locelave', org: 'AAA Global Trust GmbH', status: 'INVITED', device: '-', last: '15 Jul 2025', since: '15 Jul 2025' },
  { id: 7, name: 'Ada Lovelace', org: 'Deel Test 1', status: 'INVITED', device: '-', last: '31 Mar 2026', since: '31 Mar 2026' },
  { id: 8, name: 'Adeline Cormier', owner: true, org: 'ACME Company', status: 'INVITED', device: '-', last: '18 Mar 2024', since: '18 Mar 2024' },
  { id: 9, name: 'Adewale Adetiba', owner: true, org: 'UAB Kilo grupe', status: 'INVITED', device: '-', last: '12 Aug 2026', since: '13 Aug 2026' },
  { id: 10, name: 'Adewale Adetiba', owner: true, org: 'Kilo', status: 'INVITED', device: '-', last: '12 Aug 2026', since: '13 Aug 2026' },
  { id: 11, name: 'Adewale Adetiba', owner: true, org: 'kilometers', status: 'INVITED', device: '-', last: '12 Aug 2026', since: '12 Aug 2026' },
  { id: 12, name: 'Aditi Sharma', owner: true, org: 'Amadeus Cytric', status: 'INVITED', device: '-', last: '3 Aug 2026', since: '3 Aug 2026' },
];

// Global transactions (INT-03): every row carries a country flag and a decline mark.
const INT_TX = [
  { id: 1, merchant: "Blackwell's", category: 'Computing & Software', cc: 'CR', date: '20 Aug 2026', org: 'jduro Testing', card: 'Joao Owner', last4: '7739', colourway: 'coral', member: 'João Owner', status: 'PENDING', amount: '-9.17 EUR' },
  { id: 2, merchant: 'Microsoft Ireland', category: 'Office Supplies & Equipment', cc: 'IT', date: '20 Aug 2026', org: 'Worldpay sandbox', card: 'Virtual', last4: '9155', colourway: 'coral', member: 'Simone Benevelli', status: 'PENDING', amount: '-4.34 GBP' },
  { id: 3, merchant: 'Key-Systems', category: 'Office Supplies & Equipment', cc: 'DZ', date: '20 Aug 2026', org: 'Tobik Test', card: 'Tobias Klasse', last4: '9945', colourway: 'cream', member: 'Tobi Klasse', status: 'PENDING', amount: '-3.50 EUR' },
  { id: 4, merchant: 'Thalia', category: 'Office Supplies & Equipment', cc: 'VU', date: '20 Aug 2026', org: 'Capture Expense testing', card: 'AWS', last4: '6546', colourway: 'lime', member: 'Stefano Pavese', status: 'PENDING', amount: '-5.87 GBP' },
  { id: 5, merchant: 'IBM Cloud', category: 'Computing & Software', cc: 'BW', date: '20 Aug 2026', org: 'Volksbank 2 Org', card: 'Messe Frankfurt Mai/…', last4: '0224', colourway: 'lime', member: 'Lukas Gottschick', status: 'PENDING', amount: '-5.30 EU…' },
  { id: 6, merchant: 'St. Regis Hotels & Resorts', category: 'Computing & Software', cc: 'DK', date: '20 Aug 2026', org: 'Commerzbank', card: 'Virtual', last4: '9398', colourway: 'cream', member: 'Artem Kalantai', status: null, amount: '-60.30 E…' },
  { id: 7, merchant: 'JustFly', category: 'Office Supplies & Equipment', cc: 'TM', date: '20 Aug 2026', org: 'Yev BC credit test', card: 'Virtual', last4: '9340', colourway: 'cream', member: 'Yevheniia Silbernagl', status: 'PENDING', amount: '-3.73 EUR' },
  { id: 8, merchant: 'Mercure Hotels', category: 'Office Supplies & Equipment', cc: 'BW', date: '20 Aug 2026', org: 'Conferma', card: 'testlabel', last4: '3881', colourway: 'cream', member: 'Conferma Test', status: null, amount: '-0.89 EUR' },
  { id: 9, merchant: 'Workday', category: 'Office Supplies & Equipment', cc: 'IR', date: '20 Aug 2026', org: 'Bizaway WL Test Organisati…', card: 'Virtual', last4: '1890', colourway: 'coral', member: 'Francois Le Roux', status: 'PENDING', amount: '-67.88 E…' },
];

const INT_PROGRAMS = [
  { id: 1, name: '123123', code: '1233', scope: 'Fully Embedded', groups: ['POy', 'VG'], partner: 'Acclaim', orgs: 0, status: 'DRAFT' },
  { id: 2, name: 'a', code: 'NEWPARTNER', scope: 'Fully Embedded', groups: ['POy', 'VG', 'BC'], partner: 'CDS', orgs: 0, status: 'DRAFT' },
  { id: 3, name: 'a', code: 'a123', scope: 'Fully Embedded', groups: ['POy', 'VG', 'BC'], partner: 'CDS', orgs: 0, status: 'DRAFT' },
  { id: 4, name: 'Acclaim', code: 'Acclaim', scope: 'Whitelabel', groups: ['POy', 'BC', 'VG'], partner: 'Acclaim', orgs: 0, status: 'ACTIVE' },
  { id: 5, name: 'Acubiz', code: 'Acubiz', scope: 'Whitelabel', groups: ['POy', 'BC'], partner: 'Acubiz', orgs: 0, status: 'DRAFT' },
  { id: 6, name: 'AlephPay', code: 'AlephPay', scope: 'Whitelabel', groups: ['POy', 'BC'], partner: 'Aleph', orgs: 0, status: 'DRAFT' },
  { id: 7, name: 'Amadeus Cytric Pay Wallet', code: 'Amadeus Cytric Pay Wallet', scope: 'Whitelabel', groups: ['POy', 'BC'], partner: 'Amadeus Cytric', orgs: 1, status: 'ACTIVE' },
  { id: 8, name: 'Amazon Business', code: 'Amazon Business', scope: 'Logo Card', groups: ['POy', 'BC', 'VG', 'X', 'Y'], partner: 'Amazon', orgs: 0, status: 'DRAFT' },
];

Object.assign(window, { INT_ORGS, INT_NCOS, INT_MEMBERS, INT_TX, INT_PROGRAMS });
