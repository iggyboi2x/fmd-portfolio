import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero panel panel-ink">
      <div className="hero-bars" aria-hidden="true">
        <span className="bar bar-red" />
        <span className="bar bar-blue" />
        <span className="bar bar-green" />
      </div>

      <div className="hero-road" aria-hidden="true">
        <span className="hero-glare glare-a" />
        <span className="hero-glare glare-b" />
        <span className="hero-lane" />
      </div>

      <div className="hero-inner">
        <div className="plate hero-status rise" style={{ '--d': '0ms' }}>
          <span className="hero-status-dot" />
          Open to work — internships &amp; freelance
        </div>

        <h1 className="hero-name">
          <span className="rise" style={{ '--d': '120ms' }}>FRANCIS</span>
          <span className="rise hero-name-accent" style={{ '--d': '220ms' }}>MIGUEL.</span>
        </h1>

        <div className="hero-bottom">
          <p className="hero-sub rise" style={{ '--d': '340ms' }}>
            Full-stack engineer &amp; 4th-year BSIT student in Cebu, PH — I build and
            ship real products, from client reservation sites to a live campus
            election system.
          </p>
          <div className="hero-ctas rise" style={{ '--d': '440ms' }}>
            <a href="#projects" className="btn btn-solid">View Projects</a>
            <a href="#contact" className="btn btn-outline">Get In Touch</a>
          </div>
        </div>
      </div>

      <a href="#about" className="hero-scroll rise" style={{ '--d': '560ms' }} aria-label="Scroll to about section">
        Scroll
      </a>
    </section>
  )
}
