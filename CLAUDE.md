# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What Is Paw Signal

A mobile-first PWA for dog walkers to display a full-screen color signal (green/yellow/blue/red) communicating their dog's temperament to others nearby. Built with React 19, TypeScript, Vite, and Tailwind CSS.

**Live:** `https://charliegrippo.github.io/paw-signal/`
**Landing page:** `https://charliegrippo.github.io/paw-signal/landing/`

## Commands

```bash
npm run dev        # Start Vite dev server with hot reload
npm run build      # TypeScript typecheck + Vite production build → dist/
npm run lint       # ESLint
npm run preview    # Preview production build locally
npm run deploy     # Build + copy landing/ to dist/ + push to gh-pages branch
```

Deploy runs `predeploy` automatically (builds app, copies `landing/` into `dist/landing/`).

## Architecture

**State-based routing (no router library).** `App.tsx` uses a `screen` state variable (`home | signal | profile | about | share`) and renders the matching component. Navigation happens via callback props passed down to each screen.

**Signal data** is defined in `src/data/signals.ts` — four signal objects with `id`, `label`, `hex`, `meaning`, `guidance`, and `textColor` fields.

**Persistence** uses localStorage via `src/data/profile.ts` (key: `paw-signal-profile`). The `DogProfile` stores `dogName` and `defaultSignalId`. Profile auto-saves on change via `useEffect`.

**Styling** is Tailwind for layout/spacing/text, with inline styles for dynamic signal colors (`backgroundColor: signal.hex`).

**PWA** is configured via `vite-plugin-pwa` in `vite.config.ts` — auto-updating service worker, Workbox caching, standalone display mode. iOS meta tags are in `index.html`.

## Build & Deploy

- Vite base path is `/paw-signal/` (required for GitHub Pages subpath)
- `gh-pages` package deploys the `dist/` folder to the `gh-pages` branch
- The landing page at `landing/index.html` is a standalone HTML file (not part of the React app) — it gets copied into `dist/landing/` during predeploy

## Key Patterns

- **Props callbacks for navigation** — screens receive `onBack`, `onSelectSignal`, etc. from `App.tsx`
- **Auto-save with useEffect** — `ProfileScreen` saves to localStorage whenever profile state changes
- **QR code generation** — `ShareScreen` uses `qrcode.react` library
- **Web Share API** — native sharing with fallback to copy-to-clipboard

## Pending Work

See `paw-signal-task-sheet.md` for upcoming fixes and features (forced profile flow for first-time users, profile save validation, blinking signal mode).
