import './About.css'

export default function About() {
  return (
    <section id="about" className="panel panel-bone">
      <div className="seam" />
      <div className="wrapper about-grid">
        <div className="about-left">
          <h2 className="heading">A developer<br />who thrives at<br /><em>the intersection.</em></h2>
        </div>
        <div className="about-right">
          <p>
            I'm <strong>Francis Miguel Diano</strong>, a 4th-year Bachelor of Science in Information
            Technology student and Academic Scholar at the <strong>University of Cebu Lapu-Lapu and Mandaue</strong>.
          </p>
          <p>
            I thrive at the intersection of design and functionality — spending my time engineering
            projects that challenge my understanding of modern tech stacks. From reservation systems
            to real-time voting platforms, I build things that actually get used.
          </p>
          <p>
            My frontend focus is strong across <strong>React, Next.js, and Tailwind CSS</strong>, and
            I'm production-ready with <strong>Supabase and SQL</strong>. I care deeply about user
            experience, solid architecture, and shipping work that solves real problems for real clients.
          </p>
          <div className="about-stat-row">
            <div className="about-stat plate">
              <span className="stat-num">5+</span>
              <span className="stat-label">Projects shipped<br />to production</span>
            </div>
            <div className="gauge" aria-hidden="true">
              <span className="gauge-face" />
              <span className="gauge-needle" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
