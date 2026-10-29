import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Hero from './Hero.jsx'
import Gallery from './Gallery.jsx'
import Timeline from './Timeline.jsx'
import TopSpots from './TopSpots.jsx'
import Reveal from './Reveal.jsx'
import { getImageUrl } from '../assets.js'
import { EXHIBITS } from '../data/exhibits.js'
import './Home.css'

const FEATURED = [
  { id: 'banaue', cls: 'mostPopular-exhibit1', label: '01 / Ifugao (Luzon)', desc: 'Carved into the mountains of Ifugao, these centuries-old terraces reflect generations of Indigenous knowledge and care for the land.' },
  { id: 'chocolate', cls: 'mostPopular-exhibit2', label: '02 / Bohol (Visayas)', desc: 'More than a thousand distinctive rounded hills form this striking landscape, turning chocolate-brown in the dry season.' },
  { id: 'apo', cls: 'mostPopular-exhibit1', label: '03 / Davao (Mindanao)', desc: 'Standing at 2,954 meters, is the most famous natural landmark in Mindanao as the highest peak in the Philippines.' }
]

export default function Home() {
  const [active, setActive] = useState('')

  useEffect(() => { document.title = 'Online Museum | The Filipino Archive' }, [])

  /* Active nav link */
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { threshold: 0.4 })
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Header active={active} />
      <main className="mainComponent">
        <Hero />

        <section className="section" id="about">
          <div className="wrap">
            <Reveal className="section-head">
              <h2><b>Digital Heritage:</b> Preserving Culture Through Technology</h2>
              <p>Explore remarkable places that carry generations of Filipino history, knowledge and identity.</p>
            </Reveal>
            <div className="mostPopularExhibits">
              <h2>Most Popular By Region:</h2>
              {FEATURED.map((f) => {
                const x = EXHIBITS[f.id]
                return (
                  <article className={`mostPopular-exhibit ${f.cls}`} key={f.id}>
                    <Reveal as="img" src={getImageUrl(x.img)} alt={x.alt} />
                    <Reveal className="mostPopular-exhibitCopy">
                      <p className="mostPopular-exhibitLabel">{f.label}</p>
                      <h3 className="exhibitTitle">{x.t}</h3>
                      <p className="image-exhibitDescription">{f.desc}</p>
                      <Link className="read-more" to={`/exhibit/${f.id}`}>Read more</Link>
                    </Reveal>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <Gallery />
        <Timeline />

        <TopSpots />
      </main>
      <Footer />
    </>
  )
}
