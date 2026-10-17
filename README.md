# Sun & Sage Spaces — sunandsage.space

Static site built with Eleventy, hosted on Cloudflare Workers (static assets), edited through Decap CMS at `/admin`.

## Pages
Home, Services, Botanicals, About, FAQ, Contact, 404, sitemap.xml, robots.txt.

## Editing content
All words, prices, photos and contact details live in `src/_data/*.json`.
Edit them in the browser at **https://sunandsage.space/admin** (sign in with GitHub).
Each save commits to GitHub; Cloudflare rebuilds the site in about a minute.

## Launch steps
1. **GitHub repo** — `Rayevoltion/sunandsage` (done).
2. **Cloudflare Worker** — Workers & Pages → Create application → Connect GitHub → `sunandsage`.
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   Settings come from `wrangler.jsonc`.
3. **Domain** — add `sunandsage.space` to Cloudflare (Free plan), change nameservers at the registrar.
   Then Worker → Settings → Domains & Routes → add custom domain `sunandsage.space` and `www.sunandsage.space`.
   Redirect `www` to the bare domain (Rules → Redirect Rules); the editor login expects `https://sunandsage.space`.
4. **Editor login** — GitHub → Settings → Developer settings → OAuth Apps → New OAuth App:
   - Application name: Sun & Sage Site Editor
   - Homepage URL: `https://sunandsage.space`
   - Authorization callback URL: `https://sunandsage.space/callback`
   Generate a client secret. Then Worker → Settings → Variables and Secrets:
   - `GITHUB_CLIENT_ID` (text)
   - `GITHUB_CLIENT_SECRET` (secret)
5. **HTTPS** — automatic once the domain is active.

## How the editor login works
`worker/index.js` handles `/auth` (sends the editor to GitHub) and `/callback` (passes the sign-in back to `/admin`).
All other requests are static files from `_site`, served free.
Login only works on `https://sunandsage.space`, not on `*.workers.dev` preview links.

## Typeform
Paste the form ID (the code at the end of the Typeform share link) into **Business info → Typeform form ID**.
- Every "Book a consultation" button opens it as a popup.
- Contact page shows it inline.
- Blank ID: buttons link to the Contact page instead.

## Local preview
```
npm install
npm start
```
