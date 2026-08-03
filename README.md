# Urjapod Energy — website

A redesign of [urjapod.com](https://www.urjapod.com) built as a static site: six
pages, zero external JavaScript on five of them, and a single self-hosted font
file for the whole thing.

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | [Astro 7](https://astro.build) | Ships HTML by default; JS only where a component asks for it |
| Styling | Tailwind CSS v4 (`@theme` tokens) | Design tokens live in CSS, no config file, no runtime |
| Interactivity | React 19, one island | Contact form only, hydrated with `client:visible` |
| Fonts | Plus Jakarta Sans (variable, latin subset) | Self-hosted, preloaded, 27 KB for every weight |
| Output | Static (`dist/`) | Deploys anywhere — Netlify, Vercel, Cloudflare Pages, S3, nginx |

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve the built output
npm run check    # astro check — typecheck .astro and .tsx
```

Node 20+ required.

## Measured payload

Per-page transfer for a first visit, gzipped:

| Page | HTML | External JS |
| --- | --- | --- |
| Home | 10.0 KB | none |
| Products | 7.8 KB | none |
| Technology | 8.0 KB | none |
| Solutions | 7.3 KB | none |
| About | 6.3 KB | none |
| Contact | 7.4 KB | 62 KB (React + form island) |

Shared across all pages: 7.5 KB CSS + 27 KB font. Five of the six pages carry
roughly 1.8 KB of inline script — the nav toggle, the scroll-reveal observer and
the JSON-LD block — and nothing else.

Verified against the build with Playwright: no page scrolls horizontally at
375 / 768 / 1440 px, no console errors, and every text/background pair passes
WCAG AA contrast.

## Editing content

**Everything factual lives in one file: [`src/data/site.ts`](src/data/site.ts).**
Company details, contact info, navigation, Pod Gen 1 specifications and the
headline statistics are all defined there and consumed by every page.

Figures that could not be verified from public sources are flagged
`verified: false` and render with a small **Provisional** badge. See
[`CONTENT-TODO.md`](CONTENT-TODO.md) for the full list of what needs confirming
before this goes live.

To hide the badges once real data is in, set each spec's `verified: true`, then
flip `showProvisionalMarkers` to `false` in the same file.

## Project structure

```
src/
  data/site.ts             all company facts, specs and figures
  layouts/BaseLayout.astro SEO, JSON-LD, font preload, skip link, reveal observer
  styles/global.css        design tokens (@theme), base styles, reveal animation
  components/
    icons.ts               Lucide path data + IconName type
    Icon.astro             inline SVG renderer
    ContactForm.tsx        the only React island
    PodVisual.astro        Pod Gen 1 drawn as vector — no image request
    CapabilityBento.astro  bento grid (adapted from 21st.dev)
    ChemistryTable.astro   LFP / sodium-ion / NMC comparison (adapted from 21st.dev)
    ...
  pages/                   one .astro file per route
public/
  fonts/                   Plus Jakarta Sans, latin subset
  og.png                   social share card
design-system/
  urjapod-energy/MASTER.md generated design system — palette, type, motion, rules
```

## Design system

Colour, typography, spacing, shadows and motion decisions are recorded in
[`design-system/urjapod-energy/MASTER.md`](design-system/urjapod-energy/MASTER.md),
generated with the `ui-ux-pro-max` skill and implemented as Tailwind `@theme`
tokens in `src/styles/global.css`.

The palette is a light enterprise navy: `ink-*` for the navy neutral ramp,
`accent-*` for the blue CTA, `energy-*` for green-energy signals. Body copy sits
at `ink-600`/`ink-700` on light surfaces and `ink-400` on navy — those are the
lightest values that clear 4.5:1.

**Never hardcode a hex in a component.** Add or change a token instead.

## Third-party components

Two components were sourced through the [21st.dev](https://21st.dev) MCP and
rewritten as static Astro, dropping their React/shadcn/framer dependencies:

- `CapabilityBento.astro` — grid structure from
  [Feature Bento](https://21st.dev/@uilayout.contact/components/feature-bento) by @uilayout.contact
- `ChemistryTable.astro` — grouped comparison layout from
  [Feature Comparison Table](https://21st.dev/@7ovr/components/comparison-3) by @7ovr

## Deployment

`npm run build` emits a fully static `dist/`. No server, no adapter, no
environment variables.

Two things to set before launch:

1. **Contact form endpoint** — `FORM_ENDPOINT` in
   [`src/components/ContactForm.tsx`](src/components/ContactForm.tsx). Until it
   is set the form validates and then opens the visitor's mail client with the
   message pre-filled, so it still works.
2. **Canonical host** — `site` in [`astro.config.mjs`](astro.config.mjs) and
   `siteUrl` in `src/data/site.ts`, if the domain ever changes. These drive
   canonical URLs, the sitemap and OG tags.
