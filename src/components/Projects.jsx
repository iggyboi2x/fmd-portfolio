import './Projects.css'

const projects = [
  {
    index: '01',
    title: 'Freesoul Cyber Gadgets',
    desc: 'Built with my dev team — a full-stack business website for a device repair shop featuring a service inquiry system, real-time repair ticket tracker, nationwide quote request form, and a blog with ISR.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'Three.js', 'Resend'],
    demo: 'https://freesoul-ph.vercel.app/',
    repo: null,
  },
  {
    index: '02',
    title: 'UCLM PSITS Voting System',
    desc: 'Co-developed and deployed a real-time digital balloting platform used by the UCLM CCS department to elect a new slate of PSITS student officers.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Express', 'PostgreSQL', 'JWT', 'bcryptjs'],
    demo: null,
    repo: 'https://github.com/ire-zepelli/voting-system',
  },
  {
    index: '03',
    title: 'Marina Seaview',
    desc: 'Designed and developed an inquiry reservation system for a thriving local events venue in Lapu-Lapu, featuring a gallery, menu showcase, and contact/reservation section.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    demo: 'https://marina-seaview.vercel.app/',
    repo: null,
  },
  {
    index: '04',
    title: 'StringGuard',
    desc: 'A secure, privacy-focused text storage web app inspired by ProtectedText — supports rich text editing and multi-language code editing with syntax highlighting.',
    stack: ['React', 'Vite', 'Supabase', 'Tiptap', 'CodeMirror', 'bcryptjs'],
    demo: 'https://stringguard.vercel.app/',
    repo: null,
  },
  {
    index: '05',
    title: 'BST Sweetbakes',
    desc: 'Designed and developed an inquiry system for a local bakery, letting users browse offerings and send order inquiries directly to the business via Messenger.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    demo: 'https://bst-sweetbakes.vercel.app/',
    repo: null,
  },
]

export default function Projects() {
  return (
    <section id="projects">
      <div className="divider" />
      <div className="wrapper">
        <p className="eyebrow">Projects</p>
        <h2 className="heading">Developed Works.</h2>
        <div className="projects-list">
          {projects.map(p => (
            <div className="project-row" key={p.title}>
              <span className="project-index">{p.index}</span>
              <div className="project-body">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-stack">
                  {p.stack.map(s => <span key={s}>{s}</span>)}
                </div>
              </div>
              <div className="project-links">
                {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="project-link">Live ↗</a>}
                {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="project-link">GitHub ↗</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
