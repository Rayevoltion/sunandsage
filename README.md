# Sun & Sage Spaces — sunandsage.space

Static site built with Eleventy, hosted on Netlify, edited through Decap CMS at `/admin`.

## Pages
Home, Services, Botanicals, About, FAQ, Contact, 404, sitemap.xml, robots.txt.

## Editing content
All words, prices, photos and contact details live in `src/_data/*.json`.
Edit them in the browser at **https://sunandsage.space/admin** (sign in with GitHub).
Each save commits to GitHub; Netlify rebuilds the site in about a minute.

## Launch steps
1. Create GitHub repo `sunandsage` and push this folder.
2. In `src/admin/config.yml`, replace `OWNER/sunandsage` with the real repo path.
3. Netlify → Add new site → Import from GitHub → pick repo. Build settings come from `netlify.toml`.
4. Admin login: create a GitHub OAuth App (GitHub → Settings → Developer settings → OAuth Apps).
   - Homepage URL: `https://sunandsage.space`
   - Callback URL: `https://api.netlify.com/auth/done`
   Then Netlify → Site configuration → Access & security → OAuth → Install provider → GitHub, paste Client ID and Secret.
5. Netlify → Domain management → Add `sunandsage.space`. Use Netlify DNS (change nameservers at registrar) or add the records Netlify shows.
6. HTTPS: Netlify issues the certificate automatically once DNS resolves.

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
