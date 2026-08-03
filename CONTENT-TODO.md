# Content to confirm before launch

The live site could not be fetched directly: outbound page fetching is blocked
in the environment this was built in — **every** URL returns `403`, including
`example.com`, so it is the tooling, not Wix bot-protection.

Copy was therefore recovered from **search-engine indexes of the live pages**
plus the MCA/RoC company record. That gives Urjapod's actual wording for the
substantive sections, but it is a reconstruction, not a byte-for-byte copy.
**Please read the pages against the live site and flag anything missing.**

---

## 1. Decisions I made without you

You listed the pages as *"home, sodium ion, product, content, blog and link to
bill analyser"*. Three judgement calls:

| Item | What I did | Change it by |
| --- | --- | --- |
| **"content"** | Read as **Contact** — the live site has `/contact` and no `/content`. | If you meant a separate Content page, say so and I will add it. |
| **Bill Analyser** | Treated as an **external link**, placeholder URL `https://www.urjapod.com/bill-analyser`. | `billAnalyser` in `src/data/site.ts`. Set `external: false` if it is an internal page. |
| **Blog** | Built as a **working Markdown blog** with one example post, since no blog content was indexed. | Replace/add files in `src/content/blog/`. |

I also kept `/english-privacy-policy` and `/accessibility-statement` at their
original URLs, so inbound links and indexed results do not break.

---

## 2. ⚠️ One spec needs correcting, not just confirming

The live site describes Pod Gen 1 as using **"314 V prismatic LFP cells."**

That is almost certainly a transcription error for **314 Ah**:

- 314 Ah is the current industry-standard prismatic LFP cell size.
- A single LFP cell is ~3.2 V nominal. A 314 V cell does not exist — 314 V
  would be a *rack* or *string* voltage, not a cell.

The site currently says **314 Ah**. Please confirm and correct
`podGen1.specs` in `src/data/site.ts`. If it is meant to be a string voltage,
the label should change from "Cell capacity" to "String voltage" too.

---

## 3. ❌ Placeholders — replace with real figures

All in `podGen1.specs`. Each renders with a "Provisional" badge today.

| Spec | Placeholder |
| --- | --- |
| Cell capacity | 314 Ah — see section 2 |
| Usable energy | 3.44 MWh |
| System voltage | 1500 V DC |
| Round-trip efficiency | ≥ 90% |
| Cycle life | 8,000 cycles @ 70% EOL |
| Enclosure rating | IP55 |
| Operating range | −20 °C to 55 °C |
| Thermal management | Liquid cooled |
| Fire safety | Aerosol suppression + gas detection |
| Warranty | 10 years |

Only `verified: true` specs are published as `Product` structured data —
machine-readable claims should be true, so provisional figures stay out of it.

---

## 4. Verified — no action needed

| Item | Value |
| --- | --- |
| Legal name | Urjapod Energy Private Limited |
| CIN | U27900GJ2025PTC163530 |
| Incorporated | 29 May 2025, RoC-Ahmedabad |
| Registered office | 403 Aniket Complex, C.G. Road, Navrangpura, Ahmedabad, Gujarat 380009 |
| Email | shilpan@urjapod.com |
| Phone | +91 81540 70298 |
| Product | Pod Gen 1 — 20 ft container, prismatic LFP, AI-enabled BMS |
| R&D | India's 1st prototype batteries with prismatic sodium-ion cells |

Original copy carried over, lightly edited for grammar but keeping Urjapod's
substance and ordering: the "partner … from concept to commissioning"
positioning; the three areas of work (technical solutions from pre-bid stage,
renewable power plants, grid-scale storage); the ambition to be India's best
and most reliable BESS brand; the Pod Gen 1 feature list.

Spelling: the original writes "Prizmatic"; corrected to "prismatic".

---

## 5. ⚠️ The two legal pages on the live site are unedited Wix templates

Worth knowing regardless of the redesign.

- **`/accessibility-statement`** still contains the Wix template's own
  authoring instructions — text to the effect of *"this page currently has two
  sections; once editing is complete, one section needs to be deleted."* That
  is publicly visible today.
- **`/english-privacy-policy`** reads as generic guidance about what a privacy
  policy should contain, rather than what Urjapod does with data.

Neither was copied across. The new pages describe what is actually true: the
accessibility statement lists this build's measured contrast, keyboard,
heading and reduced-motion behaviour and names two real limitations; the
privacy policy describes real data handling (static, no analytics, no cookies,
mail-client contact form).

> **Both need a lawyer's review before launch.** The privacy policy carries a
> visible "draft — needs legal review" notice. Check against India's Digital
> Personal Data Protection Act, 2023, and GDPR if you market into the EU.
> **It must be updated the moment you add analytics or a form backend** — it
> currently states those do not exist.

---

## 6. Missing entirely — worth adding

- **Photography.** There is none. The Pod Gen 1 illustration is a hand-drawn
  SVG standing in for a real render or photograph. Swapping it in is the
  single biggest visual upgrade available — keep the wrapping aspect-ratio box
  so layout does not shift.
- **Original logo artwork.** The logo is rebuilt as vector from the supplied
  image. If you have the designer's source file, drop it in and replace the
  paths in `src/components/Logo.astro`.
- **Leadership / team**, **projects or case studies**, **customer logos**,
  **certifications** — none are referenced anywhere.

---

## 7. Wiring still needed

- **Bill Analyser URL** — `billAnalyser.href` in `src/data/site.ts`.
- **Contact form backend** — `FORM_ENDPOINT` in
  `src/components/ContactForm.tsx` is empty, so the form falls back to opening
  the visitor's mail client. Note that while the constant is empty the bundler
  strips the network path entirely, so it has never been exercised.
