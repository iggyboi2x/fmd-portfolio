import { useEffect } from 'react'

const FINE_POINTER = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

// Plays `.pop` / `.rise` entrances when each element scrolls into view
// instead of all at once on page load (when most of them are off-screen).
// The paused state only applies once `reveal-ready` is on <html>, so if this
// never runs, everything simply animates on load as before — never hidden.
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.pop, .rise')
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('in-view')
        io.unobserve(entry.target)
      }
    }, { rootMargin: '0px 0px -12% 0px' })
    document.documentElement.classList.add('reveal-ready')
    els.forEach(el => io.observe(el))
    return () => {
      io.disconnect()
      document.documentElement.classList.remove('reveal-ready')
    }
  }, [])
}

// Buttons lean toward a nearby cursor, like a sticker catching on a magnet.
// Uses the separate `translate` property so it composes with the press
// transform every `.btn` already has on :hover / :active.
const REACH = 70 // px beyond the button's edge where the pull starts
const PULL = 0.22
const MAX = 9 // px

export function useMagneticButtons() {
  useEffect(() => {
    if (!window.matchMedia(FINE_POINTER).matches) return
    const btns = [...document.querySelectorAll('.btn')]
    let frame = 0
    let last = null

    const update = () => {
      frame = 0
      for (const b of btns) {
        const r = b.getBoundingClientRect()
        const dx = last.x - (r.left + r.width / 2)
        const dy = last.y - (r.top + r.height / 2)
        const near = Math.abs(dx) < r.width / 2 + REACH && Math.abs(dy) < r.height / 2 + REACH
        const clamp = v => Math.max(-MAX, Math.min(MAX, v * PULL))
        b.style.setProperty('--mag-x', near ? `${clamp(dx).toFixed(1)}px` : '0px')
        b.style.setProperty('--mag-y', near ? `${clamp(dy).toFixed(1)}px` : '0px')
      }
    }
    const onMove = e => {
      last = { x: e.clientX, y: e.clientY }
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      btns.forEach(b => { b.style.removeProperty('--mag-x'); b.style.removeProperty('--mag-y') })
    }
  }, [])
}
