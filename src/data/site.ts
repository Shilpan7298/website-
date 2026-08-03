/**
 * Single source of truth for company facts, navigation and figures.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO EDIT THIS SITE
 * Every number, address and claim on the site comes from this file. Change it
 * here and it changes everywhere.
 *
 * Anything tagged `TODO(confirm)` was NOT verifiable from public sources and is
 * a placeholder. Search the repo for "TODO(confirm)" to find them all before
 * going live.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const company = {
  name: 'Urjapod Energy',
  legalName: 'Urjapod Energy Private Limited',
  tagline: 'Grid-scale battery energy storage, engineered in India.',
  /** Verified: MCA / RoC-Ahmedabad public record. */
  cin: 'U27900GJ2025PTC163530',
  incorporated: '29 May 2025',
  registrar: 'RoC-Ahmedabad',
  email: 'shilpan@urjapod.com',
  phone: '+91 81540 70298',
  phoneHref: '+918154070298',
  address: {
    line1: '403 Aniket Complex',
    line2: 'C.G. Road, Navrangpura',
    city: 'Ahmedabad',
    state: 'Gujarat',
    postcode: '380009',
    country: 'India',
  },
  linkedin: 'https://in.linkedin.com/company/urjapod-energy',
} as const;

export const nav = [
  { label: 'Products', href: '/products/' },
  { label: 'Technology', href: '/technology/' },
  { label: 'Solutions', href: '/solutions/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/**
 * Pod Gen 1 — the flagship container BESS.
 *
 * Verified from public sources: 20 ft container form factor, prismatic LFP
 * cells, AI-enabled BMS, IP-rated against dust and water, built to global
 * environmental standards.
 *
 * NOTE ON CELL SPEC: public listings describe "314 V prismatic LFP cells".
 * That is almost certainly a transcription of **314 Ah** — 314 Ah is the
 * industry-standard prismatic LFP cell size, whereas a single LFP cell is
 * ~3.2 V nominal, so a "314 V cell" does not exist. Written as 314 Ah below.
 * TODO(confirm): verify the cell spec and correct if wrong.
 */
export const podGen1 = {
  name: 'Pod Gen 1',
  summary:
    'A 20-foot containerised battery energy storage system built on prismatic LFP cells and driven by an AI-enabled battery management system.',
  specs: [
    { label: 'Form factor', value: '20 ft ISO container', verified: true },
    { label: 'Cell chemistry', value: 'Prismatic LFP (LiFePO₄)', verified: true },
    { label: 'Cell capacity', value: '314 Ah', verified: false },
    { label: 'Usable energy', value: '3.44 MWh', verified: false },
    { label: 'System voltage', value: '1500 V DC', verified: false },
    { label: 'Round-trip efficiency', value: '≥ 90%', verified: false },
    { label: 'Cycle life', value: '8,000 cycles @ 70% EOL', verified: false },
    { label: 'Enclosure rating', value: 'IP55', verified: false },
    { label: 'Operating range', value: '−20 °C to 55 °C', verified: false },
    { label: 'Thermal management', value: 'Liquid cooled', verified: false },
    { label: 'Fire safety', value: 'Aerosol suppression + gas detection', verified: false },
    { label: 'Warranty', value: '10 years', verified: false },
  ],
} as const;

/** Headline figures on the home page. All are placeholders. */
export const stats = [
  { value: '3.44', unit: 'MWh', label: 'Per Pod Gen 1 container', verified: false },
  { value: '20', unit: 'ft', label: 'Standard ISO footprint', verified: true },
  { value: '8,000', unit: 'cycles', label: 'Design life at 70% EOL', verified: false },
  { value: '100', unit: '%', label: 'Green energy, end to end', verified: true },
] as const;

/**
 * Show a small "provisional" marker next to every figure whose `verified` flag
 * is false, plus an explanatory footnote.
 *
 * Left ON deliberately: publishing placeholder specs as though they were
 * measured numbers is worse than admitting they are provisional. Once the real
 * test data is in — set `verified: true` on each spec above — flip this to
 * `false` and the markers disappear site-wide.
 */
export const showProvisionalMarkers = true;

/** Count of figures still awaiting confirmation. */
export const unverifiedCount =
  podGen1.specs.filter((s) => !s.verified).length +
  stats.filter((s) => !s.verified).length;

export const siteUrl = 'https://www.urjapod.com';
