import { useState } from 'react'
import Reveal from './Reveal.jsx'
import ExhibitCard from './ExhibitCard.jsx'
import './Gallery.css'
import { EXHIBITS } from '../data/exhibits.js'
import { CARDS, TYPES, REGIONS } from '../data/gallery.js'

function Chips({ label, items, value, onChange, name }) {
  return (
    <div className="filters" role="group" aria-label={`Filter exhibits by ${name}`}>
      <span className="filter-label">{label}</span>
      {items.map(([v, l]) => (
        <button key={v} className={`chip${value === v ? ' active' : ''}`} aria-pressed={value === v} onClick={() => onChange(v)}>{l}</button>
      ))}
    </div>
  )
}

export default function Gallery() {
  const [type, setType] = useState('all')
  const [region, setRegion] = useState('all')
  const cards = CARDS.map((c) => {
    const x = c.ex ? EXHIBITS[c.ex] : null
    return { ...c, title: x ? x.t : c.title, art: x ? x : { ic: c.ic, title: c.title, img: c.img, alt: c.alt, video: c.video } }
  })
  const shown = cards.filter((c) =>
    (type === 'all' || c.cat === type) && (region === 'all' || c.region === region || c.region === 'Nationwide'))

  return (
    <section className="section section-dark" id="exhibits">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>The Gallery</h2>
          <p>Browse photographs, films and stories from across the islands. Visitors in the physical gallery can scan one code to continue on a mobile device.</p>
        </Reveal>
        <Reveal className="filter-bar">
          <Chips label="Type" name="type" items={TYPES} value={type} onChange={setType} />
          <Chips label="Region" name="region" items={REGIONS} value={region} onChange={setRegion} />
        </Reveal>
        <p className="exhibit-count" aria-live="polite">Showing {shown.length} of {cards.length} exhibits</p>
        <div className="exhibit-grid">
          {shown.map((c, i) => (
            <ExhibitCard key={c.title} x={c.art} meta={c.meta} title={c.title} desc={c.desc}
              to={c.ex && `/exhibit/${c.ex}`} delay={Math.min(i % 6, 5) * 90} />
          ))}
        </div>
      </div>
    </section>
  )
}
