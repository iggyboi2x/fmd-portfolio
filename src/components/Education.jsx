import './Education.css'

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

export default function Education() {
  return (
    <section id="education" className="panel panel-blue">
      <div className="seam" />
      <div className="wrapper">
        <h2 className="heading rise">Where I <em>study.</em></h2>

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
      </div>
      <div className="headlight-sweep" aria-hidden="true" />
    </section>
  )
}
