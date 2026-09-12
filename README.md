# Lorem Ipsum Generator

A fast, client-side Lorem Ipsum generator built with Astro and Tailwind CSS. Generate placeholder text by paragraphs, sentences, words, or an exact character count — in classic Latin or one of five themed word banks — and export it as plain text, HTML, or Markdown.

**Live site:** [https://loremmaker.com](https://loremmaker.com)

## Features

- **Multiple output units** — generate by paragraphs, sentences, words, or an exact character count
- **Six word banks** — Classic Latin, Corporate, Tech/Startup, Foodie, Cat, and Funny
- **Export formats** — copy as plain text, HTML (`<p>`-wrapped), or Markdown
- **Live word/character counts** — updates instantly as you configure the output
- **One-click copy** — Clipboard API with a visible confirmation state
- **Keyboard shortcut** — `⌘/Ctrl + Enter` to regenerate
- **No page reloads, no sign-up** — everything runs client-side in the browser
- **SEO-ready** — sitemap, meta tags, and dedicated FAQ/About/Contact pages

## Tech Stack

- [Astro](https://astro.build) — static site framework
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- TypeScript — generator logic and word banks
- [Cloudflare Workers](https://workers.cloudflare.com) — hosting/deployment via Wrangler

## Project Structure

```text
/
├── public/                  # Static assets, favicons, robots.txt, manifest
├── src/
│   ├── components/          # Hero, Generator, Navbar, Themes, FAQ, About, Footer, SEOContent
│   ├── layouts/              # PageLayout.astro
│   ├── lib/                  # generator.ts, wordBanks.ts, faqs.ts
│   ├── pages/                # index, about, contact, privacy-policy, terms, 404, 500
│   └── styles/                # global.css
├── astro.config.mjs
├── wrangler.jsonc
└── package.json
```

## Getting Started

```sh
# Install dependencies
npm install

# Start the local dev server (http://localhost:4321)
npm run dev

# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
```

## Commands

| Command             | Action                                              |
| :------------------- | :--------------------------------------------------- |
| `npm run dev`        | Start local dev server at `localhost:4321`           |
| `npm run build`      | Build the production site to `./dist/`               |
| `npm run preview`    | Preview the production build locally                  |
| `npm run astro ...`  | Run Astro CLI commands (e.g. `astro check`)           |
| `npm run deploy`     | Build and deploy to Cloudflare Workers via Wrangler   |
| `npm run cf:dev`     | Run the site locally through the Wrangler dev runtime |

## Deployment

The site is deployed to Cloudflare Workers. Configuration lives in `wrangler.jsonc`; running `npm run deploy` builds the Astro site and publishes it with Wrangler.
