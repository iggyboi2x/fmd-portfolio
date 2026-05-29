import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-status">
        <span className="hero-status-dot" />
        Open to opportunities
      </div>

      <h1 className="hero-name">
        Francis<br />
        <em>Miguel.</em>
      </h1>

      <div className="hero-bottom">
        <p className="hero-sub">
          Fullstack developer &amp; BSIT student based in Cebu, PH.
          Building real products at the intersection of design and functionality.
        </p>
        <div className="hero-ctas">
          <a href="#projects" className="btn btn-solid">View Work</a>
          <a href="#contact" className="btn btn-outline">Contact</a>
        </div>
      </div>

      <a href="#about" className="hero-scroll" aria-label="Scroll to about">Scroll</a>
    </section>
  )
}
