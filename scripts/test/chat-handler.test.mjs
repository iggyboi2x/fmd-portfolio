// Unit tests for api/chat.js with a fake Anthropic client (no network, no cost).
//   npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import Anthropic from '@anthropic-ai/sdk'
import { createHandler, validateMessages } from '../../api/chat.js'

function call(handler, { method = 'POST', origin = 'https://www.francismigueldiano.com', ip = '1.1.1.1', body } = {}) {
  return new Promise(resolve => {
    const res = { statusCode: 200, headers: {},
      setHeader(k, v) { this.headers[k] = v },
      status(c) { this.statusCode = c; return this },
      json(b) { resolve({ status: this.statusCode, body: b }) } }
    handler({ method, headers: { origin, 'x-forwarded-for': ip }, body }, res)
  })
}
const fakeClient = (impl) => () => ({ beta: { messages: { create: impl } } })
const ask = (q) => ({ messages: [{ role: 'user', content: q }] })

test('offline without an API key', async () => {
  const r = await call(createHandler({ hasKey: () => false }), { body: ask('hi') })
  assert.equal(r.status, 503); assert.equal(r.body.error, 'offline')
})

test('rejects GET and foreign origins', async () => {
  const h = createHandler({ hasKey: () => true, getClient: fakeClient(async () => assert.fail('should not call')) })
  assert.equal((await call(h, { method: 'GET' })).status, 405)
  assert.equal((await call(h, { origin: 'https://evil.example', body: ask('hi') })).status, 403)
})

test('validation trims, caps and requires a final user message', () => {
  assert.ok(validateMessages([]).error)
  assert.ok(validateMessages([{ role: 'assistant', content: 'x' }]).error)
  assert.ok(validateMessages([{ role: 'system', content: 'x' }]).error)
  const long = validateMessages([{ role: 'user', content: 'a'.repeat(900) }])
  assert.equal(long.messages[0].content.length, 500)
  const many = Array.from({ length: 40 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: `m${i}` }))
  many.push({ role: 'user', content: 'last' })
  const kept = validateMessages(many).messages
  assert.ok(kept.length <= 20 && kept[0].role === 'user' && kept.at(-1).content === 'last')
})

test('sends the expected request and returns the reply', async () => {
  let sent
  const h = createHandler({ hasKey: () => true, getClient: fakeClient(async (p) => { sent = p
    return { stop_reason: 'end_turn', content: [{ type: 'text', text: 'He builds with React.' }] } }) })
  const r = await call(h, { ip: '2.2.2.2', body: ask('  What is his stack?  ') })
  assert.equal(r.status, 200); assert.equal(r.body.reply, 'He builds with React.')
  assert.equal(sent.model, 'claude-opus-5-5')
  assert.deepEqual(sent.output_config, { effort: 'low' })
  assert.equal(sent.fallbacks, 'default')
  assert.deepEqual(sent.betas, ['server-side-fallback-2026-07-01'])
  assert.equal(sent.thinking, undefined)
  assert.match(sent.system[0].text, /BobEye/)
  assert.deepEqual(sent.messages, [{ role: 'user', content: 'What is his stack?' }])
})

test('refusal becomes a polite decline', async () => {
  const h = createHandler({ hasKey: () => true, getClient: fakeClient(async () => ({ stop_reason: 'refusal', content: [] })) })
  const r = await call(h, { ip: '3.3.3.3', body: ask('x') })
  assert.equal(r.status, 200); assert.match(r.body.reply, /can't help/)
})

test('maps SDK errors to friendly statuses', async () => {
  const err = (E, s) => new E(s, { type: 'error' }, 'x', new Headers())
  const run = (e, ip) => call(createHandler({ hasKey: () => true, getClient: fakeClient(async () => { throw e }) }), { ip, body: ask('x') })
  assert.equal((await run(err(Anthropic.RateLimitError, 429), '4.4.4.1')).status, 429)
  const auth = await run(err(Anthropic.AuthenticationError, 401), '4.4.4.2')
  assert.equal(auth.status, 503); assert.equal(auth.body.error, 'offline')
  assert.equal((await run(err(Anthropic.InternalServerError, 500), '4.4.4.3')).status, 502)
})

test('rate limits a burst from one visitor', async () => {
  const h = createHandler({ hasKey: () => true, getClient: fakeClient(async () => ({ stop_reason: 'end_turn', content: [{ type: 'text', text: 'ok' }] })) })
  const codes = []
  for (let i = 0; i < 12; i++) codes.push((await call(h, { ip: '9.9.9.9', body: ask('hi') })).status)
  assert.deepEqual(codes.slice(0, 10), Array(10).fill(200))
  assert.deepEqual(codes.slice(10), [429, 429])
})
