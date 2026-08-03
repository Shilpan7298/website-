/**
 * Single source of truth for company facts, navigation and figures.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO EDIT THIS SITE
 * Every number, address, nav item and claim comes from this file. Change it
 * here and it changes everywhere — header, footer, page bodies, JSON-LD.
 *
 * Search the repo for "TODO(confirm)" to find everything still unverified.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const siteUrl = 'https://www.urjapod.com';

export const company = {
  name: 'Urjapod Energy',
  legalName: 'Urjapod Energy Private Limited',
  /** Used as the meta description fallback and in structured data. */
  tagline:
    'Battery energy storage solutions for renewable power plants and grid-scale energy storage.',
  /** Verified against the MCA / RoC-Ahmedabad public record. */
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

/**
 * The Bill Analyser.
 *
 * TODO(confirm): point this at the real tool. It is treated as an EXTERNAL
 * link — rendered with an outbound icon, target="_blank" and rel="noopener".
 * If it turns out to live on this site instead, change `external` to false
 * and the nav will render it as an ordinary internal link.
 */
export const billAnalyser = {
  label: 'Bill Analyser',
  href: 'https://www.urjapod.com/bill-analyser',
  external: true,
} as const;

/** Primary navigation. Order matters — it is the order users see. */
export const nav = [
  { label: 'Sodium Ion', href: '/sodium-ion/' },
  { label: 'Product', href: '/product/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/**
 * Legal pages. These slugs deliberately match the ORIGINAL urjapod.com URLs
 * (note the unusual "english-" prefix) so existing inbound links and indexed
 * search results keep working. Do not "tidy" them.
 */
export const legalNav = [
  { label: 'Privacy Policy', href: '/english-privacy-policy/' },
  { label: 'Accessibility', href: '/accessibility-statement/' },
] as const;

/**
 * The company's three stated areas of work, carried over from the live site.
 * Wording is a light edit of Urjapod's own copy for grammar and rhythm — the
 * substance and the ordering are theirs.
 */
export const pillars = [
  {
    icon: 'layers',
    title: 'Technical solutions',
    body: 'We provide technical solutions to our partners right from the early pre-bid stage, through project construction, and across the whole project life cycle.',
  },
  {
    icon: 'sun',
    title: 'Renewable power plants',
    body: 'Solar, wind and wind–solar hybrid plants work exceptionally well with Urjapod storage. Together we design robust, cost-effective and advanced systems that reduce losses and improve the realisations from your renewable assets.',
  },
  {
    icon: 'grid',
    title: 'Grid-scale storage',
    body: 'As more renewables connect to the grid, grid management gets complicated. We help optimise future capacity expansion with BESS, so utilities reduce their CAPEX and increase resilience through strategic deployment of storage.',
  },
] as const;

/** The company's stated ambition, from the live site. */
export const vision =
  "Urjapod aims to further the advancement in grid-scale energy storage by leveraging the latest battery chemistries, compact prismatic cell designs, and AI algorithms for battery management systems — with the goal of being India's best and most reliable BESS brand.";

/**
 * Pod Gen 1 — the flagship container BESS.
 *
 * Verified from the live site: 20 ft container form factor, prismatic LFP
 * cells, AI-enabled BMS, high dust and water resistance, built to global
 * environmental standards.
 *
 * NOTE ON THE CELL SPEC: the live site says "314 V prismatic LFP cells". That
 * is almost certainly a transcription of **314 Ah** — 314 Ah is the standard
 * prismatic LFP cell size, whereas a single LFP cell is ~3.2 V nominal, so a
 * 314 V cell does not exist. Written as 314 Ah below.
 * TODO(confirm): verify and correct if wrong.
 */
export const podGen1 = {
  name: 'Pod Gen 1',
  summary:
    'A modular, container-sized battery for grid-scale energy storage — built from high-quality prismatic LFP cells, driven by an AI-enabled battery management system, and housed in a standard 20 ft container.',
  features: [
    'High energy density',
    'Robust inbuilt safety protections',
    'High dust and water resistance',
    'Complies with global environmental standards',
  ],
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

/**
 * Sodium-ion. A page of its own, matching the live site's navigation.
 * The original spells it "Prizmatic"; corrected to "prismatic" throughout.
 */
export const sodiumIon = {
  status: 'Prototype in development',
  headline: "India's 1st prototype batteries with prismatic sodium-ion cells.",
  summary:
    'Sodium-ion is an upcoming battery chemistry that is ideal for energy storage applications. It is inherently safer, lasts longer, works across a wider operating temperature range, and costs less.',
  benefits: [
    {
      icon: 'shield',
      title: 'Inherently safer',
      body: 'Sodium-ion can be transported and stored safely at zero volts, which lithium chemistries cannot. That removes a whole class of handling and shipping risk.',
    },
    {
      icon: 'gauge',
      title: 'Longer life',
      body: 'It tolerates deep daily cycling with less degradation per cycle — which is exactly the duty a grid storage asset is put through every single day.',
    },
    {
      icon: 'thermometer',
      title: 'Wider temperature range',
      body: 'It holds capacity across a broader operating window, including cold conditions where lithium cells lose usable energy.',
    },
    {
      icon: 'leaf',
      title: 'Lower cost',
      body: 'Sodium is abundant, and the chemistry needs no lithium, cobalt or nickel — taking critical-mineral volatility out of the cost curve.',
    },
  ],
} as const;

/**
 * Show a "Provisional" marker beside every figure whose `verified` flag is
 * false, plus an explanatory footnote.
 *
 * Left ON deliberately: publishing placeholder specs as though they were
 * measured numbers is worse than admitting they are provisional. Once the real
 * data is in, set `verified: true` per spec and flip this to false.
 */
export const showProvisionalMarkers = true;

export const unverifiedCount = podGen1.specs.filter((s) => !s.verified).length;
