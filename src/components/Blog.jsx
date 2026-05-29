import './Blog.css'

const posts = [
  { date: 'May 2025', title: 'My Journey from Frontend to Fullstack', excerpt: 'What I learned trying to understand the backend — the tools, the mindset shifts, and the moments it finally clicked.', tag: 'Career' },
  { date: 'Apr 2025', title: 'React Patterns I Wish I Knew Earlier', excerpt: 'A practical breakdown of compound components, render props, and custom hooks that changed how I write React.', tag: 'React' },
  { date: 'Mar 2025', title: 'Building My First REST API with Express', excerpt: 'Step by step through my first solo backend project — mistakes, debugging sessions, and what I would do differently.', tag: 'Backend' },
]

export default function Blog() {
  return (
    <section id="blog">
      <div className="divider" />
      <div className="wrapper">
        <p className="eyebrow">Writing</p>
        <h2 className="heading">Thoughts &amp; notes.</h2>
        <div className="blog-grid">
          {posts.map(p => (
            <article className="blog-card" key={p.title}>
              <div className="blog-card-top">
                <span className="blog-tag">{p.tag}</span>
                <span className="blog-date">{p.date}</span>
              </div>
              <h3 className="blog-title">{p.title}</h3>
              <p className="blog-excerpt">{p.excerpt}</p>
              <span className="blog-read">Read more →</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
