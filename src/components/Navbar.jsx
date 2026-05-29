import { useState, useEffect } from 'react'
import './Navbar.css'

const links = ['about', 'projects', 'experience', 'blog', 'contact']

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
      <span className="nav-logo">FMD</span>
      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {links.map(l => (
          <li key={l}><a href={`#${l}`} onClick={() => setOpen(false)}>{l}</a></li>
        ))}
      </ul>
      <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="menu">
        <span /><span /><span />
      </button>
    </nav>
  )
}
