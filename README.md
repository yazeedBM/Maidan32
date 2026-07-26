# 🏆 ميدان (Maidan) — Hackathon Directory & Team Matching

Front-end only. Next.js 14 (App Router) + Tailwind CSS. **No database, no API
routes, no authentication, no environment variables.** Everything renders from
static content in `lib/sampleData.js`, so the site builds and deploys anywhere
with zero configuration.

---

## 🚀 Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 📦 Build

```bash
npm run build
npm start
```

## ☁️ Deploy

Import the repo into Vercel (or Netlify / Cloudflare Pages) and deploy. There
is nothing to configure — no connection string, no secrets.

---

## 🗂 Structure

```
app/         routes (home, hackathons, hackathon detail, teams, create ad,
             join request, profile, login, signup)
components/  UI components (navbar, hero, cards, forms, newsletter, footer)
lib/         sampleData.js — the hackathon and team-ad content
public/      images
```

## 📝 Forms

All forms (newsletter, create team ad, join request, profile, login, signup)
are intact and fully interactive: they validate and confirm client-side. They
do not send data anywhere, because there is no server. To connect one later,
replace the marked `TODO` in the relevant `handleSubmit` / `handlePublish`
function with a `fetch()` to whatever service you choose — Formspree, Google
Forms, a Google Sheet webhook, or your own API. No other change is needed.
