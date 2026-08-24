import './Skills.css'

const skillGroups = [
  {
    title: 'Production-ready',
    note: 'What I build client work with',
    color: 'yellow',
    items: ['React.js', 'Next.js', 'Tailwind CSS', 'Supabase', 'Vite', 'SQL'],
  },
  {
    title: 'Experienced',
    note: 'Comfortable shipping with',
    color: 'red',
    items: ['PHP', 'Laravel', 'Node.js', 'Figma', 'Git / GitHub', 'Vercel', 'Custom Domains', 'SEO Optimization'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="panel panel-ink">
      <div className="seam" />
      <div className="wrapper">
        <h2 className="heading">What I <em>work with.</em></h2>
        <div className="skills-groups">
          {skillGroups.map(group => (
            <div className="skills-group" key={group.title}>
              <div className="skills-group-head">
                <h3>{group.title}</h3>
                <span>{group.note}</span>
              </div>
              <div className="skills-items">
                {group.items.map((item, i) => (
                  <span
                    className={`skill-pill pill-${group.color}`}
                    key={item}
                    style={{ '--sway-delay': `${(i % 5) * -0.9}s`, '--sway-dur': `${4.5 + (i % 4) * 0.6}s` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
