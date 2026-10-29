import { getImageUrl, heroVideo } from '../assets.js'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <video className="hero-video" autoPlay muted loop playsInline poster={getImageUrl('banaueu-rice-terraces.webp')} aria-hidden="true" tabIndex={-1}>
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="hero-content">
        <h1 id="hero-title"><span className="line">Preserving</span> <span className="line">culture through</span> <span className="line"><em>technology.</em></span></h1>
        <p className="hero-description">A digital heritage gallery. Scan one code to carry the whole museum on your phone, with its stories, photographs and footage.</p>
        <div className="hero-actions">
          <a className="btn btn-gold" href="#exhibits">Browse the gallery</a>
          <a className="btn btn-ghost" href="#timeline">Follow the timeline</a>
        </div>
      </div>
    </section>
  )
}
