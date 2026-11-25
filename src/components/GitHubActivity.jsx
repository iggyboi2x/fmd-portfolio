import { useEffect, useMemo, useRef, useState } from 'react'
import './GitHubActivity.css'

// Live contribution graph. GitHub's own contribution API needs a secret token,
// so this reads the public profile data through a free, CORS-enabled service.
// Private-repo work is included because the profile counts private contributions.
const USER = 'iggyboi2x'
const API = `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`
const PROFILE = `https://github.com/${USER}`
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// 'YYYY-MM-DD' -> Date at UTC midnight, so no timezone can shift a day.
const asDate = s => new Date(`${s}T00:00:00Z`)
const fmt = d => `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`
const fmtFull = d => `${fmt(d)}, ${d.getUTCFullYear()}`

function analyse(days) {
  // Columns are weeks starting on Sunday, like GitHub's graph.
  const lead = asDate(days[0].date).getUTCDay()
  const cells = [...Array(lead).fill(null), ...days]
  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))

  // A month label goes over the first week that contains that month's 1st–7th.
  const months = []
  weeks.forEach((week, col) => {
    const first = week.find(Boolean)
    if (!first) return
    const d = asDate(first.date)
    if (col === 0 || d.getUTCDate() <= 7) {
      const prev = months.at(-1)
      const label = { col, label: MONTHS[d.getUTCMonth()] }
      if (!prev || col - prev.col >= 3) months.push(label)
      // A partial first month too close to the next one gives way to it.
      else if (prev.col === 0) months[months.length - 1] = label
    }
  })

  // Longest run of active days anywhere in the window.
  let longest = { len: 0 }, run = null
  for (const day of days) {
    if (day.count > 0) {
      run = run ? { ...run, end: day.date, len: run.len + 1 } : { start: day.date, end: day.date, len: 1 }
      if (run.len > longest.len) longest = run
    } else run = null
  }

  // Current streak: counts back from today; an empty today doesn't break it
  // until the day is over (GitHub's convention).
  let i = days.length - 1
  if (days[i].count === 0) i--
  let current = { len: 0 }
  for (; i >= 0 && days[i].count > 0; i--) {
    current = { start: days[i].date, end: current.end ?? days[i].date, len: current.len + 1 }
  }

  return { weeks, months, longest, current }
}

const range = s => (s.len ? `${fmt(asDate(s.start))} – ${fmt(asDate(s.end))}` : 'No active streak')

export default function GitHubActivity() {
  const [state, setState] = useState({ status: 'loading' })
  const scrollRef = useRef(null)

  useEffect(() => {
    const ctrl = new AbortController()
    fetch(API, { signal: ctrl.signal })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(json => {
        if (!Array.isArray(json.contributions) || !json.contributions.length) throw new Error('no data')
        setState({ status: 'ready', total: json.total?.lastYear ?? 0, days: json.contributions })
      })
      .catch(err => { if (err.name !== 'AbortError') setState({ status: 'error' }) })
    return () => ctrl.abort()
  }, [])

  const data = useMemo(() => (state.status === 'ready' ? analyse(state.days) : null), [state])

  // Narrow screens scroll the graph; start at the most recent weeks.
  useEffect(() => {
    if (data && scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
  }, [data])

  return (
    <section id="github" className="panel panel-bone">
      <div className="seam" />
      <div className="wrapper">
        <h2 className="heading rise">Always <em>shipping.</em></h2>

        <div className="gh-card" aria-busy={state.status === 'loading'}>
          <div className="gh-head">
            <p className="gh-total">
              {state.status === 'ready'
                ? <><strong>{state.total.toLocaleString()}</strong> contributions in the last year</>
                : state.status === 'loading' ? 'Loading live GitHub activity…' : 'GitHub activity is unavailable right now.'}
            </p>
            <a className="gh-profile" href={PROFILE} target="_blank" rel="noreferrer">@{USER} ↗</a>
          </div>

          {data && (
            <>
              <div className="gh-scroll" ref={scrollRef}>
                <div className="gh-graph" role="img"
                  aria-label={`${state.total} GitHub contributions in the last year; current streak ${data.current.len} days, longest ${data.longest.len} days.`}>
                  <div className="gh-months" aria-hidden="true">
                    {data.months.map(m => (
                      <span key={m.col} style={{ gridColumn: m.col + 1 }}>{m.label}</span>
                    ))}
                  </div>
                  <div className="gh-days" aria-hidden="true">
                    <span /><span>Mon</span><span /><span>Wed</span><span /><span>Fri</span><span />
                  </div>
                  <div className="gh-weeks" aria-hidden="true">
                    {data.weeks.map((week, w) => (
                      <div className="gh-week" key={w}>
                        {week.map((day, d) => day
                          ? <span key={d} className={`gh-cell lv-${day.level}`}
                              title={`${day.count || 'No'} contribution${day.count === 1 ? '' : 's'} on ${fmtFull(asDate(day.date))}`} />
                          : <span key={d} className="gh-cell gh-pad" />)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="gh-legend" aria-hidden="true">
                Less {[0, 1, 2, 3, 4].map(l => <span key={l} className={`gh-cell lv-${l}`} />)} More
              </div>

              <dl className="gh-stats">
                <div>
                  <dt>Total contributions</dt>
                  <dd>{state.total.toLocaleString()}</dd>
                  <dd className="gh-sub">{fmtFull(asDate(state.days[0].date))} – today</dd>
                </div>
                <div>
                  <dt>Current streak</dt>
                  <dd>{data.current.len} {data.current.len === 1 ? 'day' : 'days'}</dd>
                  <dd className="gh-sub">{range(data.current)}</dd>
                </div>
                <div>
                  <dt>Longest streak</dt>
                  <dd>{data.longest.len} {data.longest.len === 1 ? 'day' : 'days'}</dd>
                  <dd className="gh-sub">{range(data.longest)}</dd>
                </div>
              </dl>
            </>
          )}

          {state.status === 'loading' && <div className="gh-skeleton" aria-hidden="true" />}
        </div>
      </div>
    </section>
  )
}
