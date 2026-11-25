import { useEffect, useRef, useState } from 'react'
import { SUGGESTED, answer } from './chatAnswers'
import './ChatWidget.css'

const GREETING = "Hi! Ask me about Francis's skills, projects, awards or how to reach him."
const MAX_CHARS = 500
const REPLY_DELAY_MS = 350 // a short pause so the answer doesn't feel jarring

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

  function ask(question) {
    const q = question.trim().slice(0, MAX_CHARS)
    if (!q || busy) return
    setMessages(m => [...m, { role: 'user', content: q }])
    setInput('')
    setBusy(true)
    setTimeout(() => {
      setMessages(m => [...m, { role: 'assistant', content: answer(q) }])
      setBusy(false)
    }, REPLY_DELAY_MS)
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
            <span className="chat-badge" aria-hidden="true">?</span>
            <div>
              <h2 className="chat-title">Ask about Francis</h2>
              <p className="chat-sub">Quick answers</p>
            </div>
            <button type="button" className="chat-close" onClick={close} aria-label="Close chat">✕</button>
          </header>

          <div className="chat-list" ref={listRef} aria-live="polite">
            <p className="chat-msg from-assistant">{GREETING}</p>
            {messages.length === 0 && (
              <div className="chat-chips">
                {SUGGESTED.map(t => (
                  <button type="button" key={t.id} className="chat-chip" onClick={() => ask(t.question)}>{t.question}</button>
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
          <p className="chat-note">Answers are pre-written. For anything else, use the contact form.</p>
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
