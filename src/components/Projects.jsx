import Tilt from './Tilt'
import freesoulShot from '../assets/projects/freesoul.webp'
import marinaShot from '../assets/projects/marina.webp'
import stringguardShot from '../assets/projects/stringguard.webp'
import sweetbakesShot from '../assets/projects/sweetbakes.webp'
import chaturmateShot from '../assets/projects/chaturmate.webp'
import nutrioPantry from '../assets/projects/nutrio-1.webp'
import nutrioMeals from '../assets/projects/nutrio-3.webp'
import bobeyePoster from '../assets/projects/bobeye.webp'
import bsnShot from '../assets/projects/bsn-acquaintance.webp'
import psitsShot from '../assets/projects/psits-voting.webp'
import './Projects.css'

const projects = [
  {
    title: 'Nutrio',
    color: 'blue',
    desc: 'Built with my team — an AI-powered meal planning and food-waste reduction system. An Android app tracks pantry inventory through photo and barcode scanning, plans meals around ingredients nearing expiry, and routes surplus food to donations and barangay waste programs, backed by an admin dashboard and a barangay portal with Excel and PDF reporting.',
    stack: ['React Native', 'Expo', 'Express', 'Supabase', 'React', 'Claude API', 'Gemini'],
    demo: 'https://nutrioapp.vercel.app/',
    repo: null,
    media: {
      type: 'phones',
      screens: [
        { src: nutrioPantry, alt: 'Nutrio app screen: track what is in your pantry' },
        { src: nutrioMeals, alt: 'Nutrio app screen: smart meals from what you have' },
      ],
    },
  },
  {
    title: 'StringGuard',
    color: 'yellow',
    desc: 'A privacy-focused text storage app with client-side encryption — password-protected workspaces using bcryptjs and PBKDF2 key derivation, a Tiptap rich-text editor, and a CodeMirror code editor supporting 15+ languages. Multi-tab, auto-saving, fully responsive.',
    stack: ['React', 'Vite', 'Supabase', 'Tiptap', 'CodeMirror', 'bcryptjs'],
    demo: 'https://stringguard.online/',
    repo: null,
    media: { type: 'browser', src: stringguardShot, alt: 'StringGuard secure notepad start screen' },
  },
  {
    title: 'BobEye',
    color: 'green',
    desc: "Champion of the ICS × IBM Bobathon 2026. Built with my team in two days using IBM Bob — a child-safety guardian for Filipino families. An Electron agent on the child's PC checks the screen on-device for grooming, threats and explicit images in English, Tagalog and Taglish; a Chrome extension blocks harmful and phishing sites with a URL model; and parents get live alerts on a React dashboard. Explicit images are blurred before anything leaves the PC.",
    stack: ['Electron', 'React', 'TypeScript', 'Supabase', 'TensorFlow.js', 'Tesseract.js', 'Chrome Extension'],
    demo: null,
    repo: null,
    award: '#awards',
    media: { type: 'poster', src: bobeyePoster, alt: "BobEye mascot and logo: your child's safety in your own hands" },
  },
  {
    title: 'BSN Acquaintance Party 2026',
    color: 'yellow',
    desc: 'Built with my team for the UCLM College of Nursing and its student body organization — the official seating and event portal for a ~1,440-guest celebration at the Mactan Expo Center. Students sign in with emailed access codes and reserve seats in real time across 144 tables and 12 clinical societies, then get a printable digital admission pass; organizers run the roster from an admin console with Excel export. I moved every attendee and seat write behind an authenticated server API with signed tokens and Row-Level Security, and closed the double-booking races.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Vercel Functions', 'Resend'],
    demo: 'https://www.bsn-acquaintance.online/',
    repo: null,
    media: { type: 'browser', src: bsnShot, alt: 'BSN Acquaintance Party 2026 Celestial Garden landing page' },
  },
  {
    title: 'UCLM PSITS Voting System',
    color: 'blue',
    desc: 'Co-developed and deployed a real-time digital balloting platform used by the UCLM CCS department to elect a new slate of PSITS student officers, handling concurrent voters and live vote updates.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Express', 'PostgreSQL', 'JWT', 'bcryptjs'],
    demo: null,
    repo: 'https://github.com/ire-zepelli/voting-system',
    media: { type: 'poster', src: psitsShot, alt: 'UCLM PSITS student election voting page with a live countdown' },
  },
  {
    title: 'ChatUrMate',
    color: 'green',
    desc: 'A random one-to-one video chat platform with private invite-code rooms — a realtime matchmaking queue with instant "Next" pairing, text, image and voice messages over WebRTC, Meet-style spotlight and reactions, and report-and-block safety tools that end a session on the spot. Media credentials never reach the browser; clients get short-lived, room-scoped tokens.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'LiveKit', 'WebRTC', 'Supabase'],
    demo: 'https://chaturmate.vercel.app/',
    repo: null,
    media: { type: 'browser', src: chaturmateShot, alt: 'ChatUrMate homepage' },
  },
  {
    title: 'Freesoul Cyber Gadgets',
    color: 'red',
    desc: 'Built with my dev team — a concept full-stack business website modeled on a local device repair shop, featuring a service inquiry system, real-time repair ticket tracker, nationwide quote request form, and a blog with ISR.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'Three.js', 'Resend'],
    demo: 'https://freesoul-ph.vercel.app/',
    repo: null,
    media: { type: 'browser', src: freesoulShot, alt: 'Freesoul Cyber Gadgets homepage' },
  },
  {
    title: 'Marina Seaview',
    color: 'green',
    desc: 'A concept reservation site modeled on a local events venue in Lapu-Lapu, with a gallery, menu showcase, and a smart reservation form that pre-fills straight into Google Forms.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    demo: 'https://marina-seaview.vercel.app/',
    repo: null,
    media: { type: 'browser', src: marinaShot, alt: 'Marina Seaview homepage' },
  },
  {
    title: 'BST Sweetbakes',
    color: 'red',
    desc: 'A concept inquiry site modeled on a local bakery, letting customers browse offerings and send order inquiries straight to Messenger.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    demo: 'https://bst-sweetbakes.vercel.app/',
    repo: null,
    media: { type: 'browser', src: sweetbakesShot, alt: 'BST Sweetbakes homepage' },
  },
]

function ProjectMedia({ media, demo }) {
  if (media.type === 'phones') {
    return (
      <figure className="project-media phone-stack">
        {media.screens.map(s => (
          <div className="phone" key={s.alt}>
            <img src={s.src} alt={s.alt} width="402" height="874" loading="lazy" decoding="async" />
          </div>
        ))}
      </figure>
    )
  }
  if (media.type === 'poster') {
    // Projects with no public site (private repo, desktop app) show a branded panel instead of a screenshot.
    return (
      <figure className="project-media poster-frame">
        <img src={media.src} alt={media.alt} width="960" height="465" loading="lazy" decoding="async" />
      </figure>
    )
  }
  return (
    <figure className="project-media browser-frame">
      <div className="browser-bar" aria-hidden="true">
        <span className="browser-dot dot-red" />
        <span className="browser-dot dot-yellow" />
        <span className="browser-dot dot-green" />
        <span className="browser-url">{new URL(demo).host}</span>
      </div>
      <img src={media.src} alt={media.alt} width="960" height="465" loading="lazy" decoding="async" />
    </figure>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="panel panel-bone">
      <div className="seam" />
      <div className="wrapper">
        <h2 className="heading rise">Developed <em>works.</em></h2>
        <div className="projects-list">
          {projects.map((p, i) => (
            <Tilt key={p.title}>
              <article
                className={`project-plate plate-${p.color} pop${p.media ? ' has-media' : ''}${i % 2 ? ' media-left' : ''}`}
                style={{ '--rot': i % 2 === 0 ? '-0.6deg' : '0.6deg' }}
              >
                <span className="plate-glare" aria-hidden="true" />
                <div className="project-body">
                  <div className="project-head">
                    <h3 className="project-title">{p.title}</h3>
                    <div className="project-links">
                      {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="project-link">Live ↗</a>}
                      {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="project-link">GitHub ↗</a>}
                      {p.award && <a href={p.award} className="project-link">Champion ↓</a>}
                    </div>
                  </div>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-stack">
                    {p.stack.map(s => <span key={s}>{s}</span>)}
                  </div>
                </div>
                {p.media && <ProjectMedia media={p.media} demo={p.demo} />}
              </article>
            </Tilt>
          ))}
        </div>
      </div>
      <div className="exhaust" aria-hidden="true">
        <span /><span /><span />
      </div>
    </section>
  )
}
