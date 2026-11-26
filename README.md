# Francis Miguel Diano — Portfolio

**Live:** [www.francismigueldiano.com](https://www.francismigueldiano.com)

The personal site of Francis Miguel Diano, a full-stack developer and 4th-year BSIT student in
Cebu, Philippines. It covers my projects, the ICS × IBM Bobathon 2026 win, certifications, live
GitHub activity, and a way to get in touch.

## Highlights

- **Projects** with live links and screenshots: Nutrio (AI meal planning, Android), BobEye
  (Champion, ICS × IBM Bobathon 2026), StringGuard, the BSN Acquaintance Party seating portal,
  the UCLM PSITS voting system, ChatUrMate, and concept sites.
- **Certificates** open in an on-page viewer, with personal details redacted where needed.
- **Live GitHub contribution graph** with total contributions and streaks.
- **Quick-answer chat** with pre-written answers about my work (no AI, no network calls).
- A bold "jeepney livery" design: split-flap route sign, LED skills ticker, cursor-tilt project
  cards, scroll-triggered entrances. All motion turns off for visitors who prefer reduced motion.

## Stack

React 19 · Vite · plain CSS per component · deployed on Vercel with Vercel Web Analytics.
The contact form posts to Formspree.

## Run it locally

```sh
npm install
npm run dev       # http://localhost:5173
npm run build     # production build into dist/
npm run lint
npm test          # unit tests for the chat's answer matching
```

## Project notes

- `src/components/` — one component and stylesheet per section.
- `src/components/chatAnswers.js` — the chat's pre-written answers and keyword matching.
- `scripts/gen-tech-icons.mjs` — regenerates the skill-pill logos from Simple Icons (CC0) as
  bare SVG paths, so no icon metadata ships to the browser.
- `scripts/og-image.html` — source for the link-preview image (`public/og-image.png`); the
  render command is in the file.
- `public/certs/` — certificate PDFs shown in the viewer.

## Contact

francismigueldiano@gmail.com · [LinkedIn](https://linkedin.com/in/francis-miguel-diano-091760316)
· [GitHub](https://github.com/iggyboi2x)
