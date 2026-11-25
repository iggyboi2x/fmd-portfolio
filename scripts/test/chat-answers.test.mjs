// Unit tests for the chat widget's pre-written answers.   npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { TOPICS, SUGGESTED, FALLBACK, matchTopic, answer } from '../../src/components/chatAnswers.js'

const topicOf = q => matchTopic(q)?.id ?? null

test('the four suggested questions map to their own answers', () => {
  assert.deepEqual(SUGGESTED.map(t => t.question), ["What's his tech stack?", 'Tell me about his projects', 'Is he open to work?', 'How can I contact him?'])
  for (const t of SUGGESTED) assert.equal(topicOf(t.question), t.id)
})

test('typed questions find the right topic', () => {
  const cases = {
    'what technologies does he use?': 'stack',
    'Does he know React?': 'stack',
    'Show me his projects': 'projects',
    'is he available for an internship?': 'hire',
    'Can I hire him for freelance work?': 'hire',
    "what's his email": 'contact',
    'Where does he study?': 'education',
    'did he win any hackathon?': 'award',
    'Which certifications does he have?': 'certs',
    'where is he based': 'location',
    'can I see his CV': 'resume',
    'tell me about nutrio': 'nutrio',
    'What is BobEye?': 'bobeye',
    'stringguard encryption?': 'stringguard',
    'the BSN seating portal': 'bsn',
    'ChatUrMate video chat': 'chaturmate',
    'the PSITS election system': 'voting',
  }
  for (const [q, id] of Object.entries(cases)) assert.equal(topicOf(q), id, q)
})

test('unrelated questions get the contact-form fallback, never a guess', () => {
  for (const q of ['What is the weather today?', 'Write me a poem', 'asdfgh', '']) {
    assert.equal(answer(q), FALLBACK, q)
  }
})

test('every topic has keywords and a non-empty answer; ids are unique', () => {
  const ids = TOPICS.map(t => t.id)
  assert.equal(new Set(ids).size, ids.length)
  for (const t of TOPICS) assert.ok(t.keywords.length && t.answer.length > 20, t.id)
})
