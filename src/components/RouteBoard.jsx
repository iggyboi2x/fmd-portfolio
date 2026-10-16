import { useEffect, useRef, useState } from 'react'
import './RouteBoard.css'

// A split-flap destination board, like the route sign on a jeepney's roof.
// Each flap only ever advances forward through CHARS, one step per tick,
// exactly like a real mechanical board — so a long jump (A → Z) visibly
// takes longer than a short one, and the word settles cell by cell.
const CHARS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ-'
const WORDS = ['FULL-STACK', 'MOBILE APPS', 'AI FEATURES', 'REAL-TIME', 'CLIENT SITES']
const WIDTH = Math.max(...WORDS.map(w => w.length))
const STEP_MS = 45
const HOLD_MS = 2800
const START_DELAY_MS = 700

const cellsOf = word => word.padEnd(WIDTH, ' ').split('')

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function RouteBoard() {
  const boardRef = useRef(null)
  const [cells, setCells] = useState(() => cellsOf(reducedMotion() ? WORDS[0] : ''))

  useEffect(() => {
    const reduce = reducedMotion()
    let visible = true
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    io.observe(boardRef.current)

    let current = cellsOf(reduce ? WORDS[0] : '')
    let idx = 0
    let timer

    const tick = () => {
      const goal = cellsOf(WORDS[idx])
      let moving = false
      current = current.map((c, i) => {
        if (c === goal[i]) return c
        moving = true
        return CHARS[(CHARS.indexOf(c) + 1) % CHARS.length]
      })
      setCells(current)
      timer = setTimeout(moving ? tick : advance, moving ? STEP_MS : HOLD_MS)
    }

    // Only spend frames while someone can actually see the board.
    const advance = () => {
      if (!visible || document.hidden) {
        timer = setTimeout(advance, HOLD_MS)
        return
      }
      idx = (idx + 1) % WORDS.length
      if (reduce) {
        current = cellsOf(WORDS[idx])
        setCells(current)
        timer = setTimeout(advance, HOLD_MS)
      } else {
        tick()
      }
    }

    timer = reduce ? setTimeout(advance, HOLD_MS) : setTimeout(tick, START_DELAY_MS)
    return () => { clearTimeout(timer); io.disconnect() }
  }, [])

  return (
    <div className="route-board" ref={boardRef}>
      <span className="route-label" aria-hidden="true">Route</span>
      <p className="sr-only">I build full-stack web apps, mobile apps, AI features, real-time systems and client sites.</p>
      <div className="flaps" aria-hidden="true">
        {cells.map((c, i) => (
          <span className="flap" key={i}>
            <span className="flap-char" key={c}>{c}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
