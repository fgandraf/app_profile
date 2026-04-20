# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website — vanilla HTML/CSS/JavaScript with no build system or framework. Served as static files directly from the filesystem or a simple HTTP server.

## Running Locally

No build step required. Use any static server:

```bash
npx serve .          # or
python3 -m http.server 8080
```

Open `http://localhost:8080` (or the port shown).

## Architecture

### Entry Points
- `index.html` — main page (home/portfolio)
- `pages/about.html` — about page
- `pages/project/*.html` — individual project case pages
- `app/ethor/privacy-policy.html` — standalone app privacy page

### JavaScript (`scripts/`)
Organized as ES modules loaded from `index.html` and page HTML files.

- `scripts/main.js` — orchestrator: initializes language, modal, scroll; entry point for the home page
- `scripts/modules/fetchTranslations.js` — fetches `languages/<lang>.json`, caches in `sessionStorage`
- `scripts/modules/load-index-page.js` — populates DOM with translated content after fetch
- `scripts/modules/load-about-page.js` — same pattern for `pages/about.html`
- `scripts/modules/load-project-page.js` — same pattern for project pages
- `scripts/components/swiper.js` — SwiperJS carousel setup (portfolio section)
- `scripts/components/modal.js` — modal open/close (exposed globally via `window.openModal/closeModal`)
- `scripts/components/scroll.js` — scroll behavior
- `scripts/components/mais.js` — "see more" toggle

### Internationalization
Languages: `en`, `br` (Portuguese), `es`. Selected language is stored in `localStorage` under `selectedLanguage`. JSON files in `languages/` hold all UI strings keyed by section. When adding new copy, update all three language files.

### Styles (`styles/`)
Plain CSS files, one per page. `_home/` subdirectory splits home styles by section (header, footer, etc.). No preprocessor.

### External Dependencies (CDN only)
- **SwiperJS 11.1.7** — portfolio carousel
- **reset-css 5.0.1** — CSS reset
- **Google Fonts / Material Symbols** — icons and typography
