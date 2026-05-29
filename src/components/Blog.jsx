import './Blog.css'

export default function Blog() {
  return (
    <section id="blog">
      <div className="divider" />
      <div className="wrapper">
        <p className="eyebrow">Writing</p>
        <h2 className="heading">Thoughts &amp; notes.</h2>
        <div className="blog-empty">
          <span className="blog-empty-icon">✦</span>
          <p className="blog-empty-text">For future blogs.</p>
          <p className="blog-empty-sub">Coming soon — thoughts on code, design, and building things.</p>
        </div>
      </div>
    </section>
  )
}
