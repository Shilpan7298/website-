# Urjapod Energy — website

A redesign of [urjapod.com](https://www.urjapod.com) built as a static site,
themed from the company logo, and optimised for search.

## Pages

Matches the live site's structure:

| Route | Page |
| --- | --- |
| `/` | Home |
| `/sodium-ion/` | Sodium Ion |
| `/product/` | Product — Pod Gen 1 |
| `/blog/` | Blog index |
| `/blog/<slug>/` | Blog post |
| `/contact/` | Contact |
| `/english-privacy-policy/` | Privacy Policy — original URL preserved |
| `/accessibility-statement/` | Accessibility Statement — original URL preserved |

The **Bill Analyser** is a nav button, treated as an external link. Its URL is
a single constant — `billAnalyser` in [`src/data/site.ts`](src/data/site.ts).
Set `external: false` there and it renders as an internal link instead.

## Brand

Colours are sampled from the logo — there are exactly three ingredients:

| Token | Value | Role |
| --- | --- | --- |
| `brand-600` | `#2b4c9b` | The battery blue. Primary, headings, buttons. |
| `volt-500` | `#f5a623` | The lightning bolt. Accent only. |
| white | `#ffffff` | The mark and wordmark. |

**One rule worth knowing:** amber on white measures 2.0:1, which fails WCAG
badly. So `volt` is never used as text on a light background — only as a fill,
a rule, an icon, or a background behind dark text. `brand-600` on white is
8.0:1 and safe everywhere. The full reasoning is commented in
[`src/styles/global.css`](src/styles/global.css).

The logo is rebuilt as inline SVG in
[`src/components/Logo.astro`](src/components/Logo.astro) so it stays sharp at
any size and needs no image request. If you have the original vector artwork,
replace the paths there and `public/logo.svg` / `public/favicon.svg` together.

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | [Astro 7](https://astro.build) | Ships HTML by default; JS only where asked for |
| Styling | Tailwind CSS v4 (`@theme` tokens) | Tokens in CSS, no config file, no runtime |
| Interactivity | React 19, one island | Contact form only, `client:visible` |
| Content | Astro content collections | Blog posts are Markdown files |
| Fonts | Plus Jakarta Sans (variable, latin) | Self-hosted, preloaded, 27 KB total |
| Output | Static (`dist/`) | Deploys anywhere — Netlify, Vercel, Cloudflare, S3, nginx |

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321 — hot reload, use while editing
npm run build    # → dist/
npm run preview  # serves the real built output
npm run check    # astro check — typechecks .astro and .tsx
```

**Node 22.12 or newer is required** (Astro 7 declares
`engines.node: ">=22.12.0"`). On older Node the build fails with errors that do
not obviously point at the Node version, so check `node -v` first.

`dev` and `preview` are not equivalent: `dev` is unminified with source maps,
`preview` serves the real `dist/` that a visitor gets. Test performance and the
contact form against `preview`.

## Adding a blog post

Drop a Markdown file into `src/content/blog/`. The filename becomes the URL
slug. Frontmatter is validated at build time — a post missing a required field
fails the build rather than publishing half-formed.

```markdown
---
title: "Your title"
description: "50–200 characters. This is the meta description and the card summary."
pubDate: 2026-08-03
tags: ["Grid", "BESS"]
draft: false
---

Body in Markdown.
```

The index page, the sitemap and the Article structured data all pick it up
automatically. Set `draft: true` to exclude a post from the build entirely.

## SEO

Handled in [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro), so
pages only supply their own title and description:

- Unique `<title>` and meta description per page, canonical URLs
- Open Graph + Twitter cards, with a generated 1200×630 share image
- **Structured data**: `Organization` and `WebSite` site-wide;
  `BreadcrumbList` on every sub-page; `Product` on `/product/`; `FAQPage` on
  the home page; `Blog` on the index; `BlogPosting` on each post
- `sitemap-index.xml` generated at build; `robots.txt` points at it
- Semantic headings — one `<h1>` per page, no skipped levels
- Full name/address/phone in the footer of every page for local search

The home page FAQ is rendered visibly *and* as `FAQPage` schema. Google
penalises markup with no on-page counterpart, so if you edit one, edit both —
they are generated from the same array in `src/pages/index.astro`.

## Editing content

Everything factual lives in [`src/data/site.ts`](src/data/site.ts) — company
details, navigation, Pod Gen 1 specs, the sodium-ion copy, the Bill Analyser
URL. Change it there and it changes everywhere.

Figures that could not be verified are flagged `verified: false` and render a
**Provisional** badge. See [`CONTENT-TODO.md`](CONTENT-TODO.md) for the full
list. To hide the badges once real data is in, set each spec's
`verified: true`, then flip `showProvisionalMarkers` to `false`.

## Deployment

`npm run build` emits a fully static `dist/`. No server, no adapter, no
environment variables.

Before launch:

1. **Bill Analyser URL** — `billAnalyser.href` in `src/data/site.ts`.
2. **Contact form endpoint** — `FORM_ENDPOINT` in
   [`src/components/ContactForm.tsx`](src/components/ContactForm.tsx). Until it
   is set, the form validates then opens the visitor's mail client with the
   message pre-filled, so it still works. Note the fetch path is
   dead-code-eliminated while the constant is empty — set it and rebuild.
3. **Legal review** of the privacy policy and accessibility statement.
