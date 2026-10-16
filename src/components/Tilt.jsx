import { useEffect, useRef } from 'react'

// Tilts its child toward the cursor and drives a glare position, both
// through CSS variables (--rx, --ry, --gx, --gy) so the styling stays in CSS.
// Lives on a wrapper because the card inside already owns `transform`
// for its entrance animation and permanent tilt.
const MAX_X = 5 // deg, around the horizontal axis
const MAX_Y = 4 // deg, around the vertical axis

export default function Tilt({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const canTilt = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    if (!canTilt.matches) return

    let frame = 0
    const onMove = e => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--rx', `${((0.5 - y) * 2 * MAX_X).toFixed(2)}deg`)
        el.style.setProperty('--ry', `${((x - 0.5) * 2 * MAX_Y).toFixed(2)}deg`)
        el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
        el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
        el.classList.add('is-tilting')
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      el.classList.remove('is-tilting')
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <div className="tilt" ref={ref}>{children}</div>
}
