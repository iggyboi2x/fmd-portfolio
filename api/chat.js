import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from './_knowledge.js'

// Vercel serverless function behind the site's chat widget.
// The API key lives only in the ANTHROPIC_API_KEY env var on Vercel.

const MODEL = 'claude-opus-5-5'
const MAX_QUESTION_CHARS = 500
const MAX_TURNS = 10 // user messages kept from the conversation
const RATE_LIMIT = { max: 10, windowMs: 60_000 } // per visitor IP, best effort
const ALLOWED_ORIGINS = [
  'https://www.francismigueldiano.com',
  'https://francismigueldiano.com',
  'https://francismigueldiano.vercel.app',
]

// Per-instance memory: resets when the function cold-starts, so it slows
// abuse rather than stopping it. A Vercel Firewall rate-limit rule is the
// hard limit if one is ever needed.
const hits = new Map()
function rateLimited(ip, now = Date.now()) {
  const recent = (hits.get(ip) ?? []).filter(t => now - t < RATE_LIMIT.windowMs)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_LIMIT.max
}

function allowedOrigin(origin) {
  return !origin || ALLOWED_ORIGINS.includes(origin) || /^http:\/\/localhost(:\d+)?$/.test(origin)
}

// Accepts [{ role: 'user' | 'assistant', content: string }], newest last.
// Returns a clean history ending on the user's question, or an error string.
export function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return { error: 'No question was sent.' }
  const clean = []
  for (const m of messages.slice(-(MAX_TURNS * 2))) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') {
      return { error: 'That message could not be read.' }
    }
    const content = m.content.trim().slice(0, m.role === 'user' ? MAX_QUESTION_CHARS : 2000)
    if (content) clean.push({ role: m.role, content })
  }
  while (clean.length && clean[0].role !== 'user') clean.shift()
  if (!clean.length || clean.at(-1).role !== 'user') return { error: 'No question was sent.' }
  return { messages: clean }
}

export function createHandler({ getClient = () => new Anthropic(), hasKey = () => Boolean(process.env.ANTHROPIC_API_KEY) } = {}) {
  return async function handler(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ error: 'Use POST.' })
    }
    if (!allowedOrigin(req.headers.origin)) return res.status(403).json({ error: 'Not allowed.' })
    if (!hasKey()) return res.status(503).json({ error: 'offline' })

    const ip = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || 'unknown'
    if (rateLimited(ip)) return res.status(429).json({ error: 'Too many questions at once. Try again in a minute.' })

    const checked = validateMessages(req.body?.messages)
    if (checked.error) return res.status(400).json({ error: checked.error })

    try {
      const response = await getClient().beta.messages.create({
        model: MODEL,
        max_tokens: 4000,
        output_config: { effort: 'low' },
        betas: ['server-side-fallback-2026-07-01'],
        fallbacks: 'default',
        system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
        messages: checked.messages,
      })
      if (response.stop_reason === 'refusal') {
        return res.status(200).json({ reply: "I can't help with that one. Ask me about Francis's projects, skills or how to reach him." })
      }
      const reply = response.content.filter(b => b.type === 'text').map(b => b.text).join('').trim()
      if (!reply) return res.status(502).json({ error: 'No answer came back. Please try again.' })
      return res.status(200).json({ reply })
    } catch (err) {
      if (err instanceof Anthropic.RateLimitError) {
        return res.status(429).json({ error: 'The assistant is busy right now. Try again in a minute.' })
      }
      if (err instanceof Anthropic.AuthenticationError) {
        console.error('chat: Anthropic authentication failed - check ANTHROPIC_API_KEY')
        return res.status(503).json({ error: 'offline' })
      }
      if (err instanceof Anthropic.APIError) {
        console.error(`chat: Anthropic API error ${err.status}`)
        return res.status(502).json({ error: 'The assistant had a problem. Please try again.' })
      }
      console.error('chat: unexpected error', err)
      return res.status(500).json({ error: 'Something went wrong. Please try again.' })
    }
  }
}

export default createHandler()
