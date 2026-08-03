# Content to confirm before launch

The live site could not be fetched directly: outbound page fetching is blocked
in the environment this was built in (every URL returns `403`, including
`example.com`, so it is the tooling, not Wix bot-protection as first assumed).

Copy was therefore recovered from **search-engine indexes of the live pages**
plus the MCA/RoC company record. That gives Urjapod's actual wording for the
substantive sections, but it is a reconstruction, not a byte-for-byte copy —
**please read the new pages against the live site and tell me anything missing
or misworded.**

Anything marked ❌ is a **placeholder** and is currently rendered with a
"Provisional" badge on the site.

---

## 0. Page map — original vs. new

Every original URL is preserved, so no inbound link or search result breaks.

| Original page | Status in the new site |
| --- | --- |
| `/` | ✅ Rebuilt, leads with the original tagline |
| `/products` | ✅ Rebuilt as a product *range* — Pod Gen 1 + sodium-ion |
| `/contact` | ✅ Rebuilt |
| `/accessibility-statement` | ✅ Added at the same URL — see §7 |
| `/english-privacy-policy` | ✅ Added at the same URL (odd slug kept deliberately) — see §7 |
| — | ➕ `/technology`, `/solutions`, `/about` are new |

## 0b. Original copy now carried over

These were missing from the first draft and are now on the site, lightly edited
for grammar and tone but keeping Urjapod's substance and ordering:

- "Your partner for energy storage needs and 100% green energy implementation,
  from concept to commissioning" — now the home page lead
- **Technical solutions** — "right from the early pre-bid stage, through
  project construction, and across the whole project life cycle"
- **Renewable power plants** — "reduce losses and improve the realisations from
  your renewable assets"
- **Grid-scale storage** — "utilities reduce their CAPEX and increase
  resilience through the strategic deployment of energy storage"
- **The ambition** — "leveraging the latest battery chemistries, compact
  prismatic cell designs, and AI algorithms… India's best and most reliable
  BESS brand" — now its own section on the home page
- **Products framing** — "a range of high-quality grid-scale battery energy
  storage systems and power plant solutions designed to meet the demanding
  requirements of modern energy grids"
- **Sodium-ion** — promoted from a footnote to a product line, as on the
  original site

Spelling note: the original writes "Prizmatic"; corrected to "prismatic"
throughout.

---

## 1. Verified — no action needed

These came from public records and match across multiple sources.

| Item | Value |
| --- | --- |
| Legal name | Urjapod Energy Private Limited |
| CIN | U27900GJ2025PTC163530 |
| Incorporated | 29 May 2025, RoC-Ahmedabad |
| Registered office | 403 Aniket Complex, C.G. Road, Navrangpura, Ahmedabad, Gujarat 380009 |
| Email | shilpan@urjapod.com |
| Phone | +91 81540 70298 |
| Product | Pod Gen 1 — 20 ft container, prismatic LFP cells, AI-enabled BMS |
| R&D | India's first prototype batteries with prismatic sodium-ion cells |
| Services | Design, construction, and O&M for solar, wind and hybrid plants |

Sources listed at the bottom of this file.

---

## 2. ⚠️ One spec needs correcting, not just confirming

Public listings describe Pod Gen 1 as using **"314 V prismatic LFP cells."**

That is almost certainly a transcription error for **314 Ah**:

- 314 Ah is the current industry-standard prismatic LFP cell size.
- A single LFP cell is ~3.2 V nominal. A 314 V cell does not exist — 314 V would
  be a *rack* or *string* voltage, not a cell.

The site currently says **314 Ah**. Please confirm which is right and correct
`podGen1.specs` in `src/data/site.ts`. If it is meant to be a string voltage,
the label should change from "Cell capacity" to "String voltage" too.

---

## 3. ❌ Placeholders — replace with real figures

All in `podGen1.specs` and `stats` in `src/data/site.ts`. Each currently renders
with a "Provisional" badge.

| Spec | Placeholder | Notes |
| --- | --- | --- |
| Cell capacity | 314 Ah | See section 2 |
| Usable energy | 3.44 MWh | Appears on the home page and in the bento grid |
| System voltage | 1500 V DC | |
| Round-trip efficiency | ≥ 90% | |
| Cycle life | 8,000 cycles @ 70% EOL | Appears in the bento grid |
| Enclosure rating | IP55 | Public copy says "high dust and water resistance" — needs the actual IP rating |
| Operating range | −20 °C to 55 °C | |
| Thermal management | Liquid cooled | Confirm whether liquid or forced-air |
| Fire safety | Aerosol suppression + gas detection | Confirm the actual suppression system |
| Warranty | 10 years | |

---

## 4. ❌ Claims that need substantiating

Written as generic capability statements rather than specific claims, but worth
a check by someone who knows the detail:

- **"Complies with global environmental standards"** — carried over from existing
  public copy. Which standards? Naming them (IEC 62619, UL 9540A, UN 38.3, CE)
  would be far stronger than the generic phrase.
- **Certifications** — none are claimed anywhere on the site. If any exist, they
  belong on the products page.
- **Chemistry comparison table** (`/technology/`) — the LFP / sodium-ion / NMC
  figures are indicative, widely-published cell-level characteristics, and the
  table says so in a footnote. They are not Urjapod measurements.
- **BMS capabilities** — predictive balancing, early fault detection and state
  estimation are described on `/technology/`. Confirm these match what the BMS
  actually does.
- **Sodium-ion status** — the site says prototype-stage R&D, explicitly *not* in
  a shipping Pod. Confirm that framing is accurate.

---

## 5. Missing entirely — worth adding

- **Photography.** There is none. The Pod Gen 1 illustration is a hand-drawn SVG
  standing in for a real product render or photograph. Swapping it in is the
  single biggest visual upgrade available; keep the wrapping aspect-ratio box so
  layout does not shift.
- **Leadership / team.** The About page has no people on it.
- **Projects or case studies.** No deployments are referenced anywhere.
- **Customer or partner logos.** The design has a natural slot for these.
- **Manufacturing facility.** The company record lists manufacture of electrical
  equipment; the site says nothing about where or at what scale.
- **GST number**, if you want it shown for procurement.

---

## 7. ⚠️ The two legal pages on the live site are unedited Wix templates

This is worth knowing regardless of the redesign.

- **`/accessibility-statement`** still contains the Wix template's own authoring
  instructions — text to the effect of *"this page currently has two sections;
  once editing is complete, one section needs to be deleted."* That is
  boilerplate that was never filled in, and it is publicly visible.
- **`/english-privacy-policy`** similarly reads as generic guidance about what
  a privacy policy should contain, rather than what Urjapod actually does with
  data.

I did **not** copy either across. Instead:

- The new **accessibility statement** describes what is actually true of this
  build, all of it measured rather than asserted — contrast ratios, keyboard
  access, heading structure, reduced-motion support — and names two real
  limitations rather than claiming none.
- The new **privacy policy** describes how the site actually behaves: static,
  no analytics, no cookies, no third-party scripts, and a contact form that
  currently opens your own mail client so no data reaches a server.

> **Both need a lawyer's review before launch.** The privacy policy carries a
> visible "draft — needs legal review" notice on the page itself. Check it
> against India's Digital Personal Data Protection Act, 2023, and against GDPR
> if you market into the EU. **It must be updated the moment you add analytics
> or a contact-form backend** — it currently states those do not exist.

## 6. Wiring still needed

- **Contact form backend.** `FORM_ENDPOINT` in `src/components/ContactForm.tsx`
  is empty, so the form currently falls back to opening the visitor's mail
  client with the message pre-filled. Point it at Formspree, Web3Forms, Basin or
  your own handler to capture submissions properly.

---

## Sources

- [Urjapod Energy — company profile, Tracxn](https://tracxn.com/d/legal-entities/india/urjapod-energy-private-limited/__gnX2pxQWE9ZAy360jS9lEQIray3pD1Kq2cmQ0HJoags)
- [URJAPOD ENERGY PRIVATE LIMITED, IndiaFilings](https://www.indiafilings.com/search/urjapod-energy-private-limited-cin-U27900GJ2025PTC163530)
- [URJAPOD ENERGY PRIVATE LIMITED, InstaFinancials](https://www.instafinancials.com/company/urjapod-energy-private-limited-U27900GJ2025PTC163530)
- [Urjapod Energy Pvt Ltd, Credhive](https://www.credhive.in/ind/corporate/U27900GJ2025PTC163530/URJAPOD%20ENERGY%20PRIVATE%20LIMITED/overview)
- [Urjapod Energy, LinkedIn](https://in.linkedin.com/company/urjapod-energy)
- [Urjapod Energy Pvt Ltd, JustDial](https://www.justdial.com/Ahmedabad/Urjapod-Energy-Pvt-Ltd-Navrangpura-Bopal/079PXX79-XX79-250707220539-G5Z6_BZDET)
