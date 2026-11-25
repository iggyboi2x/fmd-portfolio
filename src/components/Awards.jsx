import teamPhoto from '../assets/awards/bobathon-team.webp'
import trophyPhoto from '../assets/awards/bobathon-trophy.webp'
import presentingPhoto from '../assets/awards/bobathon-presenting.webp'
import './Awards.css'

const features = [
  'On-device text detection that catches harmful phrases in Tagalog, Taglish and English',
  'A Chrome extension that blocks adult and phishing sites, backed by a URL model trained on 650,000 links from a Kaggle dataset',
  'A live parent dashboard with Soft and Critical alerts',
  "Quick pairing between the child's PC and the parent's dashboard with a 6-digit code or QR scan",
  'A friendly mascot that gently nudges the child without exposing any details',
]

const teammates = ['Benedict Avenido', 'John Elton Geromo', 'Jaycee Kent Cabansag', 'Alexandre Paquibot']

export default function Awards() {
  return (
    <section id="awards" className="panel panel-yellow">
      <div className="seam" />
      <div className="wrapper">
        <h2 className="heading rise">Built it in two days. <em>Won it.</em></h2>

        <article className="award">
          <div className="award-copy">
            <span className="award-ribbon">Champion</span>
            <h3 className="award-title">ICS × IBM Bobathon 2026</h3>
            <p className="award-meta">Future Builders: From Ideas to Impact · Nov 19–20, 2026 · University of Cebu</p>

            <p className="award-lede">
              Our team built <strong>BobEye</strong>, a child-safety guardian for Filipino families. It watches
              for grooming, threats and harmful sites on a child's PC and alerts the parent in seconds, without
              the screen ever leaving the device.
            </p>

            <ul className="award-features">
              {features.map(f => <li key={f}>{f}</li>)}
            </ul>

            <p className="award-note">
              Built with IBM Bob, IBM's AI coding assistant, and privacy-first throughout: everything is checked
              on the child's device, and explicit images are blurred before anything is sent.
            </p>

            <p className="award-team">
              With {teammates.slice(0, -1).join(', ')} and {teammates.at(-1)}. Organized by Integrated
              Computer Systems, Inc. and IBM.
            </p>
          </div>

          <div className="award-gallery">
            <figure className="award-photo photo-team">
              <img src={teamPhoto} alt="The BobEye team holding the champion's trophy and certificates at the ICS × IBM Bobathon" width="1400" height="788" loading="lazy" decoding="async" />
            </figure>
            <figure className="award-photo photo-trophy">
              <img src={trophyPhoto} alt="The Bobathon champion's trophy, certificate of participation and winner's card" width="480" height="853" loading="lazy" decoding="async" />
            </figure>
            <figure className="award-photo photo-pitch">
              <img src={presentingPhoto} alt="The team presenting BobEye to the judges" width="1000" height="562" loading="lazy" decoding="async" />
            </figure>
          </div>
        </article>

      </div>
    </section>
  )
}
