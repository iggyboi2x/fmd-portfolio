import './About.css'

export default function About() {
  return (
    <section id="about">
      <div className="divider" />
      <div className="wrapper about-grid">
        <div className="about-left">
          <p className="eyebrow">About</p>
          <h2 className="heading">A developer<br />who thrives at<br /><em>the intersection.</em></h2>
        </div>
        <div className="about-right">
          <p>
            I'm <strong>Francis Miguel Diano</strong>, a 3rd year Bachelor of Science in Information
            Technology student at the <strong>University of Cebu Lapu-Lapu and Mandaue</strong>.
          </p>
          <p>
            I thrive at the intersection of design and functionality — spending my time engineering
            projects that challenge my understanding of modern tech stacks. From reservation systems
            to real-time voting platforms, I build things that actually get used.
          </p>
          <p>
            My frontend focus is strong, and I'm expanding into full-stack territory with
            <strong> Laravel, Supabase, and PostgreSQL</strong>. I care deeply about the User Experience,
            Solid architecture, and shipping work that solves real problems.
          </p>
          <div className="about-numbers">
            <div className="about-stat">
              <span className="stat-num">5+</span>
              <span className="stat-label">Projects Developed</span>
            </div>
            <div className="about-stat">
              <span className="stat-num">3rd</span>
              <span className="stat-label">Year BSIT</span>
            </div>
            <div className="about-stat">
              <span className="stat-num">Dean's</span>
              <span className="stat-label">Lister 2023–present</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
