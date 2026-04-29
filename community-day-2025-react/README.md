# AWS Community Day Kenya — Next.js (`community-day-2025-react`)

This folder is a **Next.js 14 App Router + TypeScript** port of the static site in the parent directory. The original HTML/CSS is preserved via section fragments and global styles so the layout stays aligned with the legacy design.

## Commands

```bash
cd community-day-2025-react
npm install
npm run dev
# open http://localhost:3000
```

## Routes

- `/` — Main event landing page (`index.html`)
- `/photobooth` — Embedded `public/photobooth.html` (full legacy UI & scripts)
- `/badge/attending` — Attending badge generator
- `/badge/organizer` — Organizer badge generator
- `/badge/volunteering` — Volunteer badge generator

Static assets live under `public/` (images, `stylesheets/`, `js/`).

## Notes

- Home page sections are split under `content/sections/*.html` and rendered server-side with `html-react-parser`.
- Legacy behavior (hash scroll, countdown, carousels, `previousevent.js`, `site.js`) is loaded via `app/layout.tsx` and `public/js/home-after.js`.
