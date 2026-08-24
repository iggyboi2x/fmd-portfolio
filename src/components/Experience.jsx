import './Experience.css'

const education = [
  {
    period: '2023 — Present',
    role: 'Bachelor of Science in Information Technology',
    company: 'University of Cebu Lapu-Lapu and Mandaue',
    desc: "Currently in 4th year, Academic Scholar. Focused on full-stack web development, software engineering, and networking fundamentals.",
  },
  {
    period: '2021 — 2023',
    role: 'Senior High School — TechVoc ICT',
    company: 'University of Cebu Lapu-Lapu and Mandaue',
    desc: 'Technical-Vocational track with a focus on ICT. Built a foundation in programming, computer hardware, and systems operations.',
  },
]

const certifications = [
  { title: 'Claude 101', issuer: 'Anthropic', color: 'yellow', link: 'https://verify.skilljar.com/c/3yczqc6p63w3' },
  { title: 'Academic Scholar', issuer: 'UC Lapu-Lapu and Mandaue', color: 'bone' },
  { title: 'Networking Essentials', issuer: 'Cisco Networking Academy', meta: '2023', color: 'bone' },
  { title: 'Get Connected', issuer: 'Cisco Networking Academy', meta: '2023', color: 'bone' },
  { title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', meta: '2023', color: 'bone' },
]

export default function Experience() {
  return (
    <section id="experience" className="panel panel-blue">
      <div className="seam" />
      <div className="wrapper">
        <h2 className="heading">Education &amp;<br /><em>certifications.</em></h2>

        <div className="exp-list">
          {education.map(e => (
            <div className="exp-row" key={e.role}>
              <span className="exp-period">{e.period}</span>
              <div className="exp-body">
                <h3 className="exp-role">{e.role}</h3>
                <p className="exp-company">{e.company}</p>
                <p className="exp-desc">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="certs-section">
          <div className="certs-grid">
            {certifications.map(c => {
              const Tag = c.link ? 'a' : 'div'
              return (
                <Tag
                  className={`cert-plate cert-${c.color}`}
                  key={c.title}
                  {...(c.link ? { href: c.link, target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <span className="cert-title">{c.title}{c.link ? ' ↗' : ''}</span>
                  <span className="cert-meta">{c.issuer}{c.meta ? ` · ${c.meta}` : ''}</span>
                </Tag>
              )
            })}
          </div>
        </div>
      </div>
      <div className="headlight-sweep" aria-hidden="true" />
    </section>
  )
}
