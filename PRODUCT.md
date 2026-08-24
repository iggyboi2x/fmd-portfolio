# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences with equal priority:
- Recruiters / hiring managers evaluating Francis for internships or entry-level full-time developer roles.
- Freelance / small-business prospects (event venues, bakeries, repair shops, and similar local businesses) evaluating him for paid web project work.

## Product Purpose

A personal portfolio site for Francis Miguel M. Diano, a full-stack engineer and 4th-year BSIT student (Academic Scholar) at University of Cebu Lapu-Lapu and Mandaue. It exists to convert either audience into a conversation: a job/internship lead or a freelance inquiry. Success is a recruiter or client contacting him via the site's contact form/email after reviewing his projects and stack.

## Positioning

Not a student doing tutorial projects — a full-stack engineer who has shipped 5+ production, client-facing web applications (reservation systems, service platforms, an encrypted storage tool, a real department's live voting system) from concept through Vercel deployment, while still in school. The differentiator is end-to-end ownership: understanding a real client's need, architecting the solution, and shipping a polished, user-ready product — not just front-end demos.

## Operating Context

- Site is a single-page React (Vite) app, deployed on Vercel, at francismigueldiano.vercel.app.
- Sections: Hero, About, Skills, Projects, Experience/Education/Certifications, Contact, Footer. (A Blog "coming soon" placeholder existed briefly but was removed at the user's request — not currently needed.)
- Contact form submits to Formspree (`https://formspree.io/f/xnjrrodq`) — keep this integration.
- All project links are real, live deployments or GitHub repos; no fabricated case studies or metrics.

## Capabilities and Constraints

- Stack: React 19 + Vite, plain CSS per component (no CSS framework currently in use), no TypeScript, no design system dependency.
- Content must reflect the latest resume (dated 2026): 4th-year BSIT student (previous site copy said 3rd year — must update), Academic Scholar (previous copy said "Dean's Lister" — verify/update wording), Anthropic Claude 101 certified (missing from current Experience/Certifications section — must add), five named projects: StringGuard, Marina Seaview, BST Sweetbakes, Freesoul, UCLM CCS PSITS-Voting System.
- Resume tech-stack framing: Strong/production-ready = React.js, Next.js, Tailwind CSS, Supabase, Vite, SQL. Experienced = PHP, Laravel, Node.js, Figma, Git/GitHub, Vercel, custom domains, SEO optimization. This differs slightly from the current Skills.jsx groupings (e.g. current code lists PostgreSQL/MySQL and omits Next.js/SQL as a category) — reconcile toward the resume as the source of truth.
- No headshot/photo will be used — keep the site photo-free per explicit decision.
- Do not fabricate testimonials, client names beyond what's already named (Marina Seaview, BST Sweetbakes, Freesoul, UCLM CCS), metrics, or press.

## Evidence on Hand

- Resume PDF (provided by user, dated 2026) is the authoritative source for current role, education year, certifications, and project list/descriptions.
- Live project URLs: stringguard.online (resume) — note current site code links to stringguard.vercel.app, needs reconciling — marina-seaview.vercel.app, bst-sweetbakes.vercel.app, freesoul-ph.vercel.app, github.com/ire-zepelli/voting-system.
- Contact: francismigueldiano@gmail.com, +63 954 408 1366, Mandaue City, Cebu, Philippines. LinkedIn: linkedin.com/in/francis-miguel-diano-091760316. GitHub handle used on current site: github.com/iggyboi2x.
- Claude 101 certificate: https://verify.skilljar.com/c/3yczqc6p63w3

## Product Principles

- Ship only real, verifiable work — every project claim must map to an actual deployed product or repo.
- Speak credibly to both a recruiter skimming for stack fit and a small-business owner skimming for "can this person build my site."
- Student status is a credibility asset (scholar, still leveling up) not something to downplay.
- Content changes (resume sync) and visual redesign are both in scope for this pass; keep them consistent with each other.

## Accessibility & Inclusion

No product-specific requirement established beyond standard web accessibility (semantic HTML, sufficient contrast, keyboard-navigable nav/form) already implied by using this as a professional/hiring-facing site.
