import { useEffect, useRef } from 'react'
import './Spotlight.css'

// A torch beam that follows the cursor across its parent section, lighting
// up a rivet grid that is otherwise invisible. Render it before the
// section's positioned content so it paints underneath.
export default function Spotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const host = el.parentElement
    const canFollow = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    if (!canFollow.matches) return

    let frame = 0
    const onMove = e => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect()
        el.style.setProperty('--sx', `${e.clientX - r.left}px`)
        el.style.setProperty('--sy', `${e.clientY - r.top}px`)
        el.classList.add('is-lit')
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      el.classList.remove('is-lit')
    }

    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <div className="spotlight" ref={ref} aria-hidden="true" />
}
