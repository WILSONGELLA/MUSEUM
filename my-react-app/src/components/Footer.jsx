import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const to = (h) => ({ pathname: '/', hash: h })
  return (
    <footer>
      <div className="footerMainWrapper">
        <div className="footerChildWrapper">
          <div className="about-container">
            <h3>Online Museum</h3>
            <p>A project of the College of Computer Studies, built to keep Philippine cultural heritage within reach.</p>
          </div>
          <div className="footer-links">
            <h3>Explore</h3>
            <Link to={to('#exhibits')}>Gallery</Link>
            <Link to={to('#timeline')}>Timeline</Link>
            <Link to={to('#destinations')}>Top 10 spots and map</Link>
          </div>
          <div className="contact-wrapper">
            <h3>Visit</h3>
            <p>Scan the code in the gallery section to open the museum on your phone.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
