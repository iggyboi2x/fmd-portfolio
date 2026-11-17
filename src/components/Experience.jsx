import { useState } from 'react'
import CertDialog from './CertDialog'
import claudePreview from '../assets/certs/claude-101.webp'
import topcitPreview from '../assets/certs/topcit-level-3.webp'
import ibmIdeasPreview from '../assets/certs/ibm-bob-ideas-to-intelligent-solutions.webp'
import ibmWebsitePreview from '../assets/certs/ibm-bob-small-business-website.webp'
import ibmToolsPreview from '../assets/certs/ibm-bob-ai-tools-changing-solutions.webp'
import './Experience.css'

const education = [
  {
    period: '2023 — Present',
    role: 'Bachelor of Science in Information Technology',
    company: 'University of Cebu Lapu-Lapu and Mandaue',
    desc: "Currently in 4th year, Academic Scholar. Focused on full-stack web development, software engineering, and networking fundamentals.",
  },
  {
    period: '2021 — 2023',
    role: 'Senior High School — TechVoc ICT',
    company: 'University of Cebu Lapu-Lapu and Mandaue',
    desc: 'Technical-Vocational track with a focus on ICT. Built a foundation in programming, computer hardware, and systems operations.',
  },
]

// Accent = issuer, so the color says who issued it, never that one matters more.
const certifications = [
  {
    title: 'Claude 101', issuer: 'Anthropic', accent: 'red',
    pdf: '/certs/claude-101.pdf', preview: claudePreview, size: [1552, 1188],
    note: 'Verify at verify.skilljar.com/c/3yczqc6p63w3',
  },
  {
    title: 'TOPCIT Level 3', issuer: 'IITP', meta: '2026', accent: 'blue',
    pdf: '/certs/topcit-level-3.pdf', preview: topcitPreview, size: [1105, 1539],
    note: 'Date of birth, photo and verification barcodes removed for privacy.',
  },
  {
    title: 'Build with IBM Bob: From Ideas to Intelligent Solutions', issuer: 'IBM SkillsBuild', meta: '2026', accent: 'green',
    pdf: '/certs/ibm-bob-ideas-to-intelligent-solutions.pdf', preview: ibmIdeasPreview, size: [1532, 957],
  },
  {
    title: 'Planning a Website for a Small Business with IBM Bob', issuer: 'IBM SkillsBuild', meta: '2026', accent: 'green',
    pdf: '/certs/ibm-bob-small-business-website.pdf', preview: ibmWebsitePreview, size: [1532, 957],
  },
  {
    title: 'How IBM Bob and AI Tools Are Changing the Way Solutions Are Built', issuer: 'IBM SkillsBuild', meta: '2026', accent: 'green',
    pdf: '/certs/ibm-bob-ai-tools-changing-solutions.pdf', preview: ibmToolsPreview, size: [1532, 957],
  },
]

export default function Experience() {
  const [openCert, setOpenCert] = useState(null)

  return (
    <section id="experience" className="panel panel-blue">
      <div className="seam" />
      <div className="wrapper">
        <h2 className="heading rise">Education &amp;<br /><em>certifications.</em></h2>

        <div className="exp-list">
          {education.map(e => (
            <div className="exp-row" key={e.role}>
              <span className="exp-period">{e.period}</span>
              <div className="exp-body">
                <h3 className="exp-role">{e.role}</h3>
                <p className="exp-company">{e.company}</p>
                <p className="exp-desc">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="certs-section">
          <div className="certs-grid">
            {certifications.map(c => (
              <button
                type="button"
                className={`cert-card accent-${c.accent}`}
                key={c.title}
                onClick={() => setOpenCert(c)}
                aria-haspopup="dialog"
              >
                <span className="cert-thumb">
                  <img src={c.preview} alt="" width={c.size[0]} height={c.size[1]} loading="lazy" decoding="async" />
                </span>
                <span className="cert-body">
                  <span className="cert-issuer">{c.issuer}</span>
                  <span className="cert-title">{c.title}</span>
                  {c.meta && <span className="cert-meta">{c.meta}</span>}
                  <span className="cert-view">View certificate →</span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <CertDialog cert={openCert} onClose={() => setOpenCert(null)} />
      </div>
      <div className="headlight-sweep" aria-hidden="true" />
    </section>
  )
}
