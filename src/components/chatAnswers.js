// Pre-written answers for the site's chat widget. No AI: a typed question is
// matched to a topic by keywords, and anything unmatched points to the contact
// form. Keep answers in sync with the portfolio and résumé.

export const TOPICS = [
  {
    id: 'stack',
    question: "What's his tech stack?",
    keywords: ['stack', 'tech', 'skill', 'language', 'framework', 'tool', 'react', 'next', 'typescript', 'supabase', 'tailwind', 'node', 'express', 'php', 'laravel', 'sql', 'use'],
    answer: 'Francis builds production work with React, Next.js, Tailwind CSS, Supabase, Vite and SQL, and is experienced with TypeScript, React Native (Expo), Node.js, Express, PHP, Laravel, LiveKit (WebRTC), the Claude API, Figma and Vercel.',
  },
  {
    id: 'projects',
    question: 'Tell me about his projects',
    keywords: ['project', 'built', 'build', 'work', 'portfolio', 'app', 'made', 'experience'],
    answer: 'His main projects are Nutrio (an AI meal-planning Android app), StringGuard (an encrypted notes app), BobEye (a child-safety guardian that won 1st place at the ICS × IBM Bobathon 2026), the seating portal for the ~1,440-guest BSN Acquaintance Party, a live campus voting system, and ChatUrMate (random video chat). They are all in the Projects section.',
  },
  {
    id: 'hire',
    question: 'Is he open to work?',
    keywords: ['open', 'hire', 'hiring', 'available', 'availability', 'job', 'intern', 'internship', 'freelance', 'role', 'remote', 'work with'],
    answer: "Yes. Francis is open to internships and freelance projects, remote or in Cebu. He's a 4th-year BSIT student at UCLM, graduating in 2027.",
  },
  {
    id: 'contact',
    question: 'How can I contact him?',
    keywords: ['contact', 'email', 'reach', 'phone', 'number', 'call', 'message', 'linkedin', 'talk', 'touch'],
    answer: 'Email francismigueldiano@gmail.com, use the contact form at the bottom of this page, or find him on LinkedIn: linkedin.com/in/francis-miguel-diano-091760316.',
  },
  {
    id: 'education',
    keywords: ['school', 'study', 'student', 'education', 'university', 'college', 'degree', 'bsit', 'uclm', 'graduate', 'scholar'],
    answer: "Francis is a 4th-year BS Information Technology student at the University of Cebu Lapu-Lapu and Mandaue (UCLM), graduating in 2027, and a College Academic Scholar.",
  },
  {
    id: 'award',
    keywords: ['award', 'win', 'won', 'hackathon', 'bobathon', 'prize', 'first place', '1st', 'competition'],
    answer: 'Francis and his team won 1st place at the ICS × IBM Bobathon 2026 (Nov 19–20, University of Cebu) with BobEye, a child-safety guardian they built in two days with IBM Bob. The full story is in the Awards section.',
  },
  {
    id: 'certs',
    keywords: ['certificate', 'certification', 'certified', 'topcit', 'claude 101', 'ibm skillsbuild', 'course'],
    answer: 'He holds Anthropic Claude 101, TOPCIT Level 3 (IITP, 2026), and three IBM SkillsBuild certificates on building with IBM Bob. You can open each certificate in the Certifications section.',
  },
  {
    id: 'location',
    keywords: ['location', 'based', 'live', 'lives', 'city', 'cebu', 'philippines', 'country', 'timezone', 'from'],
    answer: 'Francis is based in Mandaue City, Cebu, Philippines, and works remotely too.',
  },
  {
    id: 'resume',
    keywords: ['resume', 'résumé', 'cv', 'pdf'],
    answer: 'His résumé is linked from the Résumé button at the top of the page and in the Contact section.',
  },
  {
    id: 'nutrio',
    keywords: ['nutrio', 'meal', 'food', 'pantry', 'mobile', 'android'],
    answer: 'Nutrio is a team-built AI meal-planning and food-waste app: an Android app (React Native + Expo) that scans your pantry by photo and barcode, plans meals around ingredients nearing expiry, and routes surplus food to donations and barangay programs. Express API and Supabase. Try it at nutrioapp.vercel.app.',
  },
  {
    id: 'bobeye',
    keywords: ['bobeye', 'child', 'safety', 'parent', 'chrome extension', 'electron'],
    answer: "BobEye is a child-safety guardian that won 1st place at the ICS × IBM Bobathon 2026. It checks a child's PC on-device for grooming, threats and harmful sites, and alerts parents in seconds. Francis built the Chrome extension's blocklist and URL-model checks and the severity-scoring rules.",
  },
  {
    id: 'stringguard',
    keywords: ['stringguard', 'encrypt', 'encryption', 'notes', 'privacy', 'secure'],
    answer: 'StringGuard is a privacy-focused notes app with client-side encryption, password-protected workspaces, a rich-text editor and a code editor for 15+ languages. React, Vite and Supabase, live at stringguard.online.',
  },
  {
    id: 'bsn',
    keywords: ['bsn', 'acquaintance', 'nursing', 'seat', 'seating', 'reservation', 'event'],
    answer: "The BSN Acquaintance Party portal handled real-time seat reservations for UCLM College of Nursing's ~1,440-guest event. Francis moved all writes behind an authenticated server API with Row-Level Security and fixed the double-booking races. Live at bsn-acquaintance.online.",
  },
  {
    id: 'chaturmate',
    keywords: ['chaturmate', 'video', 'chat app', 'webrtc', 'livekit', 'stranger'],
    answer: 'ChatUrMate is a random one-to-one video chat with private invite-code rooms, real-time matchmaking, and text, image and voice messages. Next.js, TypeScript, LiveKit and Supabase, at chaturmate.vercel.app.',
  },
  {
    id: 'voting',
    keywords: ['vote', 'voting', 'election', 'psits', 'ballot'],
    answer: 'The UCLM PSITS Voting System is a real-time digital ballot used by the UCLM CCS department to elect student officers in 2025. Francis built its responsive React voting interface.',
  },
]

export const SUGGESTED = TOPICS.filter(t => t.question)

export const FALLBACK =
  "I only have pre-written answers, and I don't have one for that. Use the contact form at the bottom of the page, or email francismigueldiano@gmail.com."

const normalize = s => ` ${s.toLowerCase().replace(/[^a-z0-9é ]+/g, ' ').replace(/\s+/g, ' ')} `

// Best-matching topic for a question, or null. A keyword counts when it
// starts a word ("project" matches "projects"); project names win ties
// because they appear later in TOPICS and are more specific.
export function matchTopic(question) {
  const exact = TOPICS.find(t => t.question && t.question.toLowerCase() === question.trim().toLowerCase())
  if (exact) return exact
  const q = normalize(question)
  let best = null
  let bestScore = 0
  for (const topic of TOPICS) {
    const score = topic.keywords.filter(k => q.includes(` ${normalize(k).trim()}`)).length
    if (score > 0 && score >= bestScore) {
      best = topic
      bestScore = score
    }
  }
  return best
}

export function answer(question) {
  return matchTopic(question)?.answer ?? FALLBACK
}
