# UTQS — جمعية تحفيظ القرآن الكريم بعنيزة

A fast, dependency‑free Arabic (RTL) landing page for the **Onaizah Quran
Memorization Charity** (الجمعية الخيرية لتحفيظ القرآن الكريم بعنيزة), with a
student‑registration form, login/contact dialogs, and an interactive branches map.

Built as plain **HTML + CSS + JavaScript** — no frameworks, no build step.

---

## Features

- **Hero** — autoplaying, muted, looped background video with a sound toggle;
  respects `prefers-reduced-motion` and Save‑Data (shows the poster instead).
- **Animated statistics** counters that run once when scrolled into view.
- **Student registration form** with a gender‑dependent branch selector.
- **Login / Contact** modals and an in‑modal tab switcher.
- **Branches map** — Google My Maps embed loaded only on click (a facade), so
  no third‑party code runs on page load.
- **Responsive RTL** layout with a custom mobile navigation menu.

> Note: the forms are a **front‑end demo** — they have no backend and do not
> submit anywhere.

---

## Tech stack

- **HTML5**, semantic and RTL (`<html lang="ar" dir="rtl">`).
- **Vanilla CSS** — `styles.css` includes a small, purpose‑built
  Bootstrap‑replacement base (grid, navbar, modals, tabs, forms, buttons).
- **Vanilla JavaScript** — one `scripts.js`, no jQuery/Bootstrap/Select2.
- **Font Awesome 4.7** (icons) and custom Arabic webfonts (29LT Bukra,
  Droid Arabic Kufi), all **self‑hosted** (no CDN runtime dependencies).

There is **no package manager, bundler, or build step** — the site is the files
in this repo.

---

## Project structure

```
.
├── index.html                         # the entire page
├── report.txt                         # notes on the AI-assisted modernization
└── backend/themes/utqsystem/
    ├── css/
    │   ├── styles.css                 # all styles (base + custom)
    │   └── font-awesome/              # vendored Font Awesome (CSS + webfonts)
    ├── js/
    │   └── scripts.js                 # all interactivity (vanilla)
    ├── fonts/                         # 29LT Bukra, Droid Arabic Kufi
    └── img/                           # logos (SVG), videos, images, poster
```

(The `backend/` name is historical — this is a static front‑end only.)

---

## Running locally

It's a static site, so either:

- **Open `index.html` directly** in a browser, or
- **Serve it** (recommended, avoids any file:// quirks):

```bash
# Python
python -m http.server 8000
# or Node
npx serve .
```

Then visit `http://localhost:8000`.

---

## Performance & accessibility

The page is tuned for Core Web Vitals and a11y:

- WebP images with explicit `width`/`height`; below‑the‑fold media is
  lazy‑loaded; videos are compressed (hero) and `preload="none"` (content).
- Single render‑blocking stylesheet; JS is `defer`red; Font Awesome loads
  non‑blocking; the hero poster (LCP) is preloaded with `fetchpriority="high"`.
- `font-display: swap` on all fonts.
- Accessible names on icon buttons/links, correct heading order, and
  visible/`sr-only` headings; SEO meta, Open Graph, Twitter Card, and JSON‑LD
  organization data.

---

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses WebP, CSS
`mask-image`, and `:has()` — all widely supported; older browsers degrade
gracefully.

---

## Credits

- Icons: [Font Awesome 4.7](https://fontawesome.com/v4/) (SIL OFL / MIT).
- Fonts: 29LT Bukra, Droid Arabic Kufi.
- Content & branding: الجمعية الخيرية لتحفيظ القرآن الكريم بعنيزة —
  <https://www.utqs.org.sa/>
