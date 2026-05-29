import './Skills.css'

const skillGroups = [
  {
    title: 'Languages',
    items: ['JavaScript', 'TypeScript', 'PHP', 'Java', 'C', 'SQL'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Vite', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    title: 'Backend',
    items: ['Laravel'],
  },
  {
    title: 'Database & Auth',
    items: ['PostgreSQL', 'Supabase', 'MySQL'],
  },
  {
    title: 'Tools & Design',
    items: ['Git', 'GitHub', 'Figma'],
  },
]

export default function Skills() {
  return (
    <section id="skills">
      <div className="divider" />
      <div className="wrapper">
        <p className="eyebrow">Skills</p>
        <h2 className="heading">What I work with.</h2>
        <div className="skills-table">
          {skillGroups.map(group => (
            <div className="skills-row" key={group.title}>
              <div className="skills-row-label">
                <span>{group.title}</span>
              </div>
              <div className="skills-row-items">
                {group.items.map(item => (
                  <span className="skill-pill" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
