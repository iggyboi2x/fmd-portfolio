import './Projects.css'

const projects = [
  {
    title: 'Freesoul Cyber Gadgets',
    color: 'red',
    desc: 'Built with my dev team — a full-stack business website for a device repair shop featuring a service inquiry system, real-time repair ticket tracker, nationwide quote request form, and a blog with ISR.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'Three.js', 'Resend'],
    demo: 'https://freesoul-ph.vercel.app/',
    repo: null,
  },
  {
    title: 'UCLM PSITS Voting System',
    color: 'blue',
    desc: 'Co-developed and deployed a real-time digital balloting platform used by the UCLM CCS department to elect a new slate of PSITS student officers, handling concurrent voters and live vote updates.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Express', 'PostgreSQL', 'JWT', 'bcryptjs'],
    demo: null,
    repo: 'https://github.com/ire-zepelli/voting-system',
  },
  {
    title: 'Marina Seaview',
    color: 'green',
    desc: 'Designed and developed an inquiry reservation system for a thriving local events venue in Lapu-Lapu, with a gallery, menu showcase, and a smart reservation form that pre-fills straight into Google Forms.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    demo: 'https://marina-seaview.vercel.app/',
    repo: null,
  },
  {
    title: 'StringGuard',
    color: 'yellow',
    desc: 'A privacy-focused text storage app with client-side encryption — password-protected workspaces using bcryptjs and PBKDF2 key derivation, a Tiptap rich-text editor, and a CodeMirror code editor supporting 15+ languages. Multi-tab, auto-saving, fully responsive.',
    stack: ['React', 'Vite', 'Supabase', 'Tiptap', 'CodeMirror', 'bcryptjs'],
    demo: 'https://stringguard.online/',
    repo: null,
  },
  {
    title: 'BST Sweetbakes',
    color: 'red',
    desc: 'Designed and developed an inquiry system for a local bakery, letting customers browse offerings and send order inquiries directly to the business via Messenger.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    demo: 'https://bst-sweetbakes.vercel.app/',
    repo: null,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="panel panel-bone">
      <div className="seam" />
      <div className="wrapper">
        <h2 className="heading">Developed <em>works.</em></h2>
        <div className="projects-list">
          {projects.map((p, i) => (
            <article
              className={`project-plate plate-${p.color} pop`}
              key={p.title}
              style={{ '--d': `${i * 60}ms`, '--rot': i % 2 === 0 ? '-0.6deg' : '0.6deg' }}
            >
              <div className="project-head">
                <h3 className="project-title">{p.title}</h3>
                <div className="project-links">
                  {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="project-link">Live ↗</a>}
                  {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="project-link">GitHub ↗</a>}
                </div>
              </div>
              <p className="project-desc">{p.desc}</p>
              <div className="project-stack">
                {p.stack.map(s => <span key={s}>{s}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
