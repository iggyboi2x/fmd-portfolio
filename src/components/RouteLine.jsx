import { useEffect, useRef, useState } from 'react'
import './RouteLine.css'

// The page as a jeepney route: a line down the left edge that fills as you
// scroll, with a stop for each section placed where that section actually
// starts, so a stop lights up exactly when the fill reaches it. Decorative —
// the navbar is the real navigation — so it is hidden from assistive tech.
const STOPS = [
  ['hero', 'Start'],
  ['about', 'About'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
]

export default function RouteLine() {
  const fillRef = useRef(null)
  const [stops, setStops] = useState(() => STOPS.map((_, i) => i / (STOPS.length - 1)))
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      fillRef.current.style.transform = `scaleY(${p})`
      setProgress(p)
      setStops(prev => {
        const next = STOPS.map(([id]) => {
          const el = document.getElementById(id)
          return el && max > 0 ? Math.min(1, el.offsetTop / max) : 0
        })
        return next.every((v, i) => Math.abs(v - prev[i]) < 0.001) ? prev : next
      })
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  // A stop counts as reached a hair before the fill touches it, so the
  // last stop still lights when the page can't scroll quite that far.
  const reached = stops.map(pos => progress >= pos - 0.002)
  const active = reached.lastIndexOf(true)

  return (
    <div className="route-line" aria-hidden="true">
      <span className="route-line-fill" ref={fillRef} />
      {STOPS.map(([id, label], i) => (
        <span
          key={id}
          className={`route-stop${reached[i] ? ' is-reached' : ''}${i === active ? ' is-active' : ''}`}
          style={{ top: `${stops[i] * 100}%` }}
        >
          <span className="route-stop-label">{label}</span>
        </span>
      ))}
    </div>
  )
}
