import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-status anim" style={{ '--d': '0ms' }}>
        <span className="hero-status-dot" />
        Open to opportunities
      </div>

      <h1 className="hero-name">
        <span className="anim" style={{ '--d': '120ms' }}>Francis</span>
        <br />
        <em className="anim" style={{ '--d': '220ms' }}>Miguel.</em>
      </h1>

      <div className="hero-bottom">
        <p className="hero-sub anim" style={{ '--d': '340ms' }}>
          Fullstack developer &amp; BSIT student based in Cebu, PH.
          Building real products at the intersection of design and functionality.
        </p>
        <div className="hero-ctas anim" style={{ '--d': '440ms' }}>
          <a href="#projects" className="btn btn-solid">View Projects</a>
          <a href="#contact" className="btn btn-outline">Contact</a>
        </div>
      </div>

      <a href="#about" className="hero-scroll anim" style={{ '--d': '560ms' }} aria-label="Scroll to about">Scroll</a>
    </section>
  )
}
