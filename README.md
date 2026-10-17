# Sun & Sage Spaces — sunandsage.space

Static site built with Eleventy, hosted on Cloudflare Pages, edited through Decap CMS at `/admin`.

## Pages
Home, Services, Botanicals, About, FAQ, Contact, 404, sitemap.xml, robots.txt.

## Editing content
All words, prices, photos and contact details live in `src/_data/*.json`.
Edit them in the browser at **https://sunandsage.space/admin** (sign in with GitHub).
Each save commits to GitHub; Cloudflare rebuilds the site in about a minute.

## Launch steps
1. **GitHub repo** — create empty private repo `Rayevoltion/sunandsage` and push this folder.
2. **Cloudflare Pages** — Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick `sunandsage`.
   - Framework preset: None
   - Build command: `npm run build`
   - Build output directory: `_site`
3. **Domain** — add `sunandsage.space` to Cloudflare (Add a site → Free plan), then change nameservers at the registrar to the two Cloudflare shows.
   Then Pages project → Custom domains → add `sunandsage.space` and `www.sunandsage.space`.
   Redirect `www` to the bare domain (Rules → Redirect Rules), since the editor login expects `https://sunandsage.space`.
4. **Editor login** — GitHub → Settings → Developer settings → OAuth Apps → New OAuth App:
   - Application name: Sun & Sage Site Editor
   - Homepage URL: `https://sunandsage.space`
   - Authorization callback URL: `https://sunandsage.space/callback`
   Generate a client secret. Then Pages project → Settings → Variables and Secrets (Production):
   - `GITHUB_CLIENT_ID` (plain text)
   - `GITHUB_CLIENT_SECRET` (secret / encrypted)
   Redeploy once after adding them.
5. **HTTPS** — automatic once the domain is active.

## How the editor login works
`functions/auth.js` sends the editor to GitHub. `functions/callback.js` receives GitHub's reply and passes the sign-in back to `/admin`.
Login only works on `https://sunandsage.space`, not on `*.pages.dev` preview links.

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
