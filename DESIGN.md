# Design

<!-- impeccable:design-schema 1 -->

## World

"Jeepney Livery" — the site reads as a hand-decorated Cebu jeepney rather than
a dark-editorial developer résumé. Full-bleed saturated body-panel sections,
a chrome "route plate" badge/button language, riveted signboards, and
stickered project panels replace the eyebrow-label / numbered-row / serif
portfolio format this category defaults to. Chosen directly with the user
(explicit "bold & colorful, more personality" direction) rather than through
the concept-seed dice — no image-generation or decision-page tooling was
available in this session, so a single direction was committed to and built
fully instead of run through the comp/challenger round. Disclosed here as
the substitution it is.

## Color

Full-palette / committed strategy — the surface IS the color, panel by panel:

- `--ink` `#14140f` — base ink, seams, outlines, hero/skills/contact/footer ground
- `--bone` `#f6efdf` / `--bone-dim` `#eadfc6` — base paper, about/projects ground, light text-on-dark
- `--red` `#e2412a` (decorative/large only) / `--red-deep` `#a32d1b` (body-text-safe) / `--red-bright` `#ff5a3d` (small text on ink)
- `--yellow` `#f5b324` / `--yellow-deep` `#c88914`
- `--blue` `#2447c4` / `--blue-deep` `#16307f` — experience ground
- `--green` `#1c8f4e` (decorative/large only) / `--green-deep` `#0f5c31` (body-text-safe)

Rule: a saturated "bright" token is for decoration, large display type, or
UI chrome (borders, dots, bars) only. Anything carrying body-weight paragraph
or label text sits on a `-deep` variant or on ink/bone. This was tightened
during build after the mechanical/manual contrast pass found several
bright-red and bright-green pairings under 4.5:1 for body text (see fixes in
Projects.css `.plate-red`/`.plate-green`, Skills.css `.pill-red`,
Experience.css `.exp-period`, Contact.css `.form-feedback`).

## Type

- Display: **Bungee** (`--display`) — signage/vehicle-livery character, used
  for names, headings, plate labels, project titles. One weight only; scale
  and color carry hierarchy.
- Body: **Archivo** (`--sans`) — all paragraph copy, nav, buttons, labels.
- Data/mono: **JetBrains Mono** (`--mono`) — reserved for tech-stack tags and
  small metadata (cert issuer/year, footer credit), never used as a generic
  "technical" costume.

No eyebrow/kicker labels anywhere — headings carry their own weight per the
craft floor's ban; section identity comes from panel color instead.

## Components

- **`.panel-*`** — full-bleed section backgrounds (ink/bone/blue; yellow
  remains a token for accents/plates but no longer backs a full section
  now that Blog is gone). `.seam` is the thick dashed-rivet divider between
  panels, standing in for a hairline `<hr>`.
- **`.plate`** — the core recurring object: bone card, 3px ink border,
  8px radius, hard offset shadow (`5-8px, 8x8 for project plates`). Used for
  the nav logo badge, hero status pill, about stat, contact email link, and
  certification cards. Hard offset shadow is the
  world's depth system (painted panels/stickers sitting proud of metal), not
  a neobrutalist costume borrowed for its own sake.
- **`.btn`** — same plate language as an interactive element: press-down
  motion (shadow collapses toward the ink on `:active`) is the signature
  micro-interaction, repeated everywhere something is clickable.
- **Project plates** (`Projects.css`) — full-width signboards, alternating a
  slight rotation (`--rot`) and rotating through red-deep/blue/green-deep/
  yellow, entrance via `.pop` (scale + settle into that permanent tilt).
- **Skill pills** (`Skills.css`) — resume's own two-tier framing
  ("Production-ready" vs "Experienced"), not an invented taxonomy.

## Motion

Two families, both under the same "driving" thesis rather than unrelated
per-section decoration:

**Entrance (on scroll into view):** `.rise` (translateY, hero/about) vs
`.pop` (scale + permanent rotation, project plates) — varied by section
rather than one identical fade-up everywhere.

**Ambient/background (always running, not hover-gated) — one thesis, run
the length of the page instead of confined to the hero:**
- **Hero "windshield"** (`Hero.css` `.hero-road`) — a dashed yellow lane
  line scrolls continuously along the hero floor and two blurred glare
  blooms drift past at different speeds, like headlight glare passing a
  windshield while driving. This is the authored focal moment; everything
  below is a quieter echo of it.
- **Seam drift** (`index.css` `.seam`) — every section divider's rivet
  pattern scrolls sideways at the same slow, shared rate, so the page reads
  as one long body panel scrolling past rather than a fresh weld at each
  section. Present on every `.seam` site-wide. This and the hero lane above
  are the only two places the "moving dashed line" material is used — every
  other section below gets a materially different mechanism, on request,
  rather than a re-skinned copy of the same line.
- **About gauge** (`About.css` `.gauge`) — a small dashboard dial sits next
  to the "5+ projects" stat, its needle idling and occasionally revving
  (accelerate, overshoot, settle) like an engine catching. Replaced an
  earlier `.road-echo` that was just the hero's dashed line again — About
  had no material of its own until this.
- **Skills charm-sway** (`Skills.css` `.skill-pill`) — every tech-stack pill
  idles with a slow, staggered rotation, like the charms that hang off a
  jeepney's rearview mirror. Pauses (`animation: none`) on hover so the
  deliberate lift transition isn't fighting a live animation for the same
  property.
- **Projects exhaust** (`Projects.css` `.exhaust`) — three soft blurred
  yellow sparks drift upward and fade over the project plates, staggered
  with negative delays so it reads as a continuous idling engine, not a
  synced loop. Warm color so it reads against both the bone gaps and the
  dark plate colors.
- **Experience headlight sweep** (`Experience.css` `.headlight-sweep`) — a
  soft diagonal beam crosses the panel roughly once every 11s with a pause
  at each end, like passing headlights thrown across a wall at night.
- **Footer taillight** (`Footer.css` `.taillight`) — a small pulsing dot
  next to the credit line: the last light you see as the jeepney pulls away.
- **Turn-signal chase** (`Contact.css` `.turn-signal`) — three CSS-drawn
  chevrons flash in sequence next to the email address, signaling toward
  the one action the page is closing on. Purposeful attention-direction,
  not ornament.

Every loop above is wrapped in `@media (prefers-reduced-motion: no-preference)`
— a reduced-motion visitor gets the static dashed/rivet pattern, steady pill
rotation, and dim/steady chevrons and dots, with no spatial movement, never
a blank or missing element.

Implementation note: `.wrapper` (`index.css`) now carries `position: relative`,
which makes it a stacking participant like any other positioned element. The
first pass placed each section's decorative absolutely-positioned layer
(exhaust, sweep, road-echo) *before* `.wrapper` in the DOM, intending it as a
background — but with `.wrapper` positioned, a positioned sibling that comes
later in DOM order paints on top regardless of any background-only intent,
so those layers were rendering behind `.wrapper`'s content and, wherever that
content is opaque (the project plates, the cert cards), effectively
invisible. Fixed by rendering each decorative layer *after* `.wrapper` (last
child of its section) instead, so it reliably paints on top; opacity and
color were tuned so that still never competes with legibility.

The plate/button press (offset shadow collapses toward the ink on
`:active`/`:focus`) remains the interactive signature, tying every
clickable element back to the "sticker sitting on painted metal" premise.

## Patterns to avoid here

- No eyebrow/kicker copy above headings.
- No decorative sequence numbers (the old `01/02/03` project index was removed).
- No gradient text; emphasis comes from the yellow/red `em` accent + weight.
- Bright red/green tokens never carry body or label text — see Color.
- Mono font stays scoped to tech-stack tags and metadata, not general labels.

## Known gaps / next steps

- No visual QA screenshots were captured this session (no browser/screenshot
  tool available); verification was build + lint + the mechanical detector
  (`detect.mjs`, clean) + a manual WCAG contrast pass on every panel/text
  pairing. Recommend a quick look in an actual browser (`npm run dev`) at
  desktop and mobile widths before shipping, especially the mobile nav
  dropdown and the Projects section's plate rotation on small screens.
