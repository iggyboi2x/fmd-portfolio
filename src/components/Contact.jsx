import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xnjrrodq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" className="panel panel-ink">
      <div className="seam" />
      <div className="wrapper contact-wrapper">

        <div className="contact-left">
          <h2 className="heading">Let's build<br />something<br /><em>together.</em></h2>
          <p className="contact-intro">
            Open to freelance projects, internships, or full-time roles.
            Based in Mandaue City, Cebu — available remotely anywhere.
          </p>

          <div className="contact-signal-row">
            <a href="mailto:francismigueldiano@gmail.com" className="contact-email plate">
              francismigueldiano@gmail.com ↗
            </a>
            <span className="turn-signal" aria-hidden="true">
              <i /><i /><i />
            </span>
          </div>

          <div className="contact-socials">
            <a href="tel:+639544081366" className="social-link">+63 954 408 1366</a>
            <a href="https://github.com/iggyboi2x" target="_blank" rel="noreferrer" className="social-link">GitHub ↗</a>
            <a href="https://linkedin.com/in/francis-miguel-diano-091760316" target="_blank" rel="noreferrer" className="social-link">LinkedIn ↗</a>
          </div>
        </div>

        <div className="contact-right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="What's on your mind?" value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-solid form-btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
            {status === 'sent' && <p className="form-feedback success">Message sent! I'll get back to you soon.</p>}
            {status === 'error' && <p className="form-feedback error">Something went wrong. Try emailing me directly.</p>}
          </form>
        </div>

      </div>
    </section>
  )
}
