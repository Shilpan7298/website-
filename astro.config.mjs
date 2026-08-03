// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Drives canonical URLs, OG tags and the sitemap. Change this and
  // `siteUrl` in src/data/site.ts together if the domain ever moves.
  site: 'https://www.urjapod.com',

  // No `output` key, so Astro defaults to fully static: `npm run build`
  // emits plain HTML to dist/. There is no server and no adapter, which is
  // why this deploys to any static host unchanged.
  integrations: [
    // Enables React components. It does NOT put React on every page — only
    // components with a `client:*` directive ship a runtime. Exactly one does
    // (ContactForm on /contact); the other five pages stay zero-JS.
    react(),
    // Generates sitemap-index.xml from the built routes at build time.
    sitemap(),
  ],

  vite: {
    // Tailwind v4 runs as a Vite plugin — there is no tailwind.config.js.
    // Design tokens are declared with @theme in src/styles/global.css.
    plugins: [tailwindcss()],
  },
});
