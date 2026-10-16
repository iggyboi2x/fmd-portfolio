import { useEffect, useRef, useState } from 'react'
import './About.css'

const PROJECTS_SHIPPED = 5
const COUNT_MS = 1100
const REV_MS = 1400

// Counts the stat up from zero the first time it scrolls into view and
// throws the gauge needle into a full rev at the same moment.
function useCountUp(target) {
  const ref = useRef(null)
  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [value, setValue] = useState(() => (reduce() ? target : 0))
  const [revving, setRevving] = useState(false)

  useEffect(() => {
    if (reduce()) return
    let frame = 0
    let revTimer
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      setRevving(true)
      revTimer = setTimeout(() => setRevving(false), REV_MS)
      const start = performance.now()
      const step = now => {
        const t = Math.min(1, (now - start) / COUNT_MS)
        setValue(Math.round(target * (1 - Math.pow(1 - t, 3))))
        if (t < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }, { threshold: 0.6 })
    io.observe(ref.current)
    return () => { io.disconnect(); cancelAnimationFrame(frame); clearTimeout(revTimer) }
  }, [target])

  return { ref, value, revving }
}

export default function About() {
  const { ref: statRef, value: shipped, revving } = useCountUp(PROJECTS_SHIPPED)

  return (
    <section id="about" className="panel panel-bone">
      <div className="seam" />
      <div className="wrapper about-grid">
        <div className="about-left">
          <h2 className="heading rise">A developer<br />who thrives at<br /><em>the intersection.</em></h2>
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
          <div className="about-stat-row" ref={statRef}>
            <div className="about-stat plate">
              <span className="stat-num">
                <span aria-hidden="true">{shipped}+</span>
                <span className="sr-only">{PROJECTS_SHIPPED}+</span>
              </span>
              <span className="stat-label">Projects shipped<br />to production</span>
            </div>
            <div className={`gauge${revving ? ' is-revving' : ''}`} aria-hidden="true">
              <span className="gauge-face" />
              <span className="gauge-needle" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
