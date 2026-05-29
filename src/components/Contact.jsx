import './Contact.css'

export default function Contact() {
  return (
    <section id="contact">
      <div className="divider" />
      <div className="wrapper contact-wrapper">
        <div className="contact-left">
          <p className="eyebrow">Contact</p>
          <h2 className="heading">Let's build<br />something<br /><em>together.</em></h2>
        </div>
        <div className="contact-right">
          <p className="contact-intro">
            Open to freelance projects, internships, or full-time roles.
            Based in Mandaue City, Cebu — available remotely anywhere.
          </p>
          <a href="mailto:francismigueldiano@gmail.com" className="contact-email">
            francismigueldiano@gmail.com ↗
          </a>
          <div className="contact-socials">
            <a href="https://github.com/iggyboi2x" target="_blank" rel="noreferrer" className="social-link">GitHub ↗</a>
            <a href="https://linkedin.com/in/francis-miguel-diano-091760316" target="_blank" rel="noreferrer" className="social-link">LinkedIn ↗</a>
          </div>
        </div>
      </div>
    </section>
  )
}
