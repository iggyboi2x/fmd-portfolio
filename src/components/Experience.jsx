import './Experience.css'

const education = [
  {
    period: '2023 — Present',
    role: 'Bachelor of Science in Information Technology',
    company: 'University of Cebu Lapu-Lapu and Mandaue',
    desc: 'Currently in 3rd year. Dean\'s Lister since 2023. Focused on fullstack web development, software engineering, and networking fundamentals.',
  },
  {
    period: '2021 — 2023',
    role: 'Senior High School — TechVoc ICT',
    company: 'University of Cebu Lapu-Lapu and Mandaue',
    desc: 'Technical-Vocational track with a focus on ICT. Built a foundation in programming, computer hardware, and systems operations.',
  },
]

const certifications = [
  { title: 'Networking Essentials', issuer: 'Cisco Networking Academy', year: '2023' },
  { title: 'Get Connected', issuer: 'Cisco Networking Academy', year: '2023' },
  { title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', year: '2023' },
  { title: "Dean's Lister", issuer: 'UC Lapu-Lapu and Mandaue', year: '2023–Present' },
]

export default function Experience() {
  return (
    <section id="experience">
      <div className="divider" />
      <div className="wrapper">
        <p className="eyebrow">Experience</p>
        <h2 className="heading">Education &amp;<br />Certifications.</h2>

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
          <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>Certifications</p>
          <div className="certs-grid">
            {certifications.map(c => (
              <div className="cert-card" key={c.title}>
                <span className="cert-title">{c.title}</span>
                <span className="cert-meta">{c.issuer} · {c.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
