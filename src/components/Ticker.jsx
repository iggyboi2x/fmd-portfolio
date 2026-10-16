import './Ticker.css'

// An LED dot-matrix signboard scrolling the stack, the kind bolted above a
// jeepney windshield. Decorative only: the same items are listed as real
// text in the skill groups below, so the whole board is hidden from
// assistive tech. The list is rendered twice so a -50% scroll loops seamlessly.
export default function Ticker({ items }) {
  const run = items.map(item => (
    <span className="ticker-item" key={item}>{item}</span>
  ))

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <div className="ticker-run">{run}</div>
        <div className="ticker-run">{run}</div>
      </div>
    </div>
  )
}
