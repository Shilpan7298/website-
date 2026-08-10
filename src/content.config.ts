import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog collection.
 *
 * TO ADD A POST: drop a .md file into src/content/blog/. The filename becomes
 * the URL slug, so `sodium-ion-explained.md` publishes at
 * /blog/sodium-ion-explained/. Nothing else needs touching — the index page,
 * the sitemap and the Article structured data all pick it up automatically.
 *
 * The schema below is enforced at build time. A post missing a required field
 * fails the build loudly rather than publishing something half-formed.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    /** Shown as the <h1> and the <title>. Keep under ~60 chars for search. */
    title: z.string().max(90),
    /** The meta description and the card summary. Aim for 120–160 chars. */
    description: z.string().min(50).max(200),
    pubDate: z.coerce.date(),
    /** Set when materially revising a post; search engines value freshness. */
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Urjapod Energy'),
    tags: z.array(z.string()).default([]),
    /** Draft posts are excluded from the build entirely. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
