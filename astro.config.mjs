// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://loremmaker.com',
	integrations: [
		sitemap({
			filter: (page) => !page.endsWith('/404') && !page.endsWith('/500'),
			// lastmod only where we know the real date of the last content change.
			serialize(item) {
				const path = new URL(item.url).pathname;
				/** @type {Record<string, string>} */
				const known = {
					'/': '2026-11-15',
					'/dummy-text-generator/': '2026-11-15',
					'/100-characters-text/': '2026-11-15',
					'/random-sentence-generator/': '2026-11-15',
					'/privacy-policy/': '2026-09-12',
					'/terms/': '2026-09-12',
				};
				const lastmod = path in known ? known[path] : path.length > 1 && !['/about/', '/contact/'].includes(path) ? '2026-11-03' : undefined;
				if (lastmod) item.lastmod = lastmod;
				return item;
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
