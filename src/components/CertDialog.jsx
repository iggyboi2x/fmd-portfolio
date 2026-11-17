import { useEffect, useRef } from 'react'
import './CertDialog.css'

// Shows a certificate in a modal over the page, so visitors never leave the
// site. Uses the native <dialog> for focus trapping, Esc-to-close and
// returning focus to the card that opened it. The certificate is shown as an
// image rendered from its PDF (mobile browsers can't reliably display a PDF
// inline); the real PDF is one click away as a download.
export default function CertDialog({ cert, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (cert && !dialog.open) {
      dialog.showModal()
      document.documentElement.classList.add('modal-open')
    } else if (!cert && dialog.open) {
      dialog.close()
    }
    if (!cert) document.documentElement.classList.remove('modal-open')
  }, [cert])

  useEffect(() => () => document.documentElement.classList.remove('modal-open'), [])

  // A click on the backdrop lands on the <dialog> element itself.
  const onBackdrop = e => { if (e.target === ref.current) onClose() }

  return (
    <dialog
      ref={ref}
      className="cert-dialog"
      aria-labelledby="cert-dialog-title"
      onClose={onClose}
      onClick={onBackdrop}
    >
      {cert && (
        <div className="cert-dialog-body">
          <div className="cert-dialog-head">
            <div>
              <h3 id="cert-dialog-title" className="cert-dialog-title">{cert.title}</h3>
              <p className="cert-dialog-meta">{cert.issuer}{cert.meta ? ` · ${cert.meta}` : ''}</p>
            </div>
            <button type="button" className="cert-dialog-close" onClick={onClose} aria-label="Close certificate">
              ✕
            </button>
          </div>

          <div className={`cert-dialog-frame${cert.portrait ? ' is-portrait' : ''}`}>
            <img
              src={cert.preview}
              alt={`${cert.title} certificate issued to Francis Miguel Diano`}
              width={cert.size[0]}
              height={cert.size[1]}
            />
          </div>

          <div className="cert-dialog-foot">
            {cert.note ? <p className="cert-dialog-note">{cert.note}</p> : <span />}
            <a className="btn btn-solid cert-dialog-download" href={cert.pdf} download>
              Download PDF ↓
            </a>
          </div>
        </div>
      )}
    </dialog>
  )
}
