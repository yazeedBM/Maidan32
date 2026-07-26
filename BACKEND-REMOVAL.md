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
