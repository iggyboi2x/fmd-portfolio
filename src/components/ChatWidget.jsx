import { useEffect, useRef, useState } from 'react'
import './ChatWidget.css'

const GREETING = "Hi! I'm Francis's AI assistant. Ask me about his skills, projects, awards or how to reach him."

// Answers for the suggested questions, used when the AI is offline (no API
// key yet, or the service is down) so the widget is never a dead end.
const SUGGESTIONS = {
  "What's his tech stack?":
    'Francis builds production work with React, Next.js, Tailwind CSS, Supabase, Vite and SQL, and is experienced with TypeScript, React Native (Expo), Node.js, Express, PHP, Laravel, LiveKit (WebRTC), the Claude API, Figma and Vercel.',
  'Tell me about his projects':
    'His main projects are Nutrio (an AI meal-planning Android app), StringGuard (an encrypted notes app), BobEye (a child-safety guardian that won 1st place at the ICS × IBM Bobathon 2026), the seating portal for the ~1,440-guest BSN Acquaintance Party, a live campus voting system, and ChatUrMate (random video chat). They are all in the Projects section.',
  'Is he open to work?':
    "Yes. Francis is open to internships and freelance projects, remote or in Cebu. He's a 4th-year BSIT student at UCLM, graduating in 2027.",
  'How can I contact him?':
    'Email francismigueldiano@gmail.com, use the contact form at the bottom of this page, or find him on LinkedIn: linkedin.com/in/francis-miguel-diano-091760316.',
}
const OFFLINE = "The assistant can't answer free-form questions right now. Use the contact form at the bottom of the page, or email francismigueldiano@gmail.com."
const MAX_CHARS = 500

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([]) // { role: 'user' | 'assistant', content }
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const inputRef = useRef(null)
  const fabRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages, busy])

  const close = () => {
    setOpen(false)
    fabRef.current?.focus()
  }

  async function ask(question) {
    const q = question.trim().slice(0, MAX_CHARS)
    if (!q || busy) return
    const history = [...messages, { role: 'user', content: q }]
    setMessages(history)
    setInput('')
    setBusy(true)
    let reply
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await r.json().catch(() => ({}))
      if (r.ok && data.reply) reply = data.reply
      else if (r.status === 503 || r.status === 404 || data.error === 'offline') reply = SUGGESTIONS[q] ?? OFFLINE
      else reply = data.error || 'Something went wrong. Please try again.'
    } catch {
      reply = SUGGESTIONS[q] ?? OFFLINE
    }
    setMessages(m => [...m, { role: 'assistant', content: reply }])
    setBusy(false)
  }

  return (
    <div className="chat-root">
      {open && (
        <section
          className="chat-panel"
          role="dialog"
          aria-label="Ask about Francis"
          onKeyDown={e => { if (e.key === 'Escape') close() }}
        >
          <header className="chat-head">
            <span className="chat-badge" aria-hidden="true">✦</span>
            <div>
              <h2 className="chat-title">Ask about Francis</h2>
              <p className="chat-sub">AI assistant</p>
            </div>
            <button type="button" className="chat-close" onClick={close} aria-label="Close chat">✕</button>
          </header>

          <div className="chat-list" ref={listRef} aria-live="polite">
            <p className="chat-msg from-assistant">{GREETING}</p>
            {messages.length === 0 && (
              <div className="chat-chips">
                {Object.keys(SUGGESTIONS).map(s => (
                  <button type="button" key={s} className="chat-chip" onClick={() => ask(s)}>{s}</button>
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <p key={i} className={`chat-msg from-${m.role}`}>{m.content}</p>
            ))}
            {busy && <p className="chat-msg from-assistant chat-typing" aria-label="The assistant is typing"><span /><span /><span /></p>}
          </div>

          <form className="chat-form" onSubmit={e => { e.preventDefault(); ask(input) }}>
            <input
              ref={inputRef}
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a question…"
              maxLength={MAX_CHARS}
              aria-label="Your question"
            />
            <button type="submit" className="chat-send" disabled={!input.trim() || busy} aria-label="Send">➤</button>
          </form>
          <p className="chat-note">AI can make mistakes. For anything important, use the contact form.</p>
        </section>
      )}

      <button
        ref={fabRef}
        type="button"
        className={`chat-fab${open ? ' is-open' : ''}`}
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={open ? 'Close chat' : 'Ask about Francis'}
        aria-expanded={open}
      >
        {open ? '✕' : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5z"
              fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  )
}
