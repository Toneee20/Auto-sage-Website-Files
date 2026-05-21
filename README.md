# AutoSageAI — Official Website

> **Structured Intelligence. Delivered.**
> Remote AI automation, workflow systems, and digital marketing for South African businesses.
> Serving Pretoria · Johannesburg · Cape Town · Durban · Soweto · Vaal · Mpumalanga.

Phone-friendly, split-file static site optimized for GitHub → Vercel deployment with full SEO baked in.

---

## 📦 Repository Contents (10 files)

| File | Size | What it is |
|---|---|---|
| `index.html` | ~2 MB | Markup + SEO meta + JSON-LD schema + embedded logo |
| `style.css` | ~57 KB | All design, layout, animations |
| `script.js` | ~25 KB | All interactivity, page routing, package finder |
| `vercel.json` | ~2 KB | Vercel config — headers, caching, content-types |
| `robots.txt` | ~2 KB | Search engine + AI crawler rules |
| `sitemap.xml` | ~3 KB | SEO sitemap (11 URLs) |
| `llms.txt` | ~5 KB | AI discovery file (ChatGPT / Claude / Perplexity) |
| `site.webmanifest` | ~1 KB | PWA-lite (install to phone home screen) |
| `.gitignore` | <1 KB | Files Git should ignore |
| `README.md` | this | Setup instructions |
| `SEO-CHECKLIST.md` | ~10 KB | Post-deploy SEO action plan |

Zero build step. Zero dependencies. Static files only.

> Note: `index.html` is large (2 MB) because the AutoSageAI logo is embedded as a base64 image to avoid a separate file load. It compresses to ~700 KB over the wire and is cached for fast revisits.

---

## 🚀 Deploy from Phone (no laptop needed)

### Step 1 — Create GitHub repo (2 min)

1. On your phone browser, go to **[github.com/new](https://github.com/new)**
2. Repository name: `autosageai-website`
3. Public or Private — either works
4. **Do NOT** tick "Initialize with README"
5. Tap **Create repository**

### Step 2 — Upload files one at a time (10 min)

On the empty repo page, tap **"uploading an existing file"** then add files in this order. You can upload them all in one go, or do them in batches — GitHub commits each batch as one commit.

**Easiest order** (smallest files first, in case the big one fails):

1. `.gitignore` ⚠️ **iOS hides dotfiles** — if it doesn't appear in your file picker, skip it for now and create it manually at the end (see "If .gitignore is missing" below)
2. `site.webmanifest`
3. `vercel.json`
4. `robots.txt`
5. `sitemap.xml`
6. `llms.txt`
7. `README.md`
8. `SEO-CHECKLIST.md`
9. `script.js`
10. `style.css`
11. `index.html` ⚠️ **This one is 2 MB — upload it on Wi-Fi**

Tap **Commit changes** at the bottom.

### Step 3 — Deploy on Vercel (2 min)

1. Go to **[vercel.com/new](https://vercel.com/new)** on your phone
2. **Continue with GitHub** → authorise
3. Find `autosageai-website` → tap **Import**
4. **Framework Preset**: leave as **Other**
5. Leave everything else default
6. Tap **Deploy**

About 20 seconds later, you'll have a live URL like `autosageai-website.vercel.app`.

### Step 4 — Custom Domain (later)

When you buy `autosageai.co.za`:

1. In Vercel project → **Settings → Domains** → Add `autosageai.co.za` and `www.autosageai.co.za`
2. At your domain registrar, set the DNS records Vercel shows you:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` `www` → `cname.vercel-dns.com`
3. SSL certificate auto-provisions within 5–30 minutes.

---

## 🔧 If `.gitignore` is missing after upload

Some phone browsers hide files starting with a dot. To create it manually:

1. On your GitHub repo page, tap **Add file** → **Create new file**
2. Name it exactly: `.gitignore`
3. Paste this content:
   ```
   .DS_Store
   Thumbs.db
   .vscode/
   .idea/
   *.log
   .vercel
   .env
   node_modules/
   dist/
   build/
   ```
4. Tap **Commit new file**

---

## 🔁 Making Updates from Phone

Any change is just an edit on GitHub:

1. Go to your repo → tap the file you want to edit
2. Tap the pencil ✏️ icon
3. Make your changes in the browser
4. Scroll down → **Commit changes**

Vercel auto-redeploys within 20 seconds.

**Most common edits**:

| What to change | File to edit | What to look for |
|---|---|---|
| Services / pricing | `index.html` | Search for the service name |
| Visual styling (colors, fonts) | `style.css` | Look for `:root` near the top for color variables |
| Page navigation logic | `script.js` | Most logic is at the top |
| SEO title/description | `index.html` | First 50 lines have all meta tags |
| WhatsApp number | `index.html` | Search for `066 001 8931` |
| Service regions | `index.html` | Search for `areaServed` (JSON-LD) |

---

## 🔍 SEO Features Already Built In

**Search engines & AI**
- Optimized title + meta description targeting "AI Automation South Africa"
- 25+ long-tail SA keywords in meta tags
- 6 JSON-LD schema entities: ProfessionalService + OnlineBusiness, WebSite, 3× Service, FAQPage
- Open Graph + Twitter Cards for social link previews
- Canonical URL prevents duplicate content penalties
- Geo tags for ZA local SEO
- `llms.txt` for AI Overview citations (ChatGPT/Claude/Perplexity)
- `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended

**Regional targeting (5 administrative areas, 23 cities)**
- **Gauteng**: Pretoria, Johannesburg, Soweto, Centurion, Midrand, Sandton
- **Western Cape**: Cape Town, Stellenbosch, Paarl
- **KwaZulu-Natal**: Durban, Pietermaritzburg, Umhlanga
- **Vaal Triangle**: Vereeniging, Vanderbijlpark, Sasolburg, Meyerton
- **Mpumalanga**: Nelspruit/Mbombela, Witbank/eMalahleni, Secunda, Middelburg, Ermelo

**Technical**
- Security headers (X-Frame-Options, Referrer-Policy, etc.) via `vercel.json`
- Smart caching: HTML revalidates, CSS/JS cached 1 day, images 1 year
- Mobile-first, installable as PWA-lite
- Preconnect hints for faster font loading

📖 **After deploy, follow `SEO-CHECKLIST.md`** — Google Search Console + Google Business Profile setup are essential to actually start ranking.

---

## 🖼️ Optional Images to Add Later

The site references these in meta tags. They're not required, but make link previews look professional:

| Filename | Size | Purpose |
|---|---|---|
| `og-image.jpg` | 1200×630 | Social previews on Facebook/LinkedIn/WhatsApp |
| `logo.png` | any | Logo (currently embedded inline as base64) |
| `icon-192.png` | 192×192 | Android home screen |
| `icon-512.png` | 512×512 | High-res home screen |
| `favicon.ico` | 32×32 | Browser tab icon |
| `apple-touch-icon.png` | 180×180 | iOS home screen |

Just upload them to your repo root and `git push` (or the GitHub web upload flow). Vercel serves them instantly.

---

## 📞 Contact

**Thulane Anthony Buthelezi** · AutoSageAI
📞 WhatsApp: [066 001 8931](https://wa.me/27660018931)
📧 Email: tonybuthel@gmail.com
🏠 Based in: Pretoria, South Africa — **Remote-first (no walk-in office)**
🌐 [www.autosageai.co.za](https://www.autosageai.co.za)

---

© 2026 AutoSageAI · Structured Intelligence. Delivered.
