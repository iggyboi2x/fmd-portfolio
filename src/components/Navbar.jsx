import { useState, useEffect } from 'react'
import './Navbar.css'

const links = ['about', 'skills', 'projects', 'experience', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-badge" aria-label="Back to top">FMD</a>

      <div className={`nav-links-drop ${open ? 'open' : ''}`}>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l}><a href={`#${l}`} onClick={() => setOpen(false)}>{l}</a></li>
          ))}
        </ul>
      </div>

      <button
        className={`nav-burger ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span /><span />
      </button>
    </nav>
  )
}
