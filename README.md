# JUNE HONG — Portfolio Site

## Project Overview
- **Name**: June Hong (홍준성) Portfolio
- **Goal**: An English-language editorial portfolio for video/photo creative professional June Hong, styled after codapress.co.uk and cobloc.archi — clean split-navigation homepage, category-filterable project grids, and a resume-driven About page.
- **Status**: All placeholder content in place (44 category slots filled with CC/PD-licensed "Reference Image" stock placeholders); ready to be swapped for real client work slot-by-slot without touching the layout code.
- **Source code**: https://github.com/junehongjkwg/my-portfolio — this is the permanent source of truth for the project; clone or download it here anytime, independent of the sandbox/preview URL.

## Features Completed
- **Home (`/`)** — Full-bleed hero, animated split-navigation into VIDEO / PHOTO sections with live work/category counts, marquee strip, "Selected Work" preview grid interleaved with BTS/candid photos.
- **Video hub (`/video`)** — Category filter pills (Reels, Event Recap, Brand Film, Documentary, Advertising, Art) + project grid. Video thumbnails link out externally (currently placeholder `#`, ready to be swapped for real hosted links).
- **Photo hub (`/photo`)** — Category filter pills (Food, Clothing, Product, Venue, AI) + project grid with lightbox viewer for full-size images.
- **Category detail pages (`/video/:slug`, `/photo/:slug`)** — Per-category project listing.
- **About (`/about`)** — Resume-driven bio, skills bars, education/experience timeline, headshot, contact links (email / phone / location).
- **Custom cursor** — Dot + lagging ring cursor (desktop only), contextual labels (`Enter`, `Watch`, `View`, `Go`) on hover.
- **Scroll reveal animations** — Fade/slide-in on scroll via IntersectionObserver.
- **Mobile navigation** — Hamburger-triggered dropdown menu, fully responsive down to 360px width.
- **Category filtering** — Client-side pill filter on `/video` and `/photo` grids.
- **Lightbox** — Full-size photo modal viewer on the Photo hub.
- **Enhanced interactivity (new)**:
  - **Magnetic elements** — Nav links and the homepage CTA pill are pulled toward the cursor on hover (`data-magnetic`).
  - **Parallax split panels** — Homepage VIDEO/PHOTO split backgrounds shift subtly on scroll (`data-parallax`).
  - **Count-up numbers** — "X Works / Y Categories" counters animate up from 0 when scrolled into view.
  - **3D card tilt** — Project cards tilt toward the cursor position on hover (`data-tilt`), desktop only.
  - **Page transition curtain** — A full-screen wipe plays between internal page navigations for a more app-like feel.
  - All of the above are pure client-side JS/CSS (`public/static/app.js`, `public/static/style.css`) — they run entirely in the visitor's browser and are unaffected by Cloudflare Workers' server-side execution limits.
- **Favicon** — Branded SVG favicon (dark background, lime-green "JH" monogram) matching the site's visual identity.

## Route / URL Summary
| Route | Description |
|---|---|
| `/` | Homepage — hero, split video/photo navigation, selected work preview |
| `/video` | Video category filter + project grid |
| `/photo` | Photo category filter + project grid |
| `/video/:slug` | Single video category (`reels`, `event-recap`, `brand-film`, `documentary`, `advertising`, `art`) |
| `/photo/:slug` | Single photo category (`food`, `clothing`, `product`, `venue`, `ai`) |
| `/about` | Resume / bio / skills / contact |
| `/static/*` | Static assets (CSS, JS, images, favicon) served via Cloudflare Pages `serveStatic` |

No API endpoints — this is a fully static/server-rendered site with no database or dynamic backend calls.

## Data Architecture
- **Data model**: All site content (categories, projects, resume/bio copy, BTS photo list) is defined as typed TypeScript objects in `src/data/content.ts` — no database is used.
  - `Category` — key, kind (`video`/`photo`), labels, slug, description.
  - `Project` — id, categoryKey, title, year, cover image, optional `externalUrl` (for video projects), tags, `isPlaceholder` flag (all 44 current slots are `true`, marking them as licensed stock placeholders pending real client work).
  - `RESUME` / `PROFILE_PHOTO` — About page bio, education, experience, skills.
  - `BTS_PHOTOS` — pool of behind-the-scenes/candid photos of June Hong interleaved into project grids.
- **Storage**: None required — content is compiled directly into the Worker bundle at build time (`vite build` → `dist/_worker.js`). No Cloudflare D1/KV/R2 bindings are configured.
- **Images**: Static files under `public/static/images/` (video/photo category folders + `bts/`), served via Hono's `serveStatic` middleware from `hono/cloudflare-workers`.

## Tech Stack
- **Framework**: [Hono](https://hono.dev) (JSX renderer) on Cloudflare Workers/Pages
- **Build tool**: Vite (`@hono/vite-build/cloudflare-pages`)
- **Styling**: Hand-written CSS with custom properties (`public/static/style.css`) — no CSS framework
- **Client interactivity**: Vanilla JS (`public/static/app.js`) — custom cursor, scroll reveal, filtering, lightbox, magnetic hover, parallax, count-up, 3D tilt, page transitions
- **Fonts**: Google Fonts (Bebas Neue, Space Grotesk, Space Mono, Fraunces)
- **Process manager (local dev)**: PM2 running `wrangler pages dev`

## User Guide
1. Visit the homepage to see the split VIDEO / PHOTO navigation with live project/category counts.
2. Click **VIDEO** or **PHOTO** to browse the full project grid; use the category pills to filter by type.
3. Video project cards link out to the original hosted video (currently a placeholder `#` link — swap in `src/data/content.ts` once real links are available).
4. Photo project cards open a lightbox for a full-size view.
5. Visit **ABOUT** for June Hong's bio, skills, experience timeline, and contact details (email / phone).
6. On mobile, tap the hamburger icon in the header to open the navigation menu.

## Development
```bash
npm install
npm run build           # builds to dist/ via Vite
npm run dev:sandbox      # wrangler pages dev dist (used with PM2 in sandbox)
npm run deploy           # build + wrangler pages deploy
```
Local dev in this sandbox uses PM2 (`ecosystem.config.cjs`) to run `wrangler pages dev dist` on port 3000. Any change to files in `public/` or `src/` requires re-running `npm run build` before PM2 picks it up (`pm2 restart webapp`).

## Deployment
- **Platform**: Cloudflare Pages (not yet deployed to production — currently running only in the local sandbox dev environment)
- **Status**: ❌ Not deployed to a public Cloudflare Pages URL yet
- **Version control**: Git repository synced to GitHub — https://github.com/junehongjkwg/my-portfolio (branch `main`). All source files (src/, public/, config) are versioned there and can be edited/cloned independently of this sandbox.
- **Last updated**: 2026-08-11

## Known Pending Items
- Video project thumbnails currently link to `#` placeholders — replace with real external video URLs in `src/data/content.ts` (`Project.externalUrl`) once available.
- All 44 category project slots use licensed stock "Reference Image" placeholders — replace `cover` images and set `isPlaceholder: false` as real client work is confirmed.
- About page currently lists two roles with "Present" end dates (JK WORLD GROUP and a freelance role) — confirm with June Hong whether both are concurrent, intentional.

## How to Edit This Project Later (via GitHub)
Since the code now lives at https://github.com/junehongjkwg/my-portfolio, you can make changes anytime without this sandbox:
1. **Clone it**: `git clone https://github.com/junehongjkwg/my-portfolio.git`
2. **Install deps**: `npm install`
3. **Run locally**: `npm run build && npm run dev:sandbox` (or `npx wrangler pages dev dist`), then open `http://localhost:3000`
4. **Edit content**: category/project data lives in `src/data/content.ts`; page markup in `src/index.tsx` and `src/components/`; styles in `public/static/style.css`; interactivity in `public/static/app.js`
5. **Push changes**: `git add . && git commit -m "your message" && git push`
6. **Deploy**: `npm run deploy` (requires a Cloudflare account + `wrangler` login) to publish to Cloudflare Pages, or open a new Genspark sandbox pointed at this GitHub repo to continue working with this same AI assistant setup.
