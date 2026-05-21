# 🚀 AutoSageAI SEO Launch Checklist

> Everything to do AFTER `git push` to rank on Google, appear in AI Overviews, and get found by South African customers.

---

## ✅ What's Already Built In

These are already in place inside your deployment — no action needed:

- [x] **Title tag** optimized for "AI Automation South Africa"
- [x] **Meta description** with keywords + CTA (155 chars, ideal length)
- [x] **20+ long-tail SA keywords** in meta keywords tag
- [x] **Open Graph tags** — link previews on Facebook, LinkedIn, WhatsApp
- [x] **Twitter/X Cards** — rich previews on tweets
- [x] **Canonical URL** — prevents duplicate content penalties
- [x] **Geo meta tags** — ZA-GP (Gauteng, Pretoria coordinates)
- [x] **JSON-LD structured data** — 6 schemas: ProfessionalService, WebSite, 3× Service, FAQPage
- [x] **Robots.txt** — allows all major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- [x] **Sitemap.xml** — 11 URLs with priority + lastmod
- [x] **llms.txt** — AI discovery file for ChatGPT/Claude/Perplexity citations
- [x] **site.webmanifest** — installable PWA-lite on mobile
- [x] **Security headers** — X-Frame-Options, Referrer-Policy, etc.
- [x] **Preconnect hints** — faster font loading (better Core Web Vitals)

---

## 📋 DAY 1 — After First Deploy

### 1. Google Search Console (CRITICAL — 10 min)

This is the single most important SEO step.

1. Go to **[search.google.com/search-console](https://search.google.com/search-console)**
2. Click **Add Property** → **URL prefix**
3. Enter: `https://www.autosageai.co.za`
4. Verify using **HTML tag method**:
   - Copy the `<meta name="google-site-verification" content="..." />` tag
   - Paste it into `index.html` just after the existing `<meta name="bingbot">` line
   - `git add . && git commit -m "Google verification" && git push`
   - Wait 30 seconds for Vercel redeploy, then click **Verify** in Search Console
5. Once verified, go to **Sitemaps** → submit: `sitemap.xml`
6. Go to **URL Inspection** → paste `https://www.autosageai.co.za/` → **Request Indexing**

### 2. Google Business Profile (CRITICAL for SA local SEO — 15 min)

This is what gets you into the Google Maps "3-pack" when someone searches for services in your areas. Because **you operate remotely with no walk-in office**, you must set this up as a **Service-Area Business (SAB)** — not a storefront.

1. Go to **[business.google.com](https://business.google.com)**
2. Click **Add your business to Google**
3. Fill in exactly:
   - **Business name**: `AutoSageAI`
   - **Category**: `Software Company` (primary) + `Business Management Consultant` + `Marketing Consultant` (secondary)
   - **Do you want to add a location customers can visit?** → Select **NO**
   - **Where do you serve your customers?** → Add these service areas one by one (Google allows up to 20):
     - Pretoria
     - Johannesburg
     - Soweto
     - Centurion
     - Midrand
     - Sandton
     - Cape Town
     - Stellenbosch
     - Durban
     - Umhlanga
     - Pietermaritzburg
     - Vereeniging
     - Vanderbijlpark
     - Sasolburg
     - Nelspruit / Mbombela
     - Witbank / eMalahleni
     - Secunda
     - Middelburg, Mpumalanga
   - **Phone**: `066 001 8931`
   - **Website**: `https://www.autosageai.co.za`
4. **Important**: When verification starts, Google will ask for a hidden address (this is normal for SABs). Use your home/office address — it will **NOT** be shown publicly. Only your service areas are visible.
5. Verification is usually by video call for SABs in SA (be ready to show the area you operate from, a utility bill, and your business phone).
6. Once verified, add:
   - **Business description** (copy from `llms.txt` intro — the "remote-first" language is important)
   - **Services** — add all your catalogue packages as services (Google lets you add descriptions + starting prices)
   - **Attributes** — tick "Online appointments" and "Online service"
   - **Logo + cover photo**
   - **Posts** — weekly updates (Google favours active profiles)
7. **Ask 3-5 early clients for Google reviews** — reviews are the #1 local ranking factor. For SABs, reviews matter even more than for storefronts because you can't rely on walk-in foot-traffic signals.

> 💡 **SAB tip**: Service-area businesses rank in the 3-pack for **each area you add**. Adding Nelspruit + Witbank + Secunda means you get three separate local ranking opportunities, not one.

### 3. Bing Webmaster Tools (5 min)

- Go to **[bing.com/webmasters](https://www.bing.com/webmasters)**
- Sign in → **Import from Google Search Console** (one-click import)
- Submits your sitemap to Bing + DuckDuckGo automatically

---

## 📋 DAY 2–7 — Citation Building

### 4. SA Business Directories (30 min total)

Consistent **NAP** (Name, Area, Phone) across directories is critical for local SEO. Use **exactly** this format on every listing — where a directory insists on a street address, use Pretoria as your base city only, never a specific street (you're remote):

```
Name:            AutoSageAI
Base city:       Pretoria, Gauteng
Service areas:   Pretoria · Johannesburg · Soweto · Cape Town · Durban · Vaal Triangle · Mpumalanga
Phone:           +27 66 001 8931
Website:         https://www.autosageai.co.za
Format:          Remote / Online service (no walk-in)
```

Submit to:

- [ ] **Brabys** — [brabys.com](https://www.brabys.com) (SA's largest directory)
- [ ] **Snupit** — [snupit.co.za](https://www.snupit.co.za) (lead-gen platform)
- [ ] **Uptasker** — [uptasker.co.za](https://www.uptasker.co.za)
- [ ] **Hellopeter** — [hellopeter.com](https://www.hellopeter.com) (reviews = ranking)
- [ ] **TrustPilot** — [trustpilot.com](https://www.trustpilot.com)
- [ ] **Facebook Business Page** — [facebook.com/business](https://www.facebook.com/business) (linked in your Open Graph)
- [ ] **LinkedIn Company Page** — [linkedin.com/company](https://www.linkedin.com/company) (B2B critical)

Once these exist, update the `sameAs` array in `index.html` JSON-LD (around line 115):

```json
"sameAs": [
  "https://wa.me/27660018931",
  "https://www.facebook.com/autosageai",
  "https://www.linkedin.com/company/autosageai",
  "https://www.brabys.com/autosageai"
]
```

Then `git push` to update your structured data.

### 5. Validate Your Structured Data (5 min)

- Go to **[validator.schema.org](https://validator.schema.org)**
- Paste: `https://www.autosageai.co.za`
- All 6 schemas should show ✓ green

- Then go to **[search.google.com/test/rich-results](https://search.google.com/test/rich-results)**
- Paste same URL
- Should show: "Page is eligible for rich results" with FAQ, Organization, and Service detected

---

## 📋 WEEK 2+ — Ongoing

### 6. Content & Backlinks

- [ ] **Publish new blog articles monthly** — target one SA-specific long-tail keyword per post (e.g., "WhatsApp automation for Cape Town restaurants")
- [ ] **Internal linking** — every new article should link to at least 2 service pages
- [ ] **Guest posts** — offer to write for SA business blogs (SmallBizConnect, SME SA, Entrepreneur South Africa) in exchange for a backlink
- [ ] **Press release** — SA PR wires like Cision SA distribute your launch cheaply
- [ ] **Industry partnerships** — get listed on partner sites (Make.com, n8n, OpenAI customer lists if you qualify)

### 7. Monitor Performance

Check weekly:

- **Google Search Console** → Performance → impressions, clicks, CTR, position
- **Google Business Profile** → Insights → calls, direction requests, website clicks
- **Bing Webmaster** → same metrics for Bing/DuckDuckGo

Key numbers to track at 30/60/90 days:

| Metric | Month 1 Goal | Month 3 Goal |
|---|---|---|
| Indexed pages | 10+ | 15+ |
| Impressions/month | 200+ | 2000+ |
| Clicks/month | 10+ | 100+ |
| Local pack appearances | 5+ | 50+ |
| Google reviews | 3+ | 10+ |

---

## 🎯 High-Value SA Keywords You're Already Targeting

Your meta tags and content are pre-optimized for these. Monitor their ranking progression in Search Console:

**High-intent local**
- `AI automation South Africa`
- `business automation Pretoria`
- `business automation Johannesburg`
- `AI automation Cape Town`
- `AI automation Durban`
- `AI automation Soweto`
- `AI automation Vaal Triangle`
- `AI automation Mpumalanga`
- `AI automation Nelspruit`
- `AI automation Witbank`
- `AI automation Secunda`
- `remote AI agency South Africa`
- `WhatsApp AI agent South Africa`
- `workflow automation SA`

**Long-tail commercial**
- `AI chatbot for small business South Africa`
- `48 hour AI deployment`
- `Make.com consultant South Africa`
- `Zapier automation Pretoria`
- `automation for panel beaters`
- `dealership automation Johannesburg`
- `AI for Cape Town restaurants`
- `WhatsApp automation Durban`
- `manufacturing automation Mpumalanga`
- `online business automation SA`

**Problem-aware**
- `missing leads WhatsApp`
- `business losing leads to slow response`
- `AI for mechanic workshop`
- `factory operations automation SA`
- `remote AI consultant South Africa`

---

## 🤖 AI Overview Optimization

Your `llms.txt` + FAQPage schema is specifically engineered so that when someone asks **ChatGPT, Claude, Perplexity, or Google AI Overviews** questions like:

- *"Who does AI automation in South Africa?"*
- *"What's the cost of WhatsApp AI agents in SA?"*
- *"How long does it take to deploy AI automation?"*

…your business is structured to be cited in the answer. The FAQPage schema alone answers 6 of the most common AI-search queries about your service.

---

## ⚠️ What to Avoid

- ❌ **Don't stuff keywords** — Google's spam filter is sharp. Your current keyword density is optimal.
- ❌ **Don't fake reviews** — Google detects review patterns and penalizes.
- ❌ **Don't buy backlinks** from directory spammers — these cause penalties.
- ❌ **Don't copy competitor content** — original content wins every time.
- ❌ **Don't change your domain or URL structure** once ranked — it resets everything.

---

## 📞 Need Help?

This SEO setup gives you 80% of what enterprise SEO agencies deliver, for zero cost. The remaining 20% is earned through consistent content, reviews, and time. Expect 60–90 days before you start ranking for primary keywords, and 4–6 months for local-pack dominance.

— Thulane Anthony Buthelezi · AutoSageAI
