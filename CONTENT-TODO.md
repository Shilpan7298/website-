# Content to confirm before launch

The live site at `www.urjapod.com` returns `403` to automated clients, so its
copy could not be read directly. Everything below was reconstructed from public
sources — the MCA/RoC company record, LinkedIn, and search-indexed summaries of
the existing site.

Anything marked ❌ is a **placeholder** and is currently rendered with a
"Provisional" badge on the site.

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
