# Backend removal — what changed

The front end is **byte-for-byte unchanged**. Not a single `.jsx` component,
page, CSS file or image was edited. Every visible page looks and behaves
exactly as before. The only edits were deletions of server-side files plus a
rewritten `package.json`, `README.md` and `.gitignore`.

## Deleted

| Path | What it was |
|---|---|
| `app/api/**` | All API routes (auth, teams, hackathons, profile) |
| `app/admin/**` | Admin dashboard — read/wrote the database directly |
| `components/AdminHackathonsClient.jsx` | Admin panel, called `/api/hackathons` |
| `components/AdminTeamsClient.jsx` | Admin panel, called `/api/teams` |
| `prisma/` | Prisma schema (Postgres models) |
| `scripts/seed.js` | Database seed script |
| `lib/prisma.js` | Prisma client singleton |
| `lib/auth.js` | JWT signing / session cookie helpers |
| `lib/serialize.js` | Prisma record → JSON serializer |
| `lib/mockData.js` | Unused leftover data file |
| `.removed-legacy-pages/` | Dead pre-redesign pages |
| `package-lock.json` | Stale — it pinned the removed packages |

## `package.json`

- Scripts no longer run Prisma. `build` is now plain `next build`; the
  `postinstall`, `preseed` and `seed` scripts are gone. **This is what was
  breaking your deploy** — the build command ran `prisma db push`, which needs
  a reachable database before Next even starts compiling.
- Removed dependencies: `@prisma/client`, `bcryptjs`, `jsonwebtoken`,
  `mongodb`, `prisma`. What remains: `next`, `react`, `react-dom`, plus
  Tailwind/PostCSS/autoprefixer for the build.

## Kept exactly as they were

- Every page: home, hackathons, hackathon detail, find-a-team, create team ad,
  join-team request, profile, login, signup.
- Every form, including the join-request form and the create-ad form — same
  fields, same validation, same success states ("تم إرسال الطلب ✓" etc.).
- `lib/sampleData.js`, all images, `globals.css`, `tailwind.config.js`,
  `next.config.js`.

## Note on the forms

They were already client-side only in the version you sent — each had a `TODO`
where a POST would go, and none of them ever called the API. So removing the
backend changed nothing about how they behave.

## Deploying

```bash
npm install
npm run build
```

Then push to GitHub and import into Vercel. No environment variables, no
database, no build settings to change.

`package-lock.json` was deleted because it still pinned the removed packages,
and `npm ci` fails when the lock file and `package.json` disagree. Running
`npm install` once locally regenerates a correct one — commit it if you like.

---

# Build fix — `/teams/create` prerender error

The first deploy attempt failed with:

```
useSearchParams() should be wrapped in a suspense boundary at page "/teams/create"
Error occurred prerendering page "/teams/create"
```

This was **not** caused by removing the backend — it was already there,
hidden behind the Prisma failure that used to stop the build earlier. In
Next.js 14, a client component that calls `useSearchParams()` cannot be
prerendered unless it sits inside a `<Suspense>` boundary.

## What changed

- `components/CreateTeamAdForm.jsx` — new file. It is the previous
  `app/teams/create/page.jsx`, moved verbatim, with three lines changed: the
  `useSearchParams` import dropped, and `hackathonId` now arriving as a prop
  instead of being read from the hook. Every element, class name and string in
  the form is untouched.
- `app/teams/create/page.jsx` — now a small server component. It reads
  `?hackathon=` from `searchParams` on the server and passes it down.

Wrapping the page in `<Suspense fallback={null}>` would also have satisfied
the build, but the prerendered HTML would then be empty and the page would
flash blank before hydration. Reading the query string on the server avoids
that, so the rendered result is identical to what you had.

One small side effect, easy to revert: the route now exports
`metadata = { title: "أنشئ إعلان" }`, which a `"use client"` page could not
do. The browser tab for that page now reads "أنشئ إعلان | ميدان" instead of
the site default, matching how `/hackathons` and `/teams` already behave.
Delete that one line if you'd rather keep the default title.
