# Figma implementation — what changed

Presentation layer only. **No backend file was touched**: `app/api/**`,
`lib/prisma.js`, `lib/auth.js`, `lib/serialize.js`, `prisma/schema.prisma`
and `scripts/seed.js` are byte-identical to what you sent. No new npm
dependencies were added.

## Palette — sampled from the screenshots, not guessed

| Token | Value | Used for |
|---|---|---|
| `accent` | `#F78B0F` | orange CTAs, card titles, "فرصة" |
| `primary` | `#034191` | headings, field labels, join button |
| `primary-light` | `#0991F3` | اشترك button, search glyph |
| `amber-btn` | `#FEBF00` | نشر الإعلان / إرسال الطلب |
| `accent-soft` | `#FFE599` | category badges |
| `dark` / `dark-deep` | `#1F2227` / `#0F0B0C` | hero band / newsletter + footer |
| `surface-muted` / `surface-field` | `#EEEFF1` / `#ECEEF1` | page background / input fill |
| `surface-footer` | `#E6ECF4` | light footer on the form pages |

## Fixes beyond styling

1. **Images were all broken.** There was no `public/` directory, yet every
   component referenced `/images/...`. The seven photos sat in `app/pic/`,
   which Next does not serve. Created `public/images/` and mapped each photo
   to its slot (compressed 3.9 MB → 1.9 MB). `app/pic/` is left untouched.

2. **The navbar was mirrored.** Every frame puts the wordmark on the left and
   the links on the right; the old markup produced the opposite. Fixed via DOM
   order inside the RTL container, not `flex-row-reverse` overrides.

3. **The logo was wrong.** It is a single lockup — the initial م drawn as a cog,
   the dot of the final ن replaced by an orange bulb — not an icon plus an SVG
   `<text>` element. It is now vector-traced from the hero frame and verified
   against the original pixel-for-pixel. It inherits `currentColor`, so tone
   switches with the parent (white on dark, blue on light).

4. **Every route existed twice** (`page.js` *and* `page.jsx`). The `.js` copies
   were stale — dead Tailwind classes (`bg-navy-950`, `btn-orange`) and wrong
   props (`<TeamsBrowser teams=>` vs `teamAds`). They never rendered, since
   `.jsx` resolves first. Moved to `.removed-legacy-pages/` (outside `app/`, so
   Next ignores it) rather than deleted — they hold the Prisma query code you
   will want when wiring the new pages to the database.

5. **Search icon side.** It sits at the right edge and is `#0991F3`, confirmed
   by sampling the icon pixels. It was on the left.

## Two things that need your input

- **`public/images/hero-teams.jpg` is a stand-in.** The handshake photo for the
  "أعثر على فريق" hero was not in the archive; `pic (1).jpeg` is placed under
  the blue scrim until you supply the real one.

- **The two form frames are modals in Figma.** Images 2 and 3 show the form
  floating over a dimmed matching page. They are kept as real routes
  (`/teams/create`, `/teams/[id]/join`) so deep links and the back button keep
  working. Converting them to modals is a routing decision, not a styling one.

## Verification status — read this

`npm install` could not run in the build environment (no network), so the
project was **never compiled or rendered**. What *was* verified:

- every `.js`/`.jsx` file parses cleanly (`tsc`, 0 errors)
- every import resolves to a file that exists
- every `/images/...` reference resolves to a real asset
- the traced logo renders correctly in both tones (headless Chromium)

Spacing and type scale were derived by measuring the screenshots numerically
rather than by visual comparison. Treat this as a strong first pass and expect
to iterate on those two once you can see it running.

## Legacy screens

`admin`, `login`, `signup` and `profile` have no Figma frame. Rather than
refactor them, `navy`/`brand` colour aliases and `.btn-orange` / `.btn-blue` /
`.btn-outline-navy` / `.input` helpers were added, mapped onto the new palette,
so they keep working and stay visually consistent.
