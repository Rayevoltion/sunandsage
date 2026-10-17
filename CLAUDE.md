# Sun & Sage Spaces — project notes

Luxury home organizing + decluttering, Boulder CO. Botanical cleaning products from local regenerative herbs.

## Stack
- Eleventy 3 (Nunjucks) → static `_site`
- Hosting: Cloudflare Pages (build `npm run build`, output `_site`, Node 22 via `.node-version`)
- Editor: Decap CMS at `/admin`, GitHub backend, repo `Rayevoltion/sunandsage`, branch `main`
- Editor login: Pages Functions `functions/auth.js` + `functions/callback.js`; env vars `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`
- OAuth callback: `https://sunandsage.space/callback`; `www` must redirect to apex
- Forms: Typeform, ID in `src/_data/site.json` → `typeformId` (blank = CTAs link to /contact/)

## Content
- All editable content in `src/_data/*.json`: site, home, services, botanicals, about, faq, testimonials
- Editor field definitions in `src/admin/config.yml` — keep in sync with JSON keys
- Never invent testimonials, prices, or ingredients; leave blank until supplied

## Brand
- Colors: linen #FDFCF9, paper #F6F3EC, sage-wash #E9ECE1, sage #7D8C6E, sage-deep #3F4F36, ink #23291F, ink-soft #4A5144, gold #E5C07D, gold-deep #8A6A1F, line #DCD6C8
- Gold #E5C07D never as text on light; use gold-deep
- Fonts: Cormorant Garamond (display), Figtree (body), Questrial (wordmark)
- Tagline: Declutter. Organize. Breathe.
- Services: The Edit, The Arrange, The Reset, The Seasonal

## Hosting decision
- Moved off Netlify: credit pricing (15 credits per production deploy, 300 free/mo)
- Batch changes into one push per session
